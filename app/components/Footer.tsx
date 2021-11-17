import React from 'react'
import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn'

export function Footer() {
    return (
        <View
            style={tailwind("flex justify-center w-full my-5 items-center")}
            data-testid="footer-1"
        >
            <Text style={tailwind("opacity-50")}> Just Another Movie Database 2021</Text>
        </View >
    )
}
