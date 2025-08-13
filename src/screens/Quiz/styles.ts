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
        fontWeight: '600',
        color: '#000000',
        marginTop: 52,
        textAlign: 'center',
        width: '80%',
        alignSelf: 'center',
        maxWidth: '90%',
    },

    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 12,
        alignSelf: 'center',
    },

    questionCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#233D4D',
        flex: 1,
        textAlign: 'right',
    },

    heartsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    heartIcon: {
        marginHorizontal: 3,
        resizeMode: 'contain',
    },

    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    timerIcon: {
        width: 24,
        height: 24,
        marginRight: 4,
        resizeMode: 'contain',
    },

    timerTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 80,
    },
    timerLabel: {
        fontSize: 12,
        color: '#233D4D',
        marginBottom: 2,
    },
    timerText: {
        fontSize: 14,
        color: '#233D4D',
    },

    question: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },

    phase: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 12,
    },

    questionText: {
        fontSize: 14,
        color: '#233D4D',
        textAlign: 'justify',
        paddingHorizontal: 16,
        marginBottom: 18,
    },

    optionsContainer: {
        width: '100%',
        paddingHorizontal: 16,
    },

    optionButton: {
        backgroundColor: '#eee',
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#A1C181',
        padding: 8,
        marginBottom: 18,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    optionText: {
        fontSize: 12,
        color: '#000000',
        textAlign: 'center',
    },


});