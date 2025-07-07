import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 20, // para não colidir com o Footer
  },
  profileCard: {
    backgroundColor: "#234051",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 12,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
  },
  saveButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#234051",
    fontWeight: "bold",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000", // contorno preto
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  
});
