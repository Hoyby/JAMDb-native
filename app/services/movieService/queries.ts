// eslint-disable-next-line
import gql from 'graphql-tag'

export const GET_MOVIE_BY_ID = gql`
    query FindMovie($_id: String!) {
        findMovie(input: { _id: $_id }) {
            title
            description
            published
            updatedAt
            createdAt
        }
    }
`

export const SEARCH_MOVIES_PAGE = gql`
    query SearchMoviesPage(
        $searchQuery: String!
        $take: Float!
        $skip: Float!
        $orderField: String!
        $orderValue: Float!
        $filterField: String!
        $filterCond: String!
        $filterValue: Float!
    ) {
        searchMoviesPage(
            input: {
                searchQuery: $searchQuery
                take: $take
                skip: $skip
                orderField: $orderField
                orderValue: $orderValue
                filterField: $filterField
                filterCond: $filterCond
                filterValue: $filterValue
            }
        ) {
            _id
            title
            description
            published
            updatedAt
            createdAt
        }
    }
`
export const CREATE_MOVIE = gql`
    mutation CreateMovie($title: String!, $description: String!, $published: Int!) {
        createMovie(input: { title: $title, description: $description, published: $published }) {
            title
            description
            published
            updatedAt
            createdAt
        }
    }
`

export const UPDATE_MOVIE = gql`
    mutation UpdateMovie($_id: String!, $title: String!, $description: String!, $published: Int!) {
        updateMovie(
            input: { _id: $_id, title: $title, description: $description, published: $published }
        ) {
            title
            description
            published
            updatedAt
        }
    }
`

export const DELETE_MOVIE = gql`
    mutation DeleteMovie($_id: String!) {
        deleteMovie(input: { _id: $_id })
    }
`
