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
  bottomMenu: {
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 40,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
