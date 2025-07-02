import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import Footer from '../../components/Footer';
import TimeModal from '../../components/TimeModal';

type RootStackParamList = {
    Desafio: undefined;
};

export default function Mapa() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [selectedTime, setSelectedTime] = useState('none');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputTime, setInputTime] = useState('');

  const showCustomAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const handleActivateTime = () => {
    if (inputTime && Number(inputTime) >= 1 && Number(inputTime) <= 60) {
      setSelectedTime(inputTime);
      setModalVisible(false);
      showCustomAlert('⏰ Tempo ativado', `Você escolheu ${inputTime} minutos`);
    } else {
      showCustomAlert('⚠️ Atenção', 'Escolha um valor entre 1 e 60 minutos');
    }
  };

  const handleDeactivateTime = () => {
    setSelectedTime('none');
    setInputTime('');
    setModalVisible(false);
    showCustomAlert('⏹️ Tempo desativado', 'O tempo foi desativado com sucesso!');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Seu mapa de fases</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              style={styles.buttonPlaceholder}
              onPress={() => navigation.navigate('Desafio')}
            >
              <Text style={styles.buttonTitle}>Desafio Diário</Text>
              <Text style={styles.buttonSubtitle}>Acesse aqui</Text>
            </TouchableOpacity>
            <View style={styles.dropdownButton}>
              <TouchableOpacity
                style={styles.dropdownContent}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.dropdownText}>
                  {selectedTime !== 'none' ? `Tempo: ${selectedTime} min` : 'Ativar tempo'}
                </Text>
                <Image source={require('../../../assets/img/seta_baixo.png')} style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <TimeModal
        visible={modalVisible}
        inputTime={inputTime}
        setInputTime={setInputTime}
        onActivate={handleActivateTime}
        onDeactivate={handleDeactivateTime}
        onClose={() => setModalVisible(false)}
      />
      <Footer />
    </View>
  );
}