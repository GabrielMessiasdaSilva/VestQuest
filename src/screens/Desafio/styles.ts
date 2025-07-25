import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#1e3a45",
    paddingVertical: 17,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginBottom: 48,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  speechBubble: {
  width: 260, // aumentei o tamanho
  height: 120,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 90, // para afastar da raposa
  marginBottom: -35, // para aproximar da raposa
},

speechText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
  textAlign: "left",
  marginLeft: 7, // para afastar do balão
  paddingHorizontal: 12,
  transform: [{ rotate: "5deg" }], // Ajuste a inclinação até ficar idêntico
},

});
