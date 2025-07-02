import { StyleSheet } from 'react-native';

export const footer = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
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
        color: '#fff',
        fontWeight: '300',
        fontSize: 15,
    },
    deactivateButton: {
        backgroundColor: '#fff',
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