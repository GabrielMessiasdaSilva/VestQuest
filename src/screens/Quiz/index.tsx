import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default function Quiz() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Quiz de perguntas</Text>
        </View>
      </ScrollView>
    </View>
  );
}