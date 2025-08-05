import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { endTimeModal } from './styles';
import { useTranslation } from 'react-i18next';

const EndTimeModal: React.FC<{ visible: boolean; onNavigate: () => void; acertos: number }> = ({ visible, onNavigate, acertos }) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNavigate}
    >
      <View style={endTimeModal.overlay}>
        <View style={endTimeModal.modalContainer}>
          <Text style={endTimeModal.title}>{t('timeUpTitle')}</Text>
          <Text style={endTimeModal.modalText}>{t('correctUntilNow')}</Text>
          <Text style={endTimeModal.correctText}>{acertos}/10</Text>
          <Text style={endTimeModal.modalText}>{t('encouragement')}</Text>
          <TouchableOpacity style={endTimeModal.activateButton} onPress={onNavigate}>
            <Text style={endTimeModal.activateButtonText}>{t('backToMap')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EndTimeModal;