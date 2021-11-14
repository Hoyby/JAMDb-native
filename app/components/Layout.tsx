import React, { ReactNode } from 'react'
import NavBar from './Navbar'
import { Footer } from './Footer'
import { ScrollView, View } from '../Base'

/**
 * Layout wrapper
 */

export function Layout({ children }: { children: ReactNode }) {
    return (
        <View
            className='mt-8 relative flex-1'
        >
            <NavBar />

            <ScrollView className='flex flex-col max-w-screen-xl my-0 px-10'>
                <ScrollView className="flex-grow" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>{children}</ScrollView>
            </ScrollView>

            <Footer />
        </View>
    )
}
