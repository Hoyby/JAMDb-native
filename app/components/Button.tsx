import React from 'react'
import { Link } from 'react-router-native'
import { Text } from 'react-native'

interface IButtonProps {
    text: string
    styling?: string
    to?: string
    onClick?: () => void
}

function Button({ to, onClick, styling, text }: IButtonProps) {
    return (
        <Link to={to ? to : ''}>
            <button onClick={onClick} className={styling}>
                <Text>{text}</Text>
            </button>
        </Link>
    )
}

export default Button
