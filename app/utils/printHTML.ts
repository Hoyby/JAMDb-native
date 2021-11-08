import { prettyDOM } from '@testing-library/react'

export function printHTML(DOM: HTMLElement | Element | undefined): void {
    console.log(prettyDOM(DOM))
}
