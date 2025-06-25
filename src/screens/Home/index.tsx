import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Estudo de matérias</Text>
          <View style={styles.searchContainer}>
            <Image source={require('../../../assets/img/lupa.png')} style={styles.iconPlaceholder} />
            <Text style={styles.searchText}>Busque aqui</Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#FCCA46' }]}>
            <Text style={styles.buttonText}>
              Matemática
            </Text>
          </View>
          <Text style={styles.subtitle}>Linguagens</Text>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#233D4D' }]}>
            <Text style={styles.buttonTextSecondary}>
              Língua Portuguesa
            </Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#233D4D' }]}>
            <Text style={styles.buttonTextSecondary}>
              Língua Estrangeira
            </Text>
          </View>
          <Text style={styles.subtitle}>Ciências da Natureza</Text>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#A1C181' }]}>
            <Text style={styles.buttonText}>
              Biologia
            </Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#A1C181' }]}>
            <Text style={styles.buttonText}>
              Química
            </Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#A1C181' }]}>
            <Text style={styles.buttonText}>
              Física
            </Text>
          </View>
          <Text style={styles.subtitle}>Ciências Humanas</Text>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#FE7F2D' }]}>
            <Text style={styles.buttonTextSecondary}>
              História
            </Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#FE7F2D' }]}>
            <Text style={styles.buttonTextSecondary}>
              Geografia
            </Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#FE7F2D' }]}>
            <Text style={styles.buttonTextSecondary}>
              Filosofia
            </Text>
          </View>
          <View style={[styles.buttonPlaceholder, { backgroundColor: '#FE7F2D' }]}>
            <Text style={styles.buttonTextSecondary}>
              Sociologia
            </Text>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}