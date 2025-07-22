import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { redModal } from './styles';

interface RedModalProps {
    visible: boolean;
    onContinue: () => void;
}

const RedModal: React.FC<RedModalProps> = ({
    visible,
    onContinue
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onContinue}
        >
            <View style={redModal.overlay}>
                <View style={redModal.modalContainer}>
                    <View style={redModal.balaoContainer}>
                        <View style={redModal.balaoInner}>
                            <Image
                                source={require('../../assets/img/balao_conversa_vermelho.png')}
                                style={redModal.balaoImg}
                                resizeMode="contain"
                            />
                            <Text style={redModal.balaoText}>
                                Ops! Essa não foi...{'\n'}Você perdeu uma{'\n'}vida, mas o Vest{'\n'}confia em você.
                            </Text>
                            <Image
                                source={require('../../assets/img/raposa_coracao.png')}
                                style={redModal.raposaImg}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={redModal.activateButton} onPress={onContinue}>
                        <Text style={redModal.activateButtonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default RedModal;