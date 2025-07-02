import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { timeModal } from './styles';

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
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={timeModal.overlay}>
                <View style={timeModal.modalContainer}>
                    <Text style={timeModal.title}>Escolher quantidade</Text>
                    <TextInput
                        style={timeModal.input}
                        keyboardType="numeric"
                        value={inputTime}
                        onChangeText={text => {
                            const num = text.replace(/[^0-9]/g, '');
                            if (num === '' || (Number(num) >= 1 && Number(num) <= 60)) setInputTime(num);
                        }}
                        maxLength={2}
                        placeholder="0 - 60"
                    />
                    <Text style={timeModal.label}>Minutos</Text>
                    <View style={timeModal.buttonRow}>
                        <TouchableOpacity
                            style={timeModal.activateButton}
                            onPress={onActivate}
                        >
                            <Text style={timeModal.activateButtonText}>Ativar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={timeModal.deactivateButton}
                            onPress={onDeactivate}
                        >
                            <Text style={timeModal.deactivateButtonText}>Desativar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TimeModal;
