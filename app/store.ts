import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import searchPageReducer from './slices/searchPageSlice'

/**
 * Redux store
 */

export const store = configureStore({
    reducer: {
        searchPage: searchPageReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
