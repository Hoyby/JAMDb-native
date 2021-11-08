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
        <View style={tailwind('h-full mt-8 relative')}>
            <NavBar />
            <ScrollView style={tailwind('flex flex-col  my-0  px-10')}>{children}</ScrollView>
            <Footer />
        </View>
    )
}
