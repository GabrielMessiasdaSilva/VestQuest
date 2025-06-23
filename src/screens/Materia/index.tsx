import { View, Text, StyleSheet } from 'react-native';

export default function Materia() {
  return (
    <View style={styles.container}>
      <Text>Materia</Text>
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
