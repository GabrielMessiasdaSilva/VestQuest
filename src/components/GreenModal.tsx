import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { greenModal } from './styles';
import { useTranslation } from 'react-i18next';

interface GreenModalProps {
    visible: boolean;
    onContinue: () => void;
}

const GreenModal: React.FC<GreenModalProps> = ({ visible, onContinue }) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onContinue}
        >
            <View style={greenModal.overlay}>
                <View style={greenModal.modalContainer}>
                    <View style={greenModal.balaoContainer}>
                        <View style={greenModal.balaoInner}>
                            <Image
                                source={require('../../assets/img/balao_conversa_verde.png')}
                                style={greenModal.balaoImg}
                                resizeMode="contain"
                            />
                            <Text style={greenModal.balaoText}>
                                {t('correctMessage')}
                            </Text>
                            <Image
                                source={require('../../assets/img/raposa_estrela.png')}
                                style={greenModal.raposaImg}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={greenModal.activateButton} onPress={onContinue}>
                        <Text style={greenModal.activateButtonText}>{t('continue')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default GreenModal;