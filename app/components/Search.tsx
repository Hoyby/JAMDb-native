import React, { useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { MovieCard } from './MovieCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { setSearchPage } from '../slices/searchPageSlice'
import { SearchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'
import { TextInput, Pressable, View, Text, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn'

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

    const handeSearchChange = (text: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setSearchInput(text)
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
            <View style={tailwind('my-10')}>
                {/* Search Bar */}
                <View style={tailwind('w-full relative h-12')}>
                    <View
                        style={tailwind(
                            'p-0 text-gray-600 text-opacity-60 absolute top-1/2 right-3 text-xl',
                        )}
                    >
                        <Text>search</Text>
                    </View>
                    <TextInput
                        onChangeText={(text) => handeSearchChange(text)}
                        style={tailwind(
                            'w-full h-full text-gray-500 pl-3 pr-9 pt-3.5 pb-2.5 border border-gray-300 rounded-lg',
                        )}
                    />

                    <Text>Search Movies</Text>
                </View>
            </View>
            <View style={tailwind('relative flex flex-col mb-4 items-center')}>
                <View></View>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tailwind(
                    'max-w-screen-xl w-full h-full flex flex-row justify-between flex-wrap',
                )}
            >
                {searchResult &&
                    searchResult.map((movie) => (
                        <MovieCard
                            title={movie?.title}
                            description={movie?.description}
                            _id={movie?._id}
                            key={movie._id}
                        />
                    ))}
            </ScrollView>

            <View>
                {!pageState.hasNextPage && (
                    <Pressable
                        style={tailwind('')}
                        onPress={() =>
                            setPageState({
                                ...pageState,
                                page: pageState.page + 1,
                            })
                        }
                    >
                        <Text>Show more ...</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
}
