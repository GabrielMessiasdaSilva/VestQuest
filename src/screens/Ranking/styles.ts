import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 70,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  columnContainer: {
    alignItems: "center",
    width: screenWidth / 3.5,
  },
  acertosNumero: {
    fontSize: 35,
    fontWeight: "bold",
  },
  acertosTexto: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
  },
  bar: {
    width: "100%",
    borderRadius: 5,
    justifyContent: "flex-start", // Alinha para o topo da barra
    alignItems: "center",
    paddingTop: 10,
  },
  insideBar: {
    alignItems: "center",
  },
  posicao: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)", // sombra bem clara
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  materia: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    marginTop: 2,
    textShadowColor: "rgba(0, 0, 0, 0.2)", // sombra bem clara
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  buttonPrimary: {
    backgroundColor: "#1C344D",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonTextPrimary: {
    color: "#fff",
    fontSize: 16,
  },
  paragraph: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
  }
});
