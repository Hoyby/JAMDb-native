import React from 'react'
import MovieDetail from './MovieDetail'
import { Link, Route } from 'react-router-native'
import { Routes, BrowserRouter } from 'react-router-dom'
import { View, Text } from '../Base'

interface IMovieCard {
    _id: string
    title: string
    description: string
    className?: string
}

export function MovieCard({ title, description, _id, className }: IMovieCard) {
    const shortDesc = () => {
        /**
         * Returns a short version of the description
         * Appends 3 dots if the description contains data that is not presented
         */
        const desc = description.split(' ').slice(0, 12).join(' ')
        if (description.length > desc.length) return desc + '...'
        return desc
    }

    return (
        <View className={`my-2 ${className}`}>
            {/* <BrowserRouter>
                <Link to={'/movies/' + _id} key={_id}> */}
            <View className="bg-white rounded-xl w-80 p-4">
                <View>
                    <Text className="text-grey-900 text-xl font-serif font-bold">{title}</Text>
                    <Text className="mb-4">{shortDesc()}</Text>
                </View>

                <View>
                    <Text className="text-red-500">Read More</Text>
                </View>
            </View>
            {/* </Link>
                 <Routes>
                     <Route path="/movies/:id" children={<MovieDetail />} />
                 </Routes>
            </BrowserRouter> */}
        </View>
    )
}
