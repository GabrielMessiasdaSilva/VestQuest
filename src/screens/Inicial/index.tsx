import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function Inicial() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/img/raposa_mascote.png')} style={styles.logo} />
      <Text style={styles.title}>Antes de começar…</Text>
      <Text style={styles.subtitle}>
        Crie sua conta ou faça login para salvar seu progresso e continuar sua jornada com o Vest!
      </Text>
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
          <Text style={[styles.buttonText, styles.registerText]}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
