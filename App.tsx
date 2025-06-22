import React from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';

const App: React.FC = () => {
  const handleStart = () => {
    Alert.alert('Você clicou em Iniciar!');
  };

  const handleAbout = () => {
    Alert.alert('Este é um app de exemplo simples.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Meu App</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <Button title="Iniciar" onPress={handleStart} />
        <View style={styles.spacer} />
        <Button title="Sobre" onPress={handleAbout} />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
  },
  spacer: {
    height: 12,
  },
});
