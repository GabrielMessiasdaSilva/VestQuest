import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackScreenProps } from '@react-navigation/stack';
import { onboardingStyles } from './styles';
import type { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const swiperRef = useRef<Swiper>(null);

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
    <View style={[onboardingStyles.slide, { backgroundColor }]}>
      <Image source={imageSource} style={onboardingStyles.slideImage} />
      <Text style={onboardingStyles.slideTitle}>{title}</Text>
      <Text style={onboardingStyles.slideDescription}>{description}</Text>
      {showFinishButton ? (
        <TouchableOpacity style={onboardingStyles.button} onPress={handleFinishOnboarding}>
          <Text style={onboardingStyles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={onboardingStyles.button} onPress={() => swiperRef.current?.scrollBy(1)}>
          <Text style={onboardingStyles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsPagination={true}
      dotStyle={onboardingStyles.dot}
      activeDotStyle={onboardingStyles.activeDot}
    >
      {renderSlide(
        '#FCCA46',
        require('../../../assets/img/raposa_mascote.png'),
        'Bem-vindo(a) ao VestQuest!',
        'Eu sou o Vest, sua raposa guia nessa jornada rumo à aprovação!'
      )}
      {renderSlide(
        '#A1C181',
        require('../../../assets/img/raposa_mascote.png'),
        'Como o VestQuest funciona?',
        'Responda quizzes e desbloqueie fases enquanto aprende de verdade!'
      )}
      {renderSlide(
        '#619B8A',
        require('../../../assets/img/raposa_mascote.png'),
        'Partiu trilhar o caminho da aprovação?',
        'Toque em Jogar e embarque comigo nesta jornada épica!',
        true
      )}
    </Swiper>
  );
};

export default OnboardingScreen;