import React from 'react'
import MovieDetail from './MovieDetail'
import { Link, Route } from 'react-router-native'
import { Routes, BrowserRouter } from 'react-router-dom'

import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn'
/* eslint-enable */

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
        let shortDesc = description.split(' ').slice(0, 12).join(' ')
        if (description.length > shortDesc.length) shortDesc += '...'
        return shortDesc
    }

    return (
        <View style={tailwind('w-80')}>
            {/* <BrowserRouter>
                <Link to={'/movies/' + _id} key={_id}> */}
                    <View>
                        <View>
                            <Text>{title}</Text>
                            <Text>{shortDesc()}</Text>
                        </View>

                        <View>
                            <Text style={tailwind('text-red-500')}>Read More</Text>
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
