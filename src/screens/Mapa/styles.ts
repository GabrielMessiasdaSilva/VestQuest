import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eee',
        width: '100%',
        paddingTop: 22,
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
        gap: 12,
    },

    buttonPlaceholder: {
        backgroundColor: '#619B8A',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        minHeight: 44,
        minWidth: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },

    buttonTitle: {
        color: '#eee',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonSubtitle: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },

    dropdownButton: {
        borderWidth: 2,
        borderColor: '#619B8A',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        minHeight: 44,
        minWidth: 100,
        alignItems: 'center',
        backgroundColor: '#eee',
        marginHorizontal: 8,
    },

    dropdownContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },

    dropdownText: {
        fontSize: 16,
        marginRight: 8,
        color: '#000',
    },

    dropdownIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },

    picker: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#619B8A',
        opacity: 0,
        width: '100%',
        height: '100%',
    },

    phaseMapContainer: {
        marginTop: 12,
        paddingHorizontal: 30,
        gap: 16,
        width: '100%',
    },

    phaseItem: {
        marginBottom: 16,
        position: 'relative',
        alignItems: 'center',
    },

    phaseLeft: {
        alignSelf: 'flex-start',
        marginLeft: 50,
    },

    phaseRight: {
        alignSelf: 'flex-end',
        marginRight: 50,
    },

    phaseCircle: {
        width: 110,
        height: 100,
        resizeMode: 'contain',
    },

    iconCenter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -96 }, { translateY: -16 }],
        width: 32,
        height: 32,
        resizeMode: 'contain',
        zIndex: 2,
    },

    playTextContainer: {
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },

    playText: {
        position: 'absolute',
        color: '#000000',
        fontWeight: 'semibold',
        fontSize: 16,
        textAlign: 'center',
    },

    crownIcon: {
        position: 'absolute',
        bottom: 10,
        right: -10,
        width: 52,
        height: 32,
        resizeMode: 'contain',
    },

    crownNumber: {
        position: 'absolute',
        bottom: 15,
        right: 11,
        color: '#000',
    },

    foxMascot: {
        width: 140,
        height: 90,
        resizeMode: 'contain',
        marginVertical: 8
    },

    legendContainer: {
        borderWidth: 2,
        borderColor: '#FEC946',
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 10
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