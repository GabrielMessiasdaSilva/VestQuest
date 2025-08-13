import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f8fa",
        paddingHorizontal: 24,
        paddingTop: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#FCCA46',
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        flexDirection: 'row',
        zIndex: 10,
    },
    title: {
        fontSize: 16,
        marginTop: 18,
        fontWeight: '500',
        color: '#000000',
    },
    iconPlaceholder: {
        width: 24,
        marginTop: 18,
        height: 24,
        borderRadius: 12,
        marginRight: 16,
        maxWidth: 24,
        maxHeight: 24,
    },
    assuntos: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 16,
        color: '#333',
        maxWidth: '90%',
        alignSelf: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    speechBubble: {
        width: 200,
        height: 140,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 90,
        marginBottom: -35,
    },
    speechText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 7,
        paddingHorizontal: 12,
        transform: [{ rotate: "4.91deg" }],
    },
    assuntosContainer: {
        alignItems: 'center',
        marginTop: 12
    },
    assuntosBox: {
        width: '90%',
        alignItems: 'flex-start',
        borderRadius: 14,
        borderColor: '#FCCA46',
        borderWidth: 2,
        padding: 16,
        backgroundColor: '#f7f8fa',
    },
    assuntoText: {
        marginVertical: 8,
        fontSize: 14,
        color: '#222',
    },
    assuntoBold: {
        fontWeight: 500,
    },
    assuntoParenteses: {
        color: '#B5B5B5',
    },
});