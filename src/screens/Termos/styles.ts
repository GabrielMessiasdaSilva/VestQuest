import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        width: '100%',
        paddingTop: 72,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 16,
        color: '#333',
        maxWidth: '90%',
        alignSelf: 'center',
    },
    lastUpdate: {
        fontSize: 14,
        marginBottom: 16,
        color: "#666",
        alignSelf: 'center'
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22,
        color: "#444",
        marginBottom: 14,
        paddingHorizontal: 12,
        textAlign: 'justify'
    },
    section: {
        marginBottom: 16,
        paddingHorizontal: 16
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
        marginBottom: 4,
    },
    backButton: { marginTop: 16, marginBottom: 16, flexDirection: 'row', borderRadius: 24, backgroundColor: '#1C344D', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, }, 
    return: {fontSize: 14, fontWeight: 'bold', color:'#fff'}
});