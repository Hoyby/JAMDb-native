import { ApolloProvider } from '@apollo/client'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import Dashboard from './app/components/Dashboard'
import { Layout } from './app/components/Layout'
import { apolloClient } from './app/graphql'
import { store } from './app/store'
import { View } from 'react-native'
import * as Font from 'expo-font'
import  AppLoading  from 'expo-app-loading'

const fetchFonts = () => {
    return Font.loadAsync({
        //'BlinkMacSystemFont' : require('./assets/fonts/'),
        'Segoe UI' : require('./assets/fonts/SegoeUI.ttf'),
        'Roboto' : require('./assets/fonts/roboto.regular.ttf'),
        'Oxygen' : require('./assets/fonts/oxygen.regular.ttf'),
        'Ubuntu' : require('./assets/fonts/Ubuntu-R.ttf'),
        'Cantarell' : require('./assets/fonts/cantarell.regular.ttf'),
        'Fira Sans' : require('./assets/fonts/fira-sans.regular.ttf'),
        'Droid Sans' : require('./assets/fonts/droid-sans.regular.ttf'),
        'Helvetica Neue' : require('./assets/fonts/HelveticaNeueMedium.ttf'),
        //'sans-serif' : require('./assets/fonts/sans-serif.ttf'),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if(!fontLoaded) {
        return (
            <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError={console.warn}
            />
        );
    }
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
