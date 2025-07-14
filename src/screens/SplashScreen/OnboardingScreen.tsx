// src/screens/OnboardingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina os tipos para as rotas da sua navegação
type RootStackParamList = {
  Onboarding: undefined;
  Inicial: undefined; // Sua tela de login/cadastro
};

type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {

const handleFinishOnboarding = () => {
  navigation.replace('Inicial'); // NÃO usa AsyncStorage agora
};

  const renderSlide = (
    backgroundColor: string,
    imageSource: any, 
    title: string,
    description: string,
    showFinishButton: boolean = false
  ) => (
    <View style={[styles.slide, { backgroundColor }]}>
      <Image source={imageSource} style={styles.slideImage} />
      <Text style={styles.slideTitle}>{title}</Text>
      <Text style={styles.slideDescription}>{description}</Text>
      {showFinishButton ? (
        <TouchableOpacity style={styles.button} onPress={handleFinishOnboarding}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => {  }}>
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      {renderSlide(
        '#FCCA46', // Amarelo
        require('../../../assets/img/raposa_mascote.png'), 
        'Bem-vindo(a) ao VestQuest!',
        'Eu sou o Vest, sua raposa guia nessa jornada rumo à aprovação!'
      )}
      {renderSlide(
        '#A1C181', // Verde
        require('../../../assets/img/raposa_mascote.png'),
        'Como o VestQuest funciona?',
        'Responda quizzes e desbloqueie fases enquanto aprende de verdade!'
      )}
      {renderSlide(
        '#619B8A', 
        require('../../../assets/img/raposa_mascote.png'),
        'Partiu trilhar o caminho da aprovação?',
        'Toque em "Começar" para embarcar nesta jornada épica!',
        true
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  slideDescription: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#233D4D',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 10,
    marginBottom: 10,
  },
  activeDot: {
    backgroundColor: '#233D4D',
    width: 8,
    height: 8,
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 30,
  },
});

export default OnboardingScreen;