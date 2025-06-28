import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';
import { Picker } from '@react-native-picker/picker';
export default function Mapa() {
  const [selectedTime, setSelectedTime] = useState('none');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Seu mapa de fases</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity style={styles.buttonPlaceholder}>
              <Text style={styles.buttonTitle}>Desafio Diário</Text>
              <Text style={styles.buttonSubtitle}>Acesse aqui</Text>
            </TouchableOpacity>
            <View style={styles.dropdownButton}>
              <View style={styles.dropdownContent}>
                <Text style={styles.dropdownText}>Ativar tempo</Text>
                <Image
                  source={require('../../../assets/img/seta_baixo.png')}
                  style={styles.dropdownIcon}
                />
              </View>
              <Picker
                selectedValue={selectedTime}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedTime(itemValue)}
              >
                <Picker.Item label="Sem tempo" value="none" />
                <Picker.Item label="5 minutos" value="5" />
                <Picker.Item label="10 minutos" value="10" />
                <Picker.Item label="15 minutos" value="15" />
              </Picker>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}