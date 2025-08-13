import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#233D4D',
    paddingVertical: 17,
    paddingHorizontal: 60,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#eee',
    fontWeight: '600',
    fontSize: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  speechBubble: {
    width: 200,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 90,
    marginBottom: -35,
  },
  speechText: {
    color: "#eee",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 7,
    paddingHorizontal: 12,
    transform: [{ rotate: "4.91deg" }],
  },
});
