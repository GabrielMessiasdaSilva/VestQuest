import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import Footer from '../../components/Footer';
import TimeModal from '../../components/TimeModal';

type RootStackParamList = {
  Desafio: undefined;
  Quiz: undefined;
};

// Componente principal da tela Home
export default function Mapa() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTime, setSelectedTime] = useState('none');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputTime, setInputTime] = useState('');

  const showCustomAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  // Função para ativar o tempo selecionado
  const handleActivateTime = () => {
    if (inputTime && Number(inputTime) >= 1 && Number(inputTime) <= 60) {
      setSelectedTime(inputTime);
      setModalVisible(false);
      showCustomAlert('⏰ Tempo ativado', `Você escolheu ${inputTime} minutos`);
    } else {
      showCustomAlert('⚠️ Atenção', 'Escolha um valor entre 1 e 60 minutos');
    }
  };

  // Função para desativar o tempo selecionado
  const handleDeactivateTime = () => {
    setSelectedTime('none');
    setInputTime('');
    setModalVisible(false);
    showCustomAlert('⏹️ Tempo desativado', 'O tempo foi desativado com sucesso!');
  };

  const fases = [
    { numero: 4, status: 'bloqueada' },
    { numero: 3, status: 'disponivel' },
    { numero: 2, status: 'concluida' },
    { numero: 1, status: 'concluida' },
  ];

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
          <View style={[styles.phaseMapContainer, { position: 'relative', minHeight: 500 }]}>
            {fases.map((fase, index) => (
              <View
                key={fase.numero}
                style={[
                  styles.phaseItem,
                  index % 2 === 0 ? styles.phaseLeft : styles.phaseRight
                ]}
              >
                <Image
                  source={
                    fase.status === 'bloqueada'
                      ? require('../../../assets/img/circulo_laranja.png')
                      : fase.status === 'concluida'
                        ? (index % 2 === 0
                          ? require('../../../assets/img/circulo_azul.png')
                          : require('../../../assets/img/circulo_amarelo.png'))
                        : require('../../../assets/img/circulo_verde.png')
                  }
                  style={styles.phaseCircle}
                />
                {fase.status === 'concluida' && (
                  <Image source={require('../../../assets/img/check_w.png')} style={styles.iconCenter} />
                )}
                {fase.status === 'bloqueada' && (
                  <Image source={require('../../../assets/img/cadeado.png')} style={styles.iconCenter} />
                )}
                {fase.status === 'disponivel' && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Quiz')}
                    style={[styles.playTextContainer]}
                  >
                    <Text style={styles.playText}>Jogar</Text>
                  </TouchableOpacity>
                )}
                <Image source={require('../../../assets/img/coroa.png')} style={styles.crownIcon} />
                <Text style={styles.crownNumber}>{fase.numero}</Text>

                {index === 1 && (
                  <Image
                    source={require('../../../assets/img/raposa_piscando.png')}
                    style={[
                      styles.foxMascot,
                      { position: 'absolute', left: -150, top: 10, transform: [{ rotate: '-7.91deg' }] }
                    ]}
                  />
                )}
                {index === 2 && (
                  <Image
                    source={require('../../../assets/img/raposa_confiante.png')}
                    style={[
                      styles.foxMascot,
                      { position: 'absolute', right: -150, top: 10, transform: [{ rotate: '7.91deg' }] }
                    ]}
                  />
                )}
              </View>
            ))}
            <View style={styles.legendContainer}>
              <Image source={require('../../../assets/img/coroa.png')} style={styles.legendCrownIcon} />
              <Text style={styles.legendText}>= Número da fase</Text>
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