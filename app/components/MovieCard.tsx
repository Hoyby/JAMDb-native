import React from 'react'
import MovieDetail from './MovieDetail'
import { Link, Route } from 'react-router-native'
import { Routes, BrowserRouter } from 'react-router-dom'
import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn'

interface IMovieCard {
    _id: string
    title: string
    description: string
}

export function MovieCard({ title, description, _id }: IMovieCard) {
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
        <View style={tailwind("my-2")}>
            {/* <BrowserRouter>
                <Link to={'/movies/' + _id} key={_id}> */}
            <View style={tailwind("bg-white rounded-xl w-80 p-4")}>
                <View>
                    <Text style={tailwind("text-gray-900 text-xl font-bold")}>{title}</Text>
                    <Text style={tailwind("mb-4")}>{shortDesc()}</Text>
                </View>

                <View>
                    <Text style={tailwind("text-red-500")}>Read More</Text>
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
