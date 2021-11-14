import React from 'react'
import tailwind from 'tailwind-rn'
import getDisplayName from 'react-display-name'

export function withTailwind(Component: any) {
    function ComponentWithTailwind({ className, style, ...rest }: Record<string, unknown>) {
        const classes = (className
            ? Array.isArray(className)
                ? className.flat().filter(Boolean).join(' ')
                : className
            : '') as string


        return <Component style={[tailwind(classes), style && style]} {...rest} />
    }
    ComponentWithTailwind.displayName = `withTailWind(${getDisplayName(Component)})`

    return ComponentWithTailwind
}
