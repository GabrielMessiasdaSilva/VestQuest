import React, { useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { timeModal } from './styles';
import { useTranslation } from 'react-i18next';

interface TimeModalProps {
    visible: boolean;
    inputTime: string;
    setInputTime: (value: string) => void;
    onActivate: () => void;
    onDeactivate: () => void;
    onClose: () => void;
}

const TimeModal: React.FC<TimeModalProps> = ({
    visible,
    inputTime,
    setInputTime,
    onActivate,
    onDeactivate,
    onClose,
}) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (visible) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

            return () => backHandler.remove();
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={timeModal.overlay}>
                <View style={timeModal.modalContainer}>
                    <Text style={timeModal.title}>{t('chooseAmount')}</Text>
                    <TextInput
                        style={timeModal.input}
                        keyboardType="numeric"
                        value={inputTime}
                        onChangeText={text => {
                            const num = text.replace(/[^0-9]/g, '');
                            if (num === '' || (Number(num) >= 1 && Number(num) <= 60)) setInputTime(num);
                        }}
                        maxLength={2}
                        placeholder={t('placeholderMinutes')}
                    />
                    <Text style={timeModal.label}>{t('minutes')}</Text>
                    <View style={timeModal.buttonRow}>
                        <TouchableOpacity
                            style={timeModal.activateButton}
                            onPress={onActivate}
                        >
                            <Text style={timeModal.activateButtonText}>{t('activate')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={timeModal.deactivateButton}
                            onPress={onDeactivate}
                        >
                            <Text style={timeModal.deactivateButtonText}>{t('deactivate')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TimeModal;