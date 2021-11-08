export class CustomeEventTarget {
    readonly target: {
        value: string | number | boolean
        addEventListener: () => false
        dispatchEvent: () => false
        removeEventListener: () => false
    }

    constructor(targetValue: string | number | boolean) {
        this.target = {
            value: targetValue,
            addEventListener: () => false,
            dispatchEvent: () => false,
            removeEventListener: () => false,
        }
    }
}
