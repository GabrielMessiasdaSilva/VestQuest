import { StyleSheet } from 'react-native';

export const splashStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#233D4D',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export const onboardingStyles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    slideImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    slideDescription: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#233D4D',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 10,
        marginBottom: 10,
    },
    activeDot: {
        backgroundColor: '#233D4D',
        width: 8,
        height: 8,
        borderRadius: 10,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 30,
    },
});