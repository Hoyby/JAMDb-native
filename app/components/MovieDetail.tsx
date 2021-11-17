import React, { SetStateAction, useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-native'
import MovieService from '../services/movieService'
import { FindMovie_findMovie } from '../services/movieService/__generated__/FindMovie'
import { Button, Overlay } from 'react-native-elements'
import tailwind from 'tailwind-rn'
import { View, Text } from 'react-native'

/**
 * Provides information about a spesific movie
 */

export default function MovieDetail() {
    const movieService = new MovieService()

    const { id: movieId } = useParams<{ id: string }>()
    const [movie, setMovie] = useState<FindMovie_findMovie>()
    const [showModal, setShowModal] = useState(true)
    let queryResult: SetStateAction<FindMovie_findMovie | undefined> | null = null

    async function fetchMovie() {
        queryResult = await movieService.findMovie(movieId)
        setMovie(queryResult)
    }

    useEffect(() => {
        fetchMovie().catch((err: Error) => {
            console.error(err.message)
        })
    }, [])

    if (!showModal) {
        return <Navigate to="/" />
    }

    return (
        <Overlay isVisible={true} style={tailwind('')}>
            <Text style={tailwind('text-2xl')}>{movie?.title || 'Could not get name'}</Text>

            <View style={tailwind('max-w-lg')}>
                {movie?.published && (
                    <Text style={tailwind('text-base text-gray-600 font-light mb-10')}>
                        Released: {movie?.published}
                    </Text>
                )}

                <Text style={tailwind('text-base text-gray-600 font-normal')}>
                    {movie?.description}
                </Text>
            </View>

            <View>
                <Link to={'/'}>
                    <Button
                        onPress={() => setShowModal(false)}
                        buttonStyle={tailwind('m-4 bg-red-400')}
                        title="Close"
                    ></Button>
                </Link>
            </View>
        </Overlay>
    )
}
