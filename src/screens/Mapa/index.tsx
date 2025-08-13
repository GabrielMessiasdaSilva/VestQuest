import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Footer from '../../components/Footer';
import TimeModal from '../../components/TimeModal';
import type { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function Mapa() {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Mapa'>>();
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
      showCustomAlert(t('mapa.alertTempoAtivadoTitulo'), t('mapa.alertTempoAtivadoMensagem', { tempo: inputTime }));
    } else {
      showCustomAlert(t('mapa.alertAtençãoTitulo'), t('mapa.alertAtençãoMensagem'));
    }
  };

  // Função para desativar o tempo selecionado
  const handleDeactivateTime = () => {
    setSelectedTime('none');
    setInputTime('');
    setModalVisible(false);
    showCustomAlert(t('mapa.alertTempoDesativadoTitulo'), t('mapa.alertTempoDesativadoMensagem'));
  };

  const [fases, setFases] = useState([
    { numero: 4, status: 'bloqueada', cor: 'laranja', nome: 'ciencias_humanas' },
    { numero: 3, status: 'bloqueada', cor: 'verde', nome: 'ciencias_natureza' },
    { numero: 2, status: 'bloqueada', cor: 'azul', nome: 'linguagens' },
    { numero: 1, status: 'disponivel', cor: 'amarelo', nome: 'matematica' },
  ]);

  const imagensFases: { [cor: string]: any } = {
    amarelo: require('../../../assets/img/circulo_amarelo.png'),
    azul: require('../../../assets/img/circulo_azul.png'),
    verde: require('../../../assets/img/circulo_verde.png'),
    laranja: require('../../../assets/img/circulo_laranja.png'),
  };

  useFocusEffect(
    React.useCallback(() => {
      const carregarProgresso = async () => {
        try {
          const salvo = await AsyncStorage.getItem('fasesConcluidas');
          const fasesConcluidas: number[] = salvo ? JSON.parse(salvo) : [];

          setFases(prev =>
            prev.map(fase => {
              if (fasesConcluidas.includes(fase.numero)) {
                return { ...fase, status: 'concluida' };
              } else if (
                fasesConcluidas.includes(fase.numero - 1) ||
                fase.numero === 1
              ) {
                return { ...fase, status: 'disponivel' };
              } else {
                return { ...fase, status: 'bloqueada' };
              }
            })
          );
        } catch (error) {
          console.error('Erro ao carregar progresso:', error);
        }
      };

      carregarProgresso();
    }, [])
  );

  // useEffect(() => {
  //   AsyncStorage.removeItem('fasesConcluidas');
  // }, []);

  const iniciarFase = (faseNumero: number) => {
    navigation.navigate('Quiz', {
      tempoTotal: selectedTime !== 'none' ? Number(selectedTime) * 60 : 0,
      tempoAtivado: selectedTime !== 'none',
      faseAtual: faseNumero,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120, backgroundColor: '#eee' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('mapa.titulo')}</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              style={styles.buttonPlaceholder}
              onPress={() => navigation.navigate('Desafio')}
            >
              <Text style={styles.buttonTitle}>{t('mapa.desafioDiario')}</Text>
              <Text style={styles.buttonSubtitle}>{t('mapa.acessar')}</Text>
            </TouchableOpacity>
            <View style={styles.dropdownButton}>
              <TouchableOpacity
                style={styles.dropdownContent}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.dropdownText}>
                  {selectedTime !== 'none' ? t('mapa.tempoSelecionado', { tempo: selectedTime }) : t('mapa.ativarTempo')}
                </Text>
                <Image source={require('../../../assets/img/seta_baixo.png')} style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.phaseMapContainer, { position: 'relative', minHeight: 500 }]}>
            {fases.map((fase, index) => {
              return (
                <View key={fase.numero} style={[
                  styles.phaseItem,
                  index % 2 === 0 ? styles.phaseLeft : styles.phaseRight
                ]}
                >
                  {fase.status === 'disponivel' ? (
                    <TouchableOpacity
                      onPress={() => iniciarFase(fase.numero)}
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Image source={imagensFases[fase.cor]} style={styles.phaseCircle} />
                      <Text style={styles.playText}>{t('mapa.jogar')}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={imagensFases[fase.cor]} style={styles.phaseCircle} />
                      {fase.status === 'bloqueada' && (
                        <Image
                          source={require('../../../assets/img/cadeado.png')}
                          style={styles.iconCenter}
                        />
                      )}
                      {fase.status === 'concluida' && (
                        <Image
                          source={require('../../../assets/img/check_w.png')}
                          style={styles.iconCenter}
                        />
                      )}
                    </View>
                  )}

                  <Image
                    source={require('../../../assets/img/coroa.png')}
                    style={styles.crownIcon}
                  />
                  <Text style={styles.crownNumber}>{fase.numero}</Text>
                </View>
              );
            })}
            <View style={styles.legendContainer}>
              <Image source={require('../../../assets/img/coroa.png')} style={styles.legendCrownIcon} />
              <Text style={styles.legendText}>{t('mapa.legendaCoroa')}</Text>
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