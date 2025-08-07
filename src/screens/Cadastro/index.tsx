import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomAlert from '../../components/SuccessAlert';
import { styles } from './styles';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Cadastro() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const onConfirmAlert = () => {
    setAlertVisible(false);
    navigation.navigate("Login" as never);
  };

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();
  const schema = yup.object({
    username: yup.string().required(t("usernameRequired")),
    email: yup.string().email(t("invalidEmail")).required(t("emailRequired")),
    password: yup
      .string()
      .min(6, t("min6chars"))
      .required(t("passwordRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("passwordsDontMatch"))
      .required(t("confirmPasswordRequired")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Salva no Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: data.username,
        email: data.email,
      });

      showAlert(t("success"), t("accountCreated"));
      reset();
    } catch (error: any) {
      showAlert(t("error"), t("accountAlreadyInUse"));
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Inicial' as never)}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
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

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <Ionicons
              name={termsAccepted ? 'checkbox' : 'square-outline'}
              size={22}
              color="#333"
            />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            {t('iAgreeToThe')}{' '}
            <Text
              style={styles.linkTextTerms}
              onPress={() => navigation.navigate('Termos' as never)}
            >
              {t('termsOfUse')}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, !termsAccepted && { opacity: 0.5 }]}
          onPress={() => {
            if (!termsAccepted) {
              Alert.alert(t('termsRequiredTitle'), t('termsRequiredMessage'));
              return;
            }
            handleSubmit(onSubmit)();
          }}
          disabled={!termsAccepted}
        >
          <Text style={styles.loginButtonText}>{t('register')}</Text>
        </TouchableOpacity>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
