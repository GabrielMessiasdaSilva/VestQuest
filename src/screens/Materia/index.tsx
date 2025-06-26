import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';

export default function Materia() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.navbar}>
            <Image source={require('../../../assets/img/seta_esquerda.png')} style={styles.iconPlaceholder}></Image>
            <Text style={styles.title}>Matemática</Text>
          </View>
          <Image source={require('../../../assets/img/balão_conversa.png')}></Image>
          <Text>Vou te contar um segredo...</Text>
          <Image source={require('../../../assets/img/raposa_confiante.png')}></Image>
          <Text style={styles.assuntos}>Assuntos de Matemática que mais caem no vestibular</Text>
          <View>
            <Text>Geometria (plana e espacial)</Text>
            <Text>Álgebra (funções, equações, sistemas)</Text>
            <Text>Grandezas e medidas (razões, proporções, porcentagens)</Text>
            <Text>Estatística e Probabilidade</Text>
            <Text>Análise Gráfica e Noções de Lógica</Text>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
