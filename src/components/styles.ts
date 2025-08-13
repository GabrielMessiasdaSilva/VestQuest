import { StyleSheet } from 'react-native';

export const footer = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#eee',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export const timeModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        backgroundColor: '#eee',
        borderRadius: 16,
        borderColor: '#619B8A',
        borderWidth: 3,
        padding: 24,
        width: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        width: 100,
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 8,
        padding: 4,
    },
    label: {
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    activateButton: {
        backgroundColor: '#619B8A',
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 16,
        marginRight: 14,
        minWidth: 80,
        alignItems: 'center',
    },
    activateButtonText: {
        color: '#eee',
        fontWeight: '300',
        fontSize: 15,
    },
    deactivateButton: {
        backgroundColor: '#eee',
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#A92929',
        minWidth: 80,
        alignItems: 'center',
    },
    deactivateButtonText: {
        color: '#A92929',
        fontWeight: '300',
        fontSize: 15,
    },
});

export const greenModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        backgroundColor: '#DEEAD3',
        borderRadius: 16,
        borderColor: '#000000',
        borderWidth: 3,
        padding: 24,
        width: 300,
        alignItems: 'center',
    },
    activateButton: {
        backgroundColor: '#233D4D',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 16,
        minWidth: 80,
        alignItems: 'center',
    },
    activateButtonText: {
        color: '#eee',
        fontWeight: '300',
        fontSize: 15,
    },
    balaoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    balaoInner: {
        alignItems: 'center',
    },
    balaoImg: {
        width: 190,
        height: 130,
        top: 20,
        left: 50,
    },
    balaoText: {
        position: 'absolute',
        top: 55,
        right: 16,
        color: '#000000',
        fontSize: 13,
        fontWeight: 'bold',
        transform: [{ rotate: '4.91deg' }],
        textAlign: 'center',
    },
    raposaImg: {
        width: 280,
        height: 250,
    },
});

export const redModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        backgroundColor: '#E9CDCD',
        borderRadius: 16,
        borderColor: '#000000',
        borderWidth: 3,
        padding: 24,
        width: 300,
        alignItems: 'center',
    },
    activateButton: {
        backgroundColor: '#233D4D',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 16,
        minWidth: 80,
        alignItems: 'center',
    },
    activateButtonText: {
        color: '#eee',
        fontWeight: '300',
        fontSize: 15,
    },
    balaoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    balaoInner: {
        alignItems: 'center',
    },
    balaoImg: {
        width: 200,
        height: 140,
        top: 20,
        left: 50,
    },
    balaoText: {
        position: 'absolute',
        top: 45,
        right: 22,
        color: '#eee',
        fontSize: 13,
        fontWeight: 'bold',
        transform: [{ rotate: '4.91deg' }],
        textAlign: 'justify',
    },
    raposaImg: {
        width: 280,
        height: 250,
    },
});

export const endTimeModal = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        backgroundColor: '#eee',
        borderRadius: 16,
        borderColor: '#000000',
        borderWidth: 3,
        padding: 24,
        width: 300,
        alignItems: 'center',
    },
    activateButton: {
        backgroundColor: '#233D4D',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 16,
        minWidth: 80,
        alignItems: 'center',
    },
    activateButtonText: {
        color: '#eee',
        fontWeight: '300',
        fontSize: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    modalText: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 25,
    },
    correctText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 15,
    },

});

export const SuccessAlert = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBox: {
        width: '80%',
        backgroundColor: '#eee',
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A3C40',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#444',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 22,
    },
    progressBarBackground: {
        height: 4,
        backgroundColor: '#d0e8dc',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 4,
        backgroundColor: '#1A3C40',
    },
})