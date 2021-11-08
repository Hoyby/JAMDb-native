import { FetchResult } from '@apollo/client'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { apolloClient } from '../../graphql'
import {
    CREATE_MOVIE,
    GET_MOVIE_BY_ID,
    UPDATE_MOVIE,
    SEARCH_MOVIES_PAGE,
    DELETE_MOVIE,
} from './queries'
import { CreateMovie } from './__generated__/CreateMovie'
import { DeleteMovie } from './__generated__/DeleteMovie'
import { FindMovie } from './__generated__/FindMovie'
import { UpdateMovie } from './__generated__/UpdateMovie'
import { SearchMoviesPage, SearchMoviesPageVariables } from './__generated__/SearchMoviesPage'

export default class MovieService {
    async findMovie(_id: string): Promise<FindMovie['findMovie']> {
        try {
            const response: ApolloQueryResult<FindMovie> = await apolloClient.query({
                query: GET_MOVIE_BY_ID,
                variables: { _id },
            })

            if (!response || !response.data) throw new Error('Cannot get movie list!')

            return response.data.findMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async createMovie(
        title: string,
        description: string,
        published: number,
    ): Promise<CreateMovie['createMovie']> {
        try {
            const response: FetchResult<CreateMovie> = await apolloClient.mutate({
                mutation: CREATE_MOVIE,
                variables: { title, description, published },
            })

            if (!response || !response.data) throw new Error('Cannot get movie list!')

            return response.data.createMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async updateMovie(
        _id: string,
        title: string,
        description: string,
        published: number,
    ): Promise<UpdateMovie['updateMovie']> {
        try {
            const response: FetchResult<UpdateMovie> = await apolloClient.mutate({
                mutation: UPDATE_MOVIE,
                variables: { _id, title, description, published },
            })

            if (!response || !response.data) throw new Error('Cannot get movie list!')

            return response.data.updateMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async deleteMovie(_id: string): Promise<DeleteMovie['deleteMovie']> {
        try {
            const response: FetchResult<DeleteMovie> = await apolloClient.mutate({
                mutation: DELETE_MOVIE,
                variables: { _id },
            })

            if (!response || !response.data) throw new Error('Cannot get movie list!')

            return response.data.deleteMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async searchMoviesPage(
        variables: SearchMoviesPageVariables,
    ): Promise<SearchMoviesPage['searchMoviesPage']> {
        try {
            const response: ApolloQueryResult<SearchMoviesPage> = await apolloClient.query({
                query: SEARCH_MOVIES_PAGE,
                variables: variables,
            })

            if (!response || !response.data) throw new Error('Cannot get movie page!')

            return response.data.searchMoviesPage
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}
