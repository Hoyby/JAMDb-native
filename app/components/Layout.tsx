import React, { ReactNode } from 'react'
import NavBar from './Navbar'
import { Footer } from './Footer'
import { ScrollView, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'tailwind-rn'
import styles from '../styles/global'

/**
 * Layout wrapper
 */

export function Layout({ children }: { children: ReactNode }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.body}>
                <NavBar />
                <View style={tailwind('flex flex-col max-w-screen-xl w-full my-0 px-5')}>
                    <ScrollView
                        style={tailwind('flex-grow')}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </View>
                <Footer />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
