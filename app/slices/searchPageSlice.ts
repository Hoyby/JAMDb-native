import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'
export interface ISearchResultState {
    searchPage: SearchMoviesPage['searchMoviesPage'] // Array of movies
}

const initialState: ISearchResultState = {
    searchPage: [], // Initialize with 0 movies
}

const SearchPageSlice = createSlice({
    name: 'searchPage',
    initialState,
    reducers: {
        setSearchPage(state, action: PayloadAction<SearchMoviesPage['searchMoviesPage']>) {
            if (action) state.searchPage = action.payload // Set new state with the value of action
        },
    },
})

export const { setSearchPage: setSearchPage } = SearchPageSlice.actions
export default SearchPageSlice.reducer
