import React, { useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { MovieCard } from './MovieCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { setSearchPage } from '../slices/searchPageSlice'
import { SearchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import Icon from '@material-tailwind/react/Icon'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
// @ts-ignore
import Dropdown from '@material-tailwind/react/Dropdown'
// @ts-ignore
import DropdownLink from '@material-tailwind/react/DropdownLink'
import { View } from 'react-native'
import tailwind from 'tailwind-rn'
/* eslint-enable */

// Redux dispatch
const actionDispatch = (dispatch: Dispatch) => ({
    setSearchResult: (page: SearchMoviesPage['searchMoviesPage']) => dispatch(setSearchPage(page)),
})

export default function Search() {
    const movieService = new MovieService()

    const ELEMENTS_PER_PAGE = 6
    const PAGE_OFFSET = 1 // Index of initial page

    const initialFilters: {
        filterField: string // field to filter by, i.e. 'published' or 'createdAt'
        filterCond: string // condition to filter by, i.e. '$gte' (>=) or '$lte' (<=)
        filterValue: number // value to filter by, (year)
        sortValue: number // weather to sort in ascending (1) or descending (-1) order
    } = {
        filterField: 'published',
        filterCond: '$lte',
        filterValue: 2000,
        sortValue: -1,
    }

    const initialPageState: {
        hasNextPage: boolean // weather or not there may be a next page
        page: number // current page number
    } = {
        hasNextPage: false,
        page: PAGE_OFFSET,
    }

    const [filters, setFilters] = useState(initialFilters)
    const [pageState, setPageState] = useState(initialPageState)

    // Set new redux seach page state
    const { setSearchResult: setSearchResult } = actionDispatch(useAppDispatch())

    // Current redux seach page state
    const searchResult = useAppSelector((state) => state.searchPage.searchPage)

    const [searchInput, setSearchInput] = useState<string>('')

    const appendSearchResult = (queryResult: SearchMoviesPage['searchMoviesPage']) => {
        setSearchResult(searchResult?.concat(queryResult))
    }

    const getQueryVariables = (page: number) => {
        /**
         * Returns query object that can be sent to backend
         */
        const skip = (page - 1) * ELEMENTS_PER_PAGE
        const take = ELEMENTS_PER_PAGE
        const orderField = 'published'
        const orderValue = filters.sortValue
        const filterField = filters.filterField
        const filterCond = filters.filterCond
        const filterValue = filters.filterValue
        return {
            searchQuery: searchInput,
            take: take,
            skip: skip,
            orderField: orderField,
            orderValue: orderValue,
            filterField: filterField,
            filterCond: filterCond,
            filterValue: filterValue,
        }
    }

    const fetchSearchResults = async () => {
        /**
         * Sends query and sets searchResult state to response
         */
        setPageState({
            ...pageState,
            page: PAGE_OFFSET,
        })
        const query = getQueryVariables(1)
        const queryResult = await movieService.searchMoviesPage(query).catch((err: Error) => {
            console.error(err)
        })
        if (queryResult) setSearchResult(queryResult)
    }

    const fetchMore = async () => {
        /**
         * Sends query and appends result to searchResult state
         */
        const query = getQueryVariables(pageState.page)
        const queryResult = await movieService.searchMoviesPage(query).catch((err: Error) => {
            console.error(err)
        })
        if (queryResult) appendSearchResult(queryResult)
        if (queryResult?.length == 0)
            setPageState({
                ...pageState,
                hasNextPage: true,
            })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    let timer: NodeJS.Timeout

    const handeSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setSearchInput(event.target.value)
        }, 700)
    }

    // searchResult state is cleared and fetched when user input changes
    useEffect(() => {
        setPageState({
            ...pageState,
            page: PAGE_OFFSET,
        })
        setPageState({
            ...pageState,
            hasNextPage: false,
        })
        fetchSearchResults().catch((err) => {
            console.error(err)
            throw err
        })
    }, [
        filters.sortValue,
        filters.filterField,
        filters.filterCond,
        filters.filterValue,
        searchInput,
    ])

    // When page is incremented, fetch more movies and append to searchResult state
    useEffect(() => {
        setPageState({
            ...pageState,
            hasNextPage: false,
        })
        if (pageState.page != PAGE_OFFSET) {
            fetchMore().catch((err) => {
                console.error(err)
                throw err
            })
        }
    }, [pageState.page])

    // Fetches movies on component initialization
    useEffect(() => {
        async function search() {
            await fetchSearchResults()
        }
        search().catch((err: Error) => {
            console.error(err.message)
            throw err
        })
    }, [])

    return (
        <View style={tailwind('mb-40')}>
            <form style={tailwind('my-10')} onSubmit={handleSubmit}>
                {/* Search Bar */}
                <View style={tailwind('w-full relative h-12')}>
                    <span
                        role="text"
                        id="searchbar"
                        style={tailwind(
                            'material-icons p-0 text-gray-600 text-opacity-60 border-none absolute top-1/2 right-3 transform -translate-y-1/2 text-xl',
                        )}
                    >
                        search
                    </span>
                    <input
                        type="text"
                        name="searchbar"
                        id="searchbar"
                        onChange={handeSearchChange}
                        style={tailwind(
                            'w-full h-full text-gray-500 outline-none focus:text-white pl-3 pr-9 pt-3.5 pb-2.5 mt-input-outline bg-transparent border border-1 border-gray-300 rounded-lg focus:border-2',
                        )}
                    />
                    <label
                        htmlFor="searchbar"
                        style={tailwind(
                            'text-white absolute left-0 -top-1.5 w-full h-full border-gray-300 pointer-events-none false flex false -10',
                        )}
                    >
                        Search Movies
                    </label>
                </View>
            </form>
            <View style={tailwind('relative flex flex-col gap-2 mb-4 items-center')}>
                <View>
                    <Dropdown
                        color="red"
                        style={tailwind('whitespace-nowrap')}
                        buttonText={
                            filters.filterField == 'published' ? 'Year Published' : 'Year Added'
                        }
                        buttonType="outline"
                        size="sm"
                        ripple="dark"
                    >
                        <DropdownLink
                            href="#"
                            color="red"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterField: 'createdAt',
                                })
                            }
                        >
                            Year Added
                        </DropdownLink>
                        <DropdownLink
                            href="#"
                            color="red"
                            size="sm"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterField: 'published',
                                })
                            }
                        >
                            Year Published
                        </DropdownLink>
                    </Dropdown>
                </View>

                <View>
                    <Dropdown
                        color="yellow"
                        buttonText={filters.filterCond == '$lte' ? 'Before' : 'After'}
                        buttonType="outline"
                        size="sm"
                        ripple="dark"
                    >
                        <DropdownLink
                            href="#"
                            color="yellow"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterCond: '$lte',
                                })
                            }
                        >
                            Before
                        </DropdownLink>
                        <DropdownLink
                            href="#"
                            color="yellow"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterCond: '$gte',
                                })
                            }
                        >
                            After
                        </DropdownLink>
                    </Dropdown>
                </View>

                <View>
                    <label htmlFor="yearFilter" />
                    <input
                        type="number"
                        min="1800"
                        max="2099"
                        step="1"
                        color="yellow"
                        id="yearFilter"
                        name="yearFilter"
                        style={tailwind(
                            'w-70 h-full text-gray-200 appearance-none overflow-visible outline-none focus:outline-none focus:text-white pl-3 pr-3 py-2.5 text-sm border-gray-300 bg-transparent border border-1 rounded-lg focus:border-2 focus:border-yellow-600',
                        )}
                        placeholder={filters.filterValue.toString()}
                        onChange={(e: { target: { value: string } }) =>
                            setFilters({
                                ...filters,
                                filterValue: parseInt(e.target.value),
                            })
                        }
                    />
                </View>
                <Button
                    size="sm"
                    style={tailwind('whitespace-nowrap')}
                    ripple="light"
                    color="red"
                    onClick={() =>
                        setFilters({
                            ...filters,
                            sortValue: -filters.sortValue,
                        })
                    }
                >
                    <Icon
                        name={filters.sortValue === -1 ? 'arrow_upward' : 'arrow_downward'}
                        size="sm"
                    />{' '}
                    Sort by year published
                </Button>
            </View>

            <View
                style={tailwind(
                    'max-w-screen-xl w-full h-full flex justify-between flex-wrap gap-8 mb-10',
                )}
            >
                {searchResult &&
                    searchResult.map((movie) => (
                        <View style={tailwind('m-auto')} key={movie?._id}>
                            <MovieCard
                                title={movie?.title}
                                description={movie?.description}
                                _id={movie?._id}
                            />
                        </View>
                    ))}
            </View>

            <View style={tailwind('m-auto')}>
                {!pageState.hasNextPage && (
                    <Button
                        size="sm"
                        style={tailwind('')}
                        ripple="light"
                        color="red"
                        onClick={() =>
                            setPageState({
                                ...pageState,
                                page: pageState.page + 1,
                            })
                        }
                    >
                        Show more ...
                    </Button>
                )}
            </View>
        </View>
    )
}
