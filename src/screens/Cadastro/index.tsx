// src/screens/Cadastro.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; // ADICIONE no topo do arquivo
import { db } from '../../services/firebaseConfig'; // ADICIONE também
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomAlert from '../../components/SuccessAlert'; // ajuste o caminho conforme o local do arquivo


type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};



export default function Cadastro() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
const onConfirmAlert = () => {
  setAlertVisible(false);
  navigation.navigate('Login' as never);
};
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();
  const schema = yup.object({
    username: yup.string().required(t('usernameRequired')),
    email: yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    password: yup.string().min(6, t('min6chars')).required(t('passwordRequired')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('passwordsDontMatch'))
      .required(t('confirmPasswordRequired')),
  });
  const {
    control, handleSubmit, formState: { errors }, reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Salva no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: data.username,
        email: data.email,
        // Não salve a senha! Só o necessário, caralho!
      });

       showAlert(t('success'), t('accountCreated'));
      reset();

    } catch (error: any) {
      showAlert('Erro', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('register')}</Text>
      <Text style={styles.subtitle}>{t('createAccount')}</Text>

      <Text style={styles.label}>{t('username')}</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={t('usernamePlaceholder')}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={t('emailPlaceholder')}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.passwordInput}
              placeholder="***************"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#333" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Text style={styles.label}>{t('confirmPassword')}</Text>
      <View style={styles.passwordContainer}>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.passwordInput}
              placeholder="***************"
              secureTextEntry={!showConfirm}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={22} color="#333" />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginButtonText}>{t('register')}</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>{t('orRegisterWith')}</Text>
        <View style={styles.line} />
      </View>


      <Text style={styles.footerText}>
        {t('alreadyHaveAccount')}{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Login' as never)}
        >
          {t('loginHere')}
        </Text>
      </Text>

  <CustomAlert
  visible={alertVisible}
  title={alertTitle}
  message={alertMessage}
  onConfirm={onConfirmAlert}
  duration={3500}
/>

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
  error: { color: 'red', marginBottom: 8 },
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
});

