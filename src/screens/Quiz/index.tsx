import { View, Text, StyleSheet } from 'react-native';

export default function Quiz() {
  return (
    <View style={styles.container}>
      <Text>Quiz</Text>
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
