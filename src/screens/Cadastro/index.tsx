import { View, Text, StyleSheet } from 'react-native';

export default function Cadastro() {
  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
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
