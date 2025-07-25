import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import GreenModal from '../../components/GreenModal';
import RedModal from '../../components/RedModal';
import EndTimeModal from '../../components/EndTimeModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { perguntas } from '../../data/perguntasQuiz';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Quiz: { tempoAtivado: boolean; tempoTotal: number };
};

export default function Quiz() {
  const navigation = useNavigation<any>();
  const [perguntaAtual, setPerguntaAtual] = useState(1);
  const [vidas, setVidas] = useState(3);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
  const params = route?.params || {};
  const tempoAtivado = params?.tempoAtivado ?? false;
  const tempoTotal = params?.tempoTotal ?? 0;
  const pergunta = perguntas[perguntaAtual - 1];
  const respostaCorreta = pergunta?.correta;
  const [acertos, setAcertos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(tempoTotal);
  const [greenModalVisible, setGreenModalVisible] = useState(false);
  const [redModalVisible, setRedModalVisible] = useState(false);
  const [endTimeModalVisible, setEndTimeModalVisible] = useState(false);

  useEffect(() => {
    if (tempoAtivado && tempoRestante > 0) {
      const timer = setInterval(() => {
        setTempoRestante((prev: number) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [tempoAtivado, tempoRestante]);

  useEffect(() => {
    if (vidas === 0) {
      setRedModalVisible(false);
      navigation.navigate('Vida');
    }
  }, [vidas, navigation]);

  useEffect(() => {
    if (tempoAtivado && tempoRestante <= 0) {
      setEndTimeModalVisible(true);
    }
  }, [tempoRestante, tempoAtivado]);

  useEffect(() => {
    if (perguntaAtual > perguntas.length) {
      navigation.navigate('Conquista', {acertos});
    }
  }, [perguntaAtual, acertos]);

  function handleResposta(alternativa: string) {
    setRespostaSelecionada(alternativa);
    if (alternativa === respostaCorreta) {
      setGreenModalVisible(true);
      setAcertos(prev => prev + 1);
    } else {
      if (vidas > 1) {
        setRedModalVisible(true);
      }
      setVidas(prev => prev - 1);
    }
  }

  function proximaPergunta() {
    setGreenModalVisible(false);
    setRespostaSelecionada(null);
    setPerguntaAtual(perguntaAtual + 1);
  }

  function respostaErrada() {
    setRedModalVisible(false);
    setRespostaSelecionada(null);
    setPerguntaAtual(perguntaAtual + 1);
  }

  // Calcula minutos e segundos
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;


  function voltarAoMapa() {
    navigation.navigate('Mapa');
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Quiz de perguntas</Text>
          <View style={styles.statusBar}>
            <Text style={styles.questionCount}>{perguntaAtual}/10</Text>
            <View style={styles.heartsContainer}>
              {[...Array(3)].map((_, i) => (
                <MaterialCommunityIcons
                  key={i}
                  name={i < vidas ? 'heart' : 'heart-outline'}
                  size={32}
                  color={i < vidas ? '#F44336' : '#B5B5B5'}
                  style={styles.heartIcon}
                />
              ))}
            </View>
            <View style={styles.timerContainer}>
              {tempoAtivado ? (
                <>
                  <Image source={require('../../../assets/img/relogio.png')} style={styles.timerIcon} />
                  <View style={styles.timerTextContainer}>
                    <Text style={styles.timerLabel}>Faltam:</Text>
                    <Text style={styles.timerText}>{minutos}min{segundos}s</Text>
                  </View>
                </>
              ) : (
                <View style={{ width: 48 }} />
              )}
            </View>
          </View>
          <View style={styles.question}>
            <Text style={styles.phase}>Fase 3 - Ciências da Natureza</Text>
            {pergunta && (
              <View>
                <Text style={styles.questionText}>{pergunta.texto}</Text>
                {Object.entries(pergunta.alternativas).map(([letra, texto]) => (
                  <TouchableOpacity
                    key={letra}
                    onPress={() => handleResposta(letra)}
                    style={[
                      styles.optionButton,
                      respostaSelecionada === letra
                        ? letra === respostaCorreta
                          ? { backgroundColor: '#A1C181' }
                          : { backgroundColor: '#A92929', borderColor: '#000000' }
                        : null
                    ]}
                  >
                    <Text style={styles.optionText}>{letra}) {texto}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <GreenModal
        visible={greenModalVisible}
        onContinue={proximaPergunta}
      />
      <RedModal
        visible={redModalVisible}
        onContinue={respostaErrada}
      />
      <EndTimeModal
        visible={endTimeModalVisible}
        onNavigate={voltarAoMapa}
        acertos={acertos}
      />
    </View>
  );
}