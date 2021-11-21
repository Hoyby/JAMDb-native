import React, { useEffect, useState, useCallback } from 'react'
import MovieService from '../services/movieService'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { setSearchPage } from '../slices/searchPageSlice'
import { SearchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'
import { View } from 'react-native'
import tailwind from 'tailwind-rn'
import { Button, Input, ButtonGroup } from 'react-native-elements'
import MovieList, { IPageState } from './MovieList'

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

    const initialPageState: IPageState = {
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

    let timer: NodeJS.Timeout

    const handeSearchChange = (text: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setSearchInput(text)
        }, 700)
    }

    const handleFilterChange = (text: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            if (isNaN(Number(text)) || text.length == 0) {
                setFilters({
                    ...filters,
                    filterValue: 2000,
                })
            } else {
                setFilters({
                    ...filters,
                    filterValue: parseInt(text),
                })
            }
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

        (async () => fetchSearchResults())()
            .catch((err: Error) => {
                console.error(err.message)
                throw err
            })
    }, [])

    const [FilterByIndex, setFilterByIndex] = useState(0)
    const [BeforeOrAfterIndex, setBeforeOrAfterIndex] = useState(0)

    return (
        <View>
            <View style={tailwind('my-10')}>
                {/* Search Bar */}
                <View style={tailwind('w-full relative h-12')}>
                    <Input
                        onChangeText={(text: string) => handeSearchChange(text)}
                        placeholder="Search..."
                        style={tailwind(
                            'w-full h-full text-white pl-3 pr-9 pt-3.5 pb-2.5 border border-gray-300 rounded-lg',
                        )}
                    />
                </View>
            </View>

            <View style={tailwind('flex flex-col')}>
                <ButtonGroup
                    containerStyle={tailwind('mb-4')}
                    selectedTextStyle={tailwind('')}
                    selectedButtonStyle={tailwind('')}
                    buttons={['Published', 'Created At']}
                    selectedIndex={FilterByIndex}
                    onPress={(value) => {
                        switch (value) {
                            case 0:
                                setFilterByIndex(0)
                                setFilters({
                                    ...filters,
                                    filterField: 'published',
                                })
                                break
                            case 1:
                                setFilterByIndex(1)
                                setFilters({
                                    ...filters,
                                    filterField: 'createdAt',
                                })
                                break
                        }
                    }}
                />

                <ButtonGroup
                    containerStyle={tailwind('mb-4')}
                    buttons={['Before', 'After']}
                    selectedIndex={BeforeOrAfterIndex}
                    onPress={(value) => {
                        switch (value) {
                            case 0:
                                setBeforeOrAfterIndex(0)
                                setFilters({
                                    ...filters,
                                    filterField: '$lte',
                                })
                                break
                            case 1:
                                setBeforeOrAfterIndex(1)
                                setFilters({
                                    ...filters,
                                    filterField: '$gte',
                                })
                                break
                        }
                    }}
                />

                <View>
                    <Input
                        style={tailwind(
                            'w-full text-white pl-3 pr-9 pt-3.5 pb-2.5 mb-4 border border-gray-300 rounded-lg',
                        )}
                        placeholder={filters.filterValue.toString()}
                        onChangeText={(text) => handleFilterChange(text)}
                    />
                </View>

                <Button
                    title={'Sort by year published'}
                    onPress={() =>
                        setFilters({
                            ...filters,
                            sortValue: -filters.sortValue,
                        })
                    }
                ></Button>
            </View>
            <MovieList pageState={pageState} searchResult={searchResult} setPageState={useCallback(setPageState, [])} />

        </View>
    )
}
