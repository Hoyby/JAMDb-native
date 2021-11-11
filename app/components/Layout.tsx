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
        <View
            style={[
                tailwind('mt-8 relative'),
                {
                    flex: 1,
                },
            ]}
        >
            <NavBar />

            <ScrollView style={tailwind('flex flex-col max-w-screen-xl my-0 px-10')}>
                <ScrollView style={tailwind('flex-grow')}>{children}</ScrollView>
            </ScrollView>

            <Footer />
        </View>
    )
}
