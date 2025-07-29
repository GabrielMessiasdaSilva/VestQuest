import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Perfil() {
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
        } else {
          setUsername("Usuário01");
        }
      } else {
        navigation.navigate("Login" as never);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!uid) return;

    try {
      await setDoc(doc(db, "users", uid), {
        username,
      });
      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao salvar perfil.");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileCard}>
          <Image
            source={require("../../../assets/img/raposa_confiante.png")}
            style={styles.avatar}
          />
          <Text style={styles.welcomeText}>Olá, {username}!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <Feather name="edit-3" size={20} color="#000" />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="file-text" size={23} color="#000" />
            <Text style={styles.menuText}>Termos e Condições</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="language" size={20} color="#000" />
            <Text style={styles.menuText}>Escolher língua</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Feather name="share-2" size={23} color="#000" />
            <Text style={styles.menuText}>Enviar o app para amigos</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <MaterialIcons name="logout" size={23} color="#000" />
            <Text style={styles.menuText}>Sair da sua conta</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
