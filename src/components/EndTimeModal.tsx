import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { endTimeModal } from './styles';

const EndTimeModal: React.FC<{ visible: boolean, onNavigate: () => void, acertos: number }> = ({ visible, onNavigate, acertos }) => {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onNavigate}
        >
            <View style={endTimeModal.overlay}>
                <View style={endTimeModal.modalContainer}>
                    <Text style={endTimeModal.title}>Seu Tempo acabou anter de finalizar as perguntas!</Text>
                    <Text style={endTimeModal.modalText}>até aqui você tinha acertado...</Text>
                    <Text style={endTimeModal.correctText}>{acertos}/10</Text>
                    <Text style={endTimeModal.modalText}>
                        Não tem problema, o que importa é que você tentou. Volte ao mapa, o Vest está te esperando...{'\n'}
                        Vai que dessa vez você consegue!
                    </Text>
                    <TouchableOpacity style={endTimeModal.activateButton} onPress={onNavigate}>
                        <Text style={endTimeModal.activateButtonText}>Voltar ao mapa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EndTimeModal;