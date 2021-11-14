import React from 'react'
import { View, Text } from '../Base'

export function Footer() {
    return (
        <View
            className="flex justify-center w-full my-5 items-center"
            data-testid="footer-1"
        >
            <Text className="opacity-50">Just Another Movie Database 2021</Text>
        </View>
    )
}
