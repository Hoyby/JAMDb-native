import React, { ReactNode } from 'react'
import NavBar from './Navbar'
import { Footer } from './Footer'
import { ScrollView, View } from 'react-native'
import tailwind from 'tailwind-rn'

/**
 * Layout wrapper
 */

export function Layout({ children }: { children: ReactNode }) {
    return (
        <View style={tailwind('h-full relative')}>
            <NavBar />
            <ScrollView style={tailwind('flex flex-col h-screen my-0 mx-auto px-10')}>
                {children}
            </ScrollView>
            <Footer />
        </View>
    )
}
