import React from 'react'
import { Link } from 'react-router-native'

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
                {text}
            </button>
        </Link>
    )
}

export default Button
