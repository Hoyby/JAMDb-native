import React, { useCallback, useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { MovieCard } from './MovieCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { setSearchPage } from '../slices/searchPageSlice'
import { SearchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import tailwind from 'tailwind-rn'
import { addTypenameToDocument } from '@apollo/client/utilities'

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

    const handeSearchChange = (text:string) => {
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

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items, setItems] = useState([
        {label: 'Year Added', value: 'Year Added'},
        {label: 'Year Published', value: 'Year Published'}
      ]);

    const [items2, setItems2] = useState([
        {label: 'Before', value: 'Before'},
        {label: 'After', value: 'After'}
    ]);


    return (
        <ScrollView style={tailwind('mb-40')}>
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
                        onChangeText={text => handeSearchChange(text)}
                        style={tailwind(
                            'w-full h-full text-gray-500 pl-3 pr-9 pt-3.5 pb-2.5 border border-gray-300 rounded-lg',
                        )}
                    />
                    
                        <Text>Search Movies</Text>
                </View>
            </View>
            <View style={tailwind('relative flex flex-row mb-20 items-center')}> 
                <View>
                    <DropDownPicker
                        //color="red" //make it more styllish with https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
                        style={tailwind('whitespace-nowrap mb-10 pr-64')} 
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        containerStyle={{height: 40}}
                        setItems={setItems}
                        onChangeValue={(value) => {
                            if(value == 'Year Added'){
                                setFilters({
                                    ...filters,
                                    filterField: 'createdAt',
                                })
                            }else{
                                setFilters({
                                    ...filters,
                                    filterField: 'published',
                                })
                            }
                        }}
                        //buttonText={
                        //    filters.filterField == 'published' ? 'Year Published' : 'Year Added'
                        //}
                        //buttonType="outline"
                        //size="sm"
                        //ripple="dark"

                    />
                        {/* <DropdownLink
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
                        </DropdownLink> */}
                </View>

                <View>
                    <DropDownPicker
                        style={tailwind('whitespace-nowrap mb-10 mr-40')}
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        containerStyle={{height: 40}}
                        setItems={setItems}
                        onChangeValue={(value) => {
                            if(value == 'Before'){
                                setFilters({
                                    ...filters,
                                    filterCond: '$lte',
                                })
                            }else{
                                setFilters({
                                    ...filters,
                                    filterCond: '$gte',
                                })
                            }
                        }}

                    />
                
                {/*
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
                        */}
                </View>

                {/* <View>
                    <TextInput
                        style={tailwind(
                            'h-full text-gray-200 overflow-visible pl-3 pr-3 py-2.5 text-sm border-gray-300 border  rounded-lg',
                        )}
                        placeholder={filters.filterValue.toString()}
                        onChangeText={(e:any) =>
                            setFilters({
                                ...filters,
                                filterValue: parseInt(e.target.value),
                            })
                        }
                    />
                </View> */}
                {/* <Button
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
                </Button> */}
            </View>

            <ScrollView
                contentContainerStyle={tailwind(
                    'max-w-screen-xl w-full h-full flex justify-between flex-wrap mb-10',
                )}
            >
                {searchResult &&
                    searchResult.map((movie) => (
                        <ScrollView style={tailwind('')} key={movie?._id}>
                            <MovieCard
                                title={movie?.title}
                                description={movie?.description}
                                _id={movie?._id}
                            />
                        </ScrollView>
                    ))}
            </ScrollView>

            <View style={tailwind('')}>
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
        </ScrollView>
    )
}
