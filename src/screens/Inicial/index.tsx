import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

export default function Inicial() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/img/circulo_azul.png')} style={styles.circleBg} />
        <Image source={require('../../../assets/img/raposa_mascote.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>{t('startTitle')}</Text>
      <Text style={styles.subtitle}>{t('startSubtitle')}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.loginText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={[styles.buttonText, styles.registerText]}>{t('register')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
