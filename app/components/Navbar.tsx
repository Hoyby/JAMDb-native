import React, { useRef, useState } from 'react'
import { View, Text, Image, ScrollView, TextInput, Button, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState('hidden')
    // const profileRef = useRef()
    // const settingsRef = useRef()

    const notImplemented = (
        <View>
            <View><Text>Whops! That's embarrassing</Text></View>
            <View><Text>This functionality has not yet been implemented.</Text></View>
        </View>
    )

    return (
        <>
            <View
                style={tailwind('flex justify-start items-start px-5')}
                data-testid="nav"
            >
                <View style={tailwind('container flex items-center justify-between')}>
                    <View style={tailwind('w-full flex flex-row justify-between')}>
                        <View style={tailwind('text-sm font-bold   mr-4  text-white')}>
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
                    <View style={tailwind(`flex-grow items-center ${openMenu}`)}>
                        <View style={tailwind('flex  flex-col items-center')}>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex  text-xs uppercase font-medium  text-white rounded-lg justify-start bg-gray-700',
                                )}
                            >
                                <Text> Discover </Text>
                            </Pressable>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex  text-xs uppercase font-medium  text-white rounded-lg justify-start',
                                )}
                            >
                                <Text> Profile </Text>
                            </Pressable>
                            <Pressable
                                style={tailwind(
                                    'px-5 py-4 flex  text-xs uppercase font-medium  text-white rounded-lg justify-start',
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
            </View>
        </>
    )
}
