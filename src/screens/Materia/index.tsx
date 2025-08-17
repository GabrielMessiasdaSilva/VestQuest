import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Home: undefined;
  Materia: { chave: string, nome: string; cor: string; assuntos: string[] };
};

export default function Materia() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Materia'>>();
  const { nome, cor, assuntos } = route.params;
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean[]>(Array(assuntos.length).fill(false));
  const [quizAnswer, setQuizAnswer] = useState<(string | null)[]>(Array(assuntos.length).fill(null));
  const [answeredOnce, setAnsweredOnce] = useState<boolean[]>(Array(assuntos.length).fill(false));
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>(Array(assuntos.length).fill(false));

  const handleToggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const toggleComplete = (index: number) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };

  function normalizarNomeParaChave(nome: string) {
    return nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const miniQuizzes = assuntos.map(a => {
    const key = normalizarNomeParaChave(a);
    const question = t(`quizzes.${key}.question`);
    const options = t(`quizzes.${key}.options`, { returnObjects: true }) as string[] | undefined;
    const correct = t(`quizzes.${key}.correct`);

    return {
      question: question || '',
      options: Array.isArray(options) ? options : [],
      correct: Number(correct) || 0,
    };
  });
  const renderAssunto = (texto: string, idx: number) => {
    const regex = /(\(.*?\))/g;
    const partes = texto.split(regex);
    const isOpen = expanded === idx;
    const quiz = miniQuizzes[idx] || { question: '', options: [], correct: -1 };


    return (
      <View key={idx} style={{ marginBottom: 8 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}
          onPress={() => handleToggleExpand(idx)}
        >
          <Text style={[styles.assuntoBold, { color: completed[idx] ? cor : '#333' }]}>
            {partes.map((parte, i) => {
              const isParenteses = parte.startsWith('(') && parte.endsWith(')');
              return (
                <Text key={i} style={isParenteses ? styles.assuntoParenteses : styles.assuntoBold}>
                  {parte}
                </Text>
              );
            })}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={{ padding: 10, backgroundColor: '#f4f4f4', borderRadius: 8 }}>
            <Text style={{ marginBottom: 6 }}>📚 {t(`resumos.${normalizarNomeParaChave(texto)}`)}</Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>🎯 {quiz.question}</Text>

            {quiz.options.map((opt, i) => {
              const isSelected = quizAnswer[idx] === opt;
              const isCorrect = i === Number(quiz.correct);
              let bgColor = '#ddd';
              if (isSelected) {
                bgColor = isCorrect ? '#4CAF50' : '#E53935';
              }
              return (
                <TouchableOpacity
                  key={i}
                  disabled={answeredOnce[idx]} // impede mais cliques
                  style={{ backgroundColor: bgColor, padding: 8, borderRadius: 5, marginBottom: 4 }}
                  onPress={() => {
                    setQuizAnswer(prev => {
                      const newAns = [...prev];
                      newAns[idx] = opt;
                      return newAns;
                    });
                    setAnsweredOnce(prev => {
                      const updated = [...prev];
                      updated[idx] = true;
                      return updated;
                    });
                    if (isCorrect) {
                      setCorrectAnswers(prev => {
                        const updated = [...prev];
                        updated[idx] = true;
                        return updated;
                      });
                    }
                  }}
                >
                  <Text style={{ color: '#fff' }}>{opt}</Text>
                </TouchableOpacity>
              );
            })}

            {answeredOnce[idx] && !correctAnswers[idx] && (
              <TouchableOpacity
                onPress={() => {
                  setQuizAnswer(prev => {
                    const newAns = [...prev];
                    newAns[idx] = null;
                    return newAns;
                  });
                  setAnsweredOnce(prev => {
                    const updated = [...prev];
                    updated[idx] = false;
                    return updated;
                  });
                }}
                style={{ backgroundColor: '#2196F3', padding: 8, borderRadius: 5, marginTop: 6 }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>🔄 Tentar novamente</Text>
              </TouchableOpacity>
            )}

            {correctAnswers[idx] && (
              <Text style={{ marginTop: 6, fontWeight: 'bold', color: '#4CAF50' }}>
                🎉 Parabéns! Você acertou!
              </Text>
            )}

            <TouchableOpacity
              onPress={() => toggleComplete(idx)}
              style={{
                backgroundColor: completed[idx] ? '#4CAF50' : '#aaa',
                padding: 8,
                borderRadius: 5,
                marginTop: 6
              }}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                {completed[idx] ? '✔ Marcado como estudado' : 'Marcar como estudado'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  function getBalaoImage(cor: string) {
    switch (cor) {
      case '#FCCA46':
        return require('../../../assets/img/balao_conversa_amarelo.png');
      case '#233D4D':
        return require('../../../assets/img/balao_conversa_azul.png');
      case '#A1C181':
        return require('../../../assets/img/balao_conversa_verde.png');
      case '#FE7F2D':
        return require('../../../assets/img/balao_conversa_laranja.png');
      default:
        return require('../../../assets/img/lupa.png');
    }
  }

  function getContrastingTextColor(bgColor: string) {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#222' : '#f7f8fa';
  }
  const textColor = getContrastingTextColor(cor);



  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.navbar, { backgroundColor: cor }]}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chevron-left"
            color={textColor}
            style={styles.iconPlaceholder}
            size={24}
            onPress={() => navigation.navigate('Home')}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>
          {t(`subjects.${normalizarNomeParaChave(nome)}`)}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#f7f8fa' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ImageBackground
            source={getBalaoImage(cor)}
            style={styles.speechBubble}
            resizeMode="contain"
          >
            <Text style={[styles.speechText, { color: textColor }]}>{t('materia.segredo')}</Text>
          </ImageBackground>

          <Image
            source={require("../../../assets/img/raposa_confiante.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.assuntosContainer}>
            <Text style={styles.assuntos}>
              {t('materia.assuntosMaisFrequentes', { nome: t(`materias.${route.params.nome}`) })}
            </Text>
            <View style={[styles.assuntosBox, { borderColor: cor }]}>
              {assuntos && assuntos.length > 0 ? (
                assuntos.map((chave, idx) => renderAssunto(t(chave), idx))
              ) : (
                <Text style={{ color: '#B5B5B5', fontStyle: 'italic' }}>{t('materia.nenhumAssunto')}</Text>
              )}
            </View>
          </View>
          <Text style={styles.assuntoParenteses}>{t('materia.segredoe')}</Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}