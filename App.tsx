import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { Provider } from 'react-redux'
import Dashboard from './app/components/Dashboard'
import { Layout } from './app/components/Layout'
import { apolloClient } from './app/graphql'
import { store } from './app/store'
import './app/styles/global.css'

export default function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Layout>
                    <Dashboard />
                </Layout>
            </ApolloProvider>
        </Provider>
    )
}
