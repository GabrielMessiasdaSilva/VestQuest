import { View, Text, StyleSheet } from 'react-native';

export default function Ranking() {
  return (
    <View style={styles.container}>
      <Text>Ranking</Text>
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
