import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#f7f8fa' },
    backButton: { marginTop: 16, marginBottom: 16 },
    title: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
    subtitle: { textAlign: 'center', marginBottom: 32, color: '#444' },
    label: { fontSize: 14, marginBottom: 4, color: '#333' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    passwordInput: { flex: 1, fontSize: 16, color: '#000' },
    loginButton: {
        backgroundColor: '#1A3C40',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    forgotPasswordContainer: {
        marginTop: 1,
        marginBottom: 30,

    },

        forgotPasswordText1: {
        color: '#333', 
        fontSize: 14,
        left:10,

    },
    forgotPasswordText: {
        color: '#1A3C40', // azul estilo link
        fontWeight: '500',
        fontSize: 14,
        left:10,
    },

    loginButtonText: { color: '#f7f8fa', fontWeight: '600', fontSize: 16 },
    footerText: { textAlign: 'center', color: '#333' },
    linkText: { color: '#1A3C40', fontWeight: '600' },
    error: { color: 'red', marginBottom: 8 },
});