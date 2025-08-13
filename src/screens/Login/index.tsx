//login.tsx

import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, BackHandler
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const schema = yup.object({
    email: yup.string().email(t('login.emailInvalido')).required(t('login.emailObrigatorio')),
    password: yup.string().required(t('login.senhaObrigatoria')),
  });
  const {
    control, handleSubmit, formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await AsyncStorage.setItem('userToken', user.uid);  // salva o id do usuário

      navigation.navigate('Home' as never);


    } catch (error: any) {
      let message = t('login.erroGenerico');
      if (error.code === 'auth/user-not-found') message = t('login.usuarioNaoEncontrado');
      else if (error.code === 'auth/wrong-password') message = t('login.senhaIncorreta');
      Alert.alert(t('login.erro'), message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Inicial' as never);
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [navigation])
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Inicial' as never)}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>{t('login.subtitulo')}</Text>

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={t('login.placeholderEmail')}
            style={[styles.input, { color: '#000' }]}
            keyboardType="email-address"
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>{t('login.senha')}</Text>
      <View style={styles.passwordContainer}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="***************"
              style={[styles.passwordInput, { color: '#000' }]}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
          )}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#333" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.loginButtonText}>{t('login.entrar')}</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        {t('login.naoTemConta')}{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Cadastro' as never)}>
          {t('login.cadastrarAqui')}
        </Text>
      </Text>
    </View>
  );
}