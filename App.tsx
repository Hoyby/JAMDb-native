import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import Dashboard from './app/components/Dashboard'
import { Layout } from './app/components/Layout'
import { apolloClient } from './app/graphql'
import { store } from './app/store'

export default function App() {
    return (
        <Provider store={store}>
            {/* <ApolloProvider client={apolloClient}> */}
            <Layout>
                {/* <Dashboard /> */}
                <Text>test</Text>
            </Layout>
            {/* </ApolloProvider> */}
        </Provider>
    )
}
