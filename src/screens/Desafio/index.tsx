import { View, Text, StyleSheet } from 'react-native';

export default function Desafio() {
  return (
    <View style={styles.container}>
      <Text>Desafio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
