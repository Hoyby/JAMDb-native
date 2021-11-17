import React, { ReactNode } from 'react'
import NavBar from './Navbar'
import { Footer } from './Footer'
import { ScrollView, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn'
import styles from '../styles/global'

/**
 * Layout wrapper
 */

export function Layout({ children }: { children: ReactNode }) {
    return (
        <SafeAreaView style={styles.body}>
            <NavBar />
            <ScrollView style={tailwind('flex flex-col max-w-screen-xl my-0 px-10')}>
                <ScrollView
                    style={tailwind('flex-grow')}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}
