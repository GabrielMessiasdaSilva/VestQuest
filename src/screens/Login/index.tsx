// login.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

type FormData = {
  email: string;
  password: string;
};

const MAX_ATTEMPTS = 7; //maximo de tentativas para realizar o login 
const BLOCK_TIME_MS = 15 * 60 * 1000; //calculo de bloqueio: 15 minutos

export default function Login() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);

  useEffect(() => {
    const loadAttempts = async () => {
      const attemptsSaved = await AsyncStorage.getItem("loginAttempts");
      const blockedSaved = await AsyncStorage.getItem("loginBlockedUntil");
      if (attemptsSaved) setAttempts(Number(attemptsSaved));
      if (blockedSaved) setBlockedUntil(Number(blockedSaved));
    };
    loadAttempts();
  }, []);

  const saveAttempts = async (newAttempts: number, blockTime?: number) => {
    await AsyncStorage.setItem("loginAttempts", newAttempts.toString());
    setAttempts(newAttempts);
    if (blockTime) {
      await AsyncStorage.setItem("loginBlockedUntil", blockTime.toString());
      setBlockedUntil(blockTime);
    } else {
      await AsyncStorage.removeItem("loginBlockedUntil");
      setBlockedUntil(null);
    }
  };

  const schema = yup.object({
    email: yup.string().email(t('emailInvalido')).required(t('emailObrigatorio')),
    password: yup.string().required(t('senhaObrigatoria')),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (blockedUntil && Date.now() < blockedUntil) {
      const minutesLeft = Math.ceil((blockedUntil - Date.now()) / 60000);
      showMessage({
        message: "Bloqueado",
        description: `Muitas tentativas. Tente novamente em ${minutesLeft} min.`,
        type: "danger",
        icon: "danger"
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        showMessage({
          message: t('emailNaoVerificadoTitulo'),
          description: t('emailNaoVerificadoMensagem'),
          type: "warning",
          icon: "warning"
        });
        try {
          await sendEmailVerification(user);
          showMessage({
            message: t('sucesso'),
            description: t('emailReenviado'),
            type: "success",
            icon: "success"
          });
        } catch {
          showMessage({
            message: t('erro'),
            description: t('erroReenviarEmail'),
            type: "danger",
            icon: "danger"
          });
        }
        return;
      }

      await saveAttempts(0);
      await AsyncStorage.setItem('userToken', user.uid);
      navigation.navigate('Home' as never);

    } catch (error: any) {
      let message = t('login.erroGenerico');

      if (error.code === 'auth/user-not-found') {
        message = t('login.usuarioNaoEncontrado');
      } else if (error.code === 'auth/wrong-password') {
        message = t('login.senhaIncorreta');
      } else if (error.code === 'auth/invalid-email') {
        message = t('emailInvalido');
      }

      const newAttempts = attempts + 1;
      if (newAttempts >= MAX_ATTEMPTS) {
        const blockTime = Date.now() + BLOCK_TIME_MS;
        await saveAttempts(newAttempts, blockTime);
        showMessage({
          message: "Bloqueado",
          description: "Muitas tentativas inválidas. Tente novamente mais tarde.",
          type: "danger",
          icon: "danger"
        });
      } else {
        await saveAttempts(newAttempts);
        showMessage({
          message: t('login.erro'),
          description: message,
          type: "danger",
          icon: "danger"
        });
      }
    }
  };

  const handleForgotPassword = () => {
    if (!emailValue) {
      showMessage({
        message: t('atencao'),
        description: t('digiteEmailParaRedefinir'),
        type: "warning",
        icon: "warning"
      });
      return;
    }

    sendPasswordResetEmail(auth, emailValue)
      .then(() => {
        showMessage({
          message: t('sucesso'),
          description: t('emailRedefinicaoEnviado'),
          type: "success",
          icon: "success"
        });
      })
      .catch((error: any) => {
        let message = t('erroGenerico');
        if (error.code === 'auth/user-not-found') {
          message = t('login.usuarioNaoEncontrado');
        } else if (error.code === 'auth/invalid-email') {
          message = t('emailInvalido');
        }
        showMessage({
          message: t('erro'),
          description: message,
          type: "danger",
          icon: "danger"
        });
      });
  };

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
            onChangeText={(text) => {
              setEmailValue(text);
              onChange(text);
            }}
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

      <TouchableOpacity onPress={handleForgotPassword} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Esqueci minha senha</Text>
      </TouchableOpacity>

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
