import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1, // fill all available space
        alignItems: 'center',
        padding: '0%',
        margin: '0%',
        fontFamily:
            //"BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            "Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue",
        backgroundColor: 'radial-gradient(at top left, rgb(40, 40, 40), rgb(20, 20, 20) 100%)',
        color: 'white',
    },
})
