import React from 'react'
import tailwind from 'tailwind-rn'

export function Footer() {
    return (
        <footer
            style={tailwind('flex justify-center w-full my-5 absolute bottom-0')}
            data-testid="footer-1"
        >
            <p style={tailwind('opacity-50')}>Just Another Movie Database 2021</p>
        </footer>
    )
}
