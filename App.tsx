import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { Provider } from 'react-redux'
import Dashboard from './app/components/Dashboard'
import { Layout } from './app/components/Layout'
import { apolloClient } from './app/graphql'
import { store } from './app/store'
// import './app/styles/global.css'
import styles from './app/styles/global'
import { View } from 'react-native'


export default function App() {

    return (
        <View style={styles.body}>
            <Provider store={store}>
                <ApolloProvider client={apolloClient}>
                    <Layout>
                        <Dashboard />
                    </Layout>
                </ApolloProvider>
            </Provider>
        </View>
    )
}
