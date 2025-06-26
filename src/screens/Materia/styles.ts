import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        width: '100%',
        paddingTop: 72,
    },
    navbar: {
        width: '100%',
        backgroundColor: '#FCCA46',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        marginTop: 52,
        textAlign: 'center',
        width: '80%',
        alignSelf: 'center',
        maxWidth: '90%',
    },
    iconPlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
        maxWidth: 24,
        maxHeight: 24,
    },
    assuntos: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 16,
        color: '#333',
        maxWidth: '90%',
        alignSelf: 'center',
    },
});