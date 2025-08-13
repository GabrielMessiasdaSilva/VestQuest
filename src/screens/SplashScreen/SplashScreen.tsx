import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';
import { splashStyles } from './styles';

type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        const userToken = await AsyncStorage.getItem('userToken');

        if (!hasSeenOnboarding) {
          navigation.replace('Onboarding');
        } else if (userToken) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      } catch (e) {
        // Se der erro, manda pro login para garantir
        navigation.replace('Login');
      }
    };

    checkStatus();
  }, [navigation]);

  return (
    <View style={splashStyles.container}>
      <Image source={require('../../../assets/img/raposa_mascote.png')} style={splashStyles.logo} />
      <Text style={splashStyles.text}>VestQuest</Text>
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
    </View>
  );
};

export default SplashScreen;
