import React from 'react'
import MovieDetail from './MovieDetail'
import { Link, Route, Switch, BrowserRouter } from 'react-router-native'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import Card from '@material-tailwind/react/Card'
// @ts-ignore
import CardBody from '@material-tailwind/react/CardBody'
// @ts-ignore
import Paragraph from '@material-tailwind/react/Paragraph'
// @ts-ignore
import CardFooter from '@material-tailwind/react/CardFooter'
// @ts-ignore
import H6 from '@material-tailwind/react/Heading6'
import { View } from 'react-native'
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
            <BrowserRouter>
                <Link to={'/movies/' + _id} key={_id}>
                    <Card>
                        <CardBody>
                            <H6>{title}</H6>
                            <Paragraph color="gray">{shortDesc()}</Paragraph>
                        </CardBody>

                        <CardFooter>
                            <p style={tailwind('text-red-500')}>Read More</p>
                        </CardFooter>
                    </Card>
                </Link>
                <Switch>
                    <Route path="/movies/:id" children={<MovieDetail />} />
                </Switch>
            </BrowserRouter>
        </View>
    )
}
