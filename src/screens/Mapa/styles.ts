import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        alignItems: "center",
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000000',
        marginTop: 52,
        textAlign: 'center',
        width: '80%',
        alignSelf: 'center',
        maxWidth: '90%',
    },

    rowButtons: {
        width: '100%',
        alignItems: 'center',
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 48,
    },

    questionMark: {
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: "#619B8A",
        borderRadius: 10,
        padding: 2,
        zIndex: 10,
    },

    buttonPlaceholder: {
        backgroundColor: "#619B8A",
        borderRadius: 24,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 72,
        height: 72,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },

    buttonTitle: {
        color: "#333",
        fontWeight: "600",
        marginTop: 6,
        fontSize: 14,
        textAlign: "center",
        width: 80,
    },

    buttonSubtitle: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },

    dropdownButton: {
        borderWidth: 2,
        borderColor: "#619B8A",
        borderRadius: 24,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 72,
        height: 72,
        backgroundColor: "#fff",
    },

    tooltipContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    tooltipContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        maxWidth: 320,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    tooltipText: {
        fontSize: 16,
        color: "#333"
    },

    phaseMapContainer: {
        width: "100%",
        alignItems: "center",
        position: "relative",
        marginTop: 32,
    },

    phaseItem: {
        width: "100%",
        alignItems: "center",
        marginBottom: 30,
    },

    phaseCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        shadowOpacity: 0.9,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        position: "relative",
    },

    phaseNumber: {
        fontSize: 36,
        fontWeight: "bold",
    },

    iconBlocked: {
        position: "absolute",
        width: 28,
        height: 28,
        top: 12,
        right: 12,
        tintColor: "#bbb",
    },

    crownPlaceholder: {
        position: "absolute",
        top: -18,
        backgroundColor: "#FEC946",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#B8860B",
        shadowOpacity: 0.7,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },

    playText: {
        position: 'absolute',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },

    crownIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 6,
    },

    crownNumber: {
        fontWeight: "700",
        color: "#5A3E00",
        fontSize: 18,
    },

    subjectTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "600",
        textTransform: "capitalize",
    },

    lineContainer: {
        width: 6,
        alignItems: "center",
        marginTop: 10,
    },

    legendCrownIcon: {
        width: 42,
        height: 42,
        resizeMode: 'contain',
    },

    legendText: {
        fontSize: 14,
        color: '#000',
    },
});