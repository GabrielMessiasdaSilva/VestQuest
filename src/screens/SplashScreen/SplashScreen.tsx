import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';
import { splashStyles } from './styles';

type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 7000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashStyles.container}>
      <Image source={require('../../../assets/img/raposa_mascote.png')} style={splashStyles.logo} />
      <Text style={splashStyles.text}>VestQuest</Text>
    </View>
  );
};

export default SplashScreen;