import React, { useRef, useState } from 'react'
import { View, Text, Image, ScrollView, TextInput, Button, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState('hidden')
    // const profileRef = useRef()
    // const settingsRef = useRef()

    const notImplemented = (
        <View>
            <View>Whops! That's embarrassing</View>
            <View>This functionality has not yet been implemented.</View>
        </View>
    )

    return (
        <>
            <nav
                style={tailwind('flex justify-start items-start shadow-lg py-1 px-5 bg-gray-700')}
                data-testid="nav"
            >
                <View style={tailwind('container flex items-center justify-between')}>
                    <View style={tailwind('w-full flex flex-row justify-between')}>
                        <View
                            style={tailwind(
                                'text-sm font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap text-white',
                            )}
                        >
                            <Text style={tailwind('text-red-600 text-2xl')}>JAMDb</Text>
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
                            <span style={tailwind('relative w-6 h-px rounded-sm bg-white')}></span>
                            <span
                                style={tailwind('relative w-6 h-px rounded-sm bg-white mt-1')}
                            ></span>
                            <span
                                style={tailwind('relative w-6 h-px rounded-sm bg-white mt-1')}
                            ></span>
                        </Pressable>
                    </View>
                    <View style={tailwind(`flex-grow items-center ${openMenu}`)}>
                        <View style={tailwind('flex ml-auto flex-col items-center')}>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex gap-1 text-xs uppercase font-medium leading text-white rounded-lg justify-start bg-gray-700',
                                )}
                            >
                                <Text> Discover </Text>
                            </Pressable>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex gap-1 text-xs uppercase font-medium leading text-white rounded-lg justify-start',
                                )}
                            >
                                <Text> Profile </Text>
                            </Pressable>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex gap-1 text-xs uppercase font-medium leading text-white rounded-lg justify-start',
                                )}
                            >
                                <Text> Settings </Text>
                            </Pressable>
                            {/* <Popover placement="bottom" ref={profileRef}>
                                {notImplemented}
                            </Popover>
                            <Popover placement="bottom" ref={settingsRef}>
                                {notImplemented}
                            </Popover> */}
                        </View>
                    </View>
                </View>
            </nav>
        </>
    )
}
