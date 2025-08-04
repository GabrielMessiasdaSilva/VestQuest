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
import * as ImagePicker from "expo-image-picker";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import Footer from "../../components/Footer";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Perfil() {
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [initialUsername, setInitialUsername] = useState("");
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);

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
          setImage(data.photoURL || null);
          setInitialUsername(data.username || "");
          setInitialImage(data.photoURL || null);
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

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Permita acesso às imagens.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setImage(localUri);
    }
  };

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert("Preencha corretamente", "O nome não pode estar vazio.");
      return;
    }

    if (!uid) return;

    try {
      await setDoc(doc(db, "users", uid), {
        username,
        photoURL: image || "", // Agora armazena o link local da imagem
      });
      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
      setInitialUsername(username);
      setInitialImage(image);
      setIsModified(false); // Resetando o estado de modificação após salvar
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

  const checkIfModified = () => {
    return username !== initialUsername || image !== initialImage;
  };

  useEffect(() => {
    setIsModified(checkIfModified());
  }, [username, image]);

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
          <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.7}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/img/perfil.png")
              }
              style={styles.avatarExpanded}
            />
          </TouchableOpacity>

          <Text style={styles.welcomeText}>Olá, {username}!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Feather name="edit-3" size={20} color="#000" />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { opacity: isModified ? 1 : 0.5 }]}
            onPress={handleSave}
            disabled={!isModified} // Desativa o botão quando não houver alterações
          >
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
