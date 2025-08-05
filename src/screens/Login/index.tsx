// src/screens/Login.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

import { useTranslation } from 'react-i18next';

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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      //navigation.navigate('Main', { screen: 'Home' });
      navigation.navigate('Home' as never); // redireciona para a tela Home


    } catch (error: any) {
      console.error(error);
      let message = t('login.erroGenerico');
      if (error.code === 'auth/user-not-found') message = t('login.usuarioNaoEncontrado');
      else if (error.code === 'auth/wrong-password') message = t('login.senhaIncorreta');
      Alert.alert(t('login.erro'), message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
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
            style={styles.input}
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
              style={styles.passwordInput}
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

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>{t('login.ouEntreCom')}</Text>
        <View style={styles.line} />
      </View>



      <Text style={styles.footerText}>
        {t('login.naoTemConta')}{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Cadastro' as never)}>
          {t('login.cadastrarAqui')}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  backButton: { marginTop: 16, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  subtitle: { textAlign: 'center', marginBottom: 32, color: '#444' },
  label: { fontSize: 14, marginBottom: 4, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  passwordInput: { flex: 1, fontSize: 16 },
  loginButton: {
    backgroundColor: '#1A3C40',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: { flex: 1, height: 1, backgroundColor: '#ccc' },
  orText: { marginHorizontal: 8, color: '#666' },
  googleButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  googleButtonText: { fontWeight: '500', fontSize: 15 },
  footerText: { textAlign: 'center', color: '#333' },
  linkText: { color: '#1A3C40', fontWeight: '600' },
  error: { color: 'red', marginBottom: 8 },
});
