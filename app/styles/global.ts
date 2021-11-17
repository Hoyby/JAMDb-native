import { StyleSheet, Platform, StatusBar } from 'react-native'

export default StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // status bar height
        flex: 1, // fill all available space
        margin: '0%',
        padding: '0%',
        fontFamily:
            "apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        backgroundColor: 'radial-gradient(at top left, rgb(40, 40, 40), rgb(20, 20, 20) 100%)',
        color: 'white',
    },
})
