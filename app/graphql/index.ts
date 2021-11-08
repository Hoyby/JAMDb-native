import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
    uri: 'http://129.241.104.148:4000/graphql',
    cache: new InMemoryCache(),
})
