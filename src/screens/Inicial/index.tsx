import { View, Text, StyleSheet } from 'react-native';

export default function Inicial() {
  return (
    <View style={styles.container}>
      <Text>Inicial</Text>
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
