import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Home: undefined;
  Materia: { nome: string; cor: string; assuntos: string[] };
};

export default function Materia() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Materia'>>();
  const { nome, cor, assuntos } = route.params;
  const { t } = useTranslation();

  // Função para renderizar texto com parênteses em cor mais fraca
  const renderAssunto = (texto: string, idxAssunto: number) => {
    const regex = /(\(.*?\))/g;
    const partes = texto.split(regex);

    return (
      <View key={idxAssunto} style={{ marginBottom: 8 }}>
        <Text style={styles.assuntoText}>
          {partes.map((parte, idx) => {
            const isParenteses = parte.startsWith('(') && parte.endsWith(')');
            return (
              <Text
                key={idx}
                style={isParenteses ? styles.assuntoParenteses : styles.assuntoBold}
              >
                {parte}
              </Text>
            );
          })}
        </Text>
      </View>
    );
  };

  // Função utilitária para obter a imagem do balão de conversa com base na cor
  function getBalaoImage(cor: string) {
    switch (cor) {
      case '#FCCA46':
        return require('../../../assets/img/balao_conversa_amarelo.png');
      case '#233D4D':
        return require('../../../assets/img/balao_conversa_azul.png');
      case '#A1C181':
        return require('../../../assets/img/balao_conversa_verde.png');
      case '#FE7F2D':
        return require('../../../assets/img/balao_conversa_laranja.png');
      default:
        return require('../../../assets/img/lupa.png');
    }
  }

  // Função utilitária para escolher cor de texto legível
  function getContrastingTextColor(bgColor: string) {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#222' : '#f7f8fa';
  }
  const textColor = getContrastingTextColor(cor);

  function normalizarNomeParaChave(nome: string) {
    return nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.navbar, { backgroundColor: cor }]}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chevron-left"
            color={textColor}
            style={styles.iconPlaceholder}
            size={24}
            onPress={() => navigation.navigate('Home')}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>
          {t(`subjects.${normalizarNomeParaChave(nome)}`)}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#f7f8fa' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.balaoContainer}>
            <View style={styles.balaoInner}>
              <Image
                source={getBalaoImage(cor)}
                style={styles.balaoImg}
                resizeMode="contain"
              />
              <Text style={[styles.balaoText, { color: textColor }]}>
                {t('materia.segredo')}
              </Text>
              <Image
                source={require('../../../assets/img/raposa_confiante.png')}
                style={styles.raposaImg}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.assuntosContainer}>
            <Text style={styles.assuntos}>
              {t('materia.assuntosMaisFrequentes', { nome })}
            </Text>
            <View style={[styles.assuntosBox, { borderColor: cor }]}>
              {assuntos && assuntos.length > 0 ? (
                assuntos.map((chave, idx) => renderAssunto(t(chave), idx))
              ) : (
                <Text style={{ color: '#B5B5B5', fontStyle: 'italic' }}>{t('materia.nenhumAssunto')}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
