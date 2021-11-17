import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Tooltip } from 'react-native-elements'

import tailwind from 'tailwind-rn'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState('hidden')
    // const profileRef = useRef()
    // const settingsRef = useRef()

    const notImplemented = (
        <View>
            <View>
                <Text>Whops! That's embarrassing</Text>
            </View>
            <View>
                <Text>This functionality has not yet been implemented.</Text>
            </View>
        </View>
    )

    return (
        <>
            <View style={tailwind('flex w-full max-w-screen-xl px-4')} data-testid="nav">
                <View style={tailwind('flex items-center justify-between')}>
                    <View style={tailwind('w-full flex flex-row justify-between')}>
                        <View style={tailwind('text-sm font-bold mr-4 text-white')}>
                            <Text style={tailwind('text-red-600 text-2xl font-bold')}>JAMDb</Text>
                            <Text style={tailwind('opacity-25 m-0 p-0 text-white')}>
                                Just Another Movie Database
                            </Text>
                        </View>
                        <Pressable
                            style={tailwind('text-xl p-2 justify-center border-transparent')}
                            onPress={() =>
                                openMenu == 'hidden' ? setOpenMenu('flex') : setOpenMenu('hidden')
                            }
                        >
                            <Text style={tailwind('relative w-6 h-px rounded-sm bg-white')}></Text>
                            <Text
                                style={tailwind('relative w-6 h-px rounded-sm bg-white mt-1')}
                            ></Text>
                            <Text
                                style={tailwind('relative w-6 h-px rounded-sm bg-white mt-1')}
                            ></Text>
                        </Pressable>
                    </View>
                    <View style={tailwind(`flex-grow mt-8 items-center ${openMenu}`)}>
                        <View style={tailwind('flex flex-col items-center')}>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex text-xs uppercase font-medium  text-white rounded-lg justify-start bg-gray-700',
                                )}
                            >
                                <Text style={tailwind('text-white')}> Discover </Text>
                            </Pressable>
                            <View
                                style={tailwind(
                                    'px-6 py-4 my-2 flex text-xs uppercase font-medium  text-white rounded-lg justify-start border border-gray-500',
                                )}
                            >
                                <Tooltip
                                    popover={notImplemented}
                                    backgroundColor={'#ffffff'}
                                    overlayColor={'transparent'}
                                    height={120}
                                >
                                    <Text style={tailwind('text-white')}> Profile </Text>
                                </Tooltip>
                            </View>
                            <View
                                style={tailwind(
                                    'px-5 py-4 flex text-xs uppercase font-medium  text-white rounded-lg justify-start border border-gray-500',
                                )}
                            >
                                <Tooltip
                                    popover={notImplemented}
                                    backgroundColor={'#ffffff'}
                                    overlayColor={'transparent'}
                                    height={120}
                                >
                                    <Text style={tailwind('text-white')}> Settings </Text>
                                </Tooltip>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
