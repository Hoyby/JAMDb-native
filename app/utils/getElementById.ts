export function getElementById(DOM: Element, id: string): Element {
    const elementOrNull = DOM.querySelector(`#${id}`)
    if (elementOrNull === null) {
        throw new Error(`Element with id ${id} does not exist within ${DOM}`)
    }

    return elementOrNull as Element
}
