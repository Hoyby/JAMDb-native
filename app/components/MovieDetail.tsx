import React, { SetStateAction, useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-native'
import MovieService from '../services/movieService'
import { FindMovie_findMovie } from '../services/movieService/__generated__/FindMovie'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import Modal from '@material-tailwind/react/Modal'
// @ts-ignore
import ModalHeader from '@material-tailwind/react/ModalHeader'
// @ts-ignore
import ModalBody from '@material-tailwind/react/ModalBody'
// @ts-ignore
import ModalFooter from '@material-tailwind/react/ModalFooter'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
import tailwind from 'tailwind-rn'
/* eslint-enable */

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
        return <Redirect to="/" />
    }

    return (
        <Modal size="regular" active={showModal} toggler={() => setShowModal(false)}>
            <ModalHeader toggler={() => setShowModal(false)}>
                {movie?.title || 'Could not get name'}
            </ModalHeader>

            <ModalBody>
                <p style={tailwind('text-base leading-relaxed text-gray-600 font-light mb-10')}>
                    Released: {movie?.published}
                </p>
                <p style={tailwind('text-base leading-relaxed text-gray-600 font-normal')}>
                    {movie?.description}
                </p>
            </ModalBody>

            <ModalFooter>
                <Link to={'/'}>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={() => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </Link>
            </ModalFooter>
        </Modal>
    )
}
