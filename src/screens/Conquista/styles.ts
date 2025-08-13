import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f7f8fa',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  circleWrapper: {
    marginBottom: 30,
  },
    percentageText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonPrimary: {
    backgroundColor: '#1C344D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#f7f8fa',
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#1C344D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#1C344D',
    fontSize: 16,
  },
});
