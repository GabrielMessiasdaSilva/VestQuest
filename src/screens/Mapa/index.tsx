import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';
import { Picker } from '@react-native-picker/picker';
export default function Mapa() {
  const [selectedTime, setSelectedTime] = useState('none');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Seu mapa de fases</Text>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
              <TouchableOpacity style={[styles.buttonPlaceholder, { backgroundColor: '#619B8A' }]}>
                <Text style={styles.buttonText}>Desafio Diário</Text>
                <Text style={styles.buttonText}>Acesse Aqui</Text>
              </TouchableOpacity>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Ativar Tempo</Text>
                <Image source={require('../../../assets/img/seta_baixo.png')}></Image>
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
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}