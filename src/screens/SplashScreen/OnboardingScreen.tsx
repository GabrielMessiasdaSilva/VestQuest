import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackScreenProps } from '@react-navigation/stack';
import { onboardingStyles } from './styles';
import type { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';

type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const swiperRef = useRef<Swiper>(null);
  const { t } = useTranslation();

  const handleFinishOnboarding = () => {
    navigation.replace('Inicial');
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
      <TouchableOpacity
        style={onboardingStyles.button}
        onPress={showFinishButton ? handleFinishOnboarding : () => swiperRef.current?.scrollBy(1)}
      >
        <Text style={onboardingStyles.buttonText}>
          {showFinishButton ? t('play') : t('continue')}
        </Text>
      </TouchableOpacity>
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
        t('slide1.title'),
        t('slide1.description')
      )}
      {renderSlide(
        '#A1C181',
        require('../../../assets/img/raposa_mascote.png'),
        t('slide2.title'),
        t('slide2.description')
      )}
      {renderSlide(
        '#619B8A',
        require('../../../assets/img/raposa_mascote.png'),
        t('slide3.title'),
        t('slide3.description'),
        true
      )}
    </Swiper>
  );
};

export default OnboardingScreen;