import React, { useState } from 'react'
import MovieService from '../services/movieService'
import { CreateMovieVariables } from '../services/movieService/__generated__/CreateMovie'
import { View, Text, Pressable, Alert } from 'react-native'
import { Button, Overlay, Input } from 'react-native-elements'
import tailwind from 'tailwind-rn'

export default function MovieForm() {
    const movieService = new MovieService()

    const [visible, setVisible] = useState(false)

    const [newMovie, setNewMovie] = useState<CreateMovieVariables>({
        title: '',
        description: '',
        published: NaN,
    })

    const handleInputChange = (text: string, name: string) => {
        if (name === 'published') {
            // Form returns string, query requires int for 'published'.
            const publishedInt = parseInt(text)
            setNewMovie((prevState) => ({
                ...prevState,
                [name]: publishedInt,
            }))
        } else {
            setNewMovie((prevState) => ({
                ...prevState,
                [name]: text,
            }))
        }
    }

    const handleSubmit = () => {
        if (!newMovie.title) {
            return
        }

        movieService
            .createMovie(newMovie.title, newMovie.description, newMovie.published)
            .then(() => {
                setVisible(false)
                Alert.alert('Movie successfully created')
                // setTimeout(() => setshowAlert(false), 2000)
            })
            .catch((err: Error) => {
                console.error(err)
            })
    }

    return (
        <>
            <Button
                buttonStyle={tailwind('my-10')}
                onPress={() => setVisible(true)}
                title="Add new movie"
            ></Button>

            <Overlay isVisible={visible} style={tailwind('justify-center items-center flex')}>
                <View style={tailwind('')}>
                    <View
                        style={tailwind(
                            'flex flex-row items-center justify-between p-5 border-b border-solid border-gray-200',
                        )}
                    >
                        <Text style={tailwind('text-black text-3xl')}>Add new movie</Text>
                        <Button
                            buttonStyle={tailwind('p-1 pl-8 bg-transparent')}
                            titleStyle={tailwind('text-black text-xl')}
                            onPress={() => setVisible(false)}
                            title="&#10006;"
                        ></Button>
                    </View>

                    <View>
                        <View style={tailwind('mt-4 mb-8 px-4')}>
                            <Input
                                placeholder="Movie title"
                                onChangeText={(text) => handleInputChange(text, 'title')}
                            />
                        </View>
                        <View style={tailwind('mb-8 px-4')}>
                            <Input
                                placeholder="Summary"
                                onChangeText={(text) => handleInputChange(text, 'description')}
                            />
                        </View>
                        <View style={tailwind('mb-8 px-4')}>
                            <Input
                                placeholder="Release Year"
                                onChangeText={(text) => handleInputChange(text, 'published')}
                            />
                        </View>

                        <View style={tailwind('flex flex-row justify-end')}>
                            <Button
                                title="Cancel"
                                buttonStyle={tailwind('mx-4 bg-red-400')}
                                onPress={() => setVisible(false)}
                            ></Button>
                            <Button title="Create Movie" onPress={() => handleSubmit()}></Button>
                        </View>
                    </View>
                </View>
            </Overlay>
        </>
    )
}
