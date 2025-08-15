// perfil.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  Share
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import Footer from "../../components/Footer";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../../services/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";


export default function Perfil() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { username, setUsername, photoURL, setPhotoURL, uid } = useUser();

  const [image, setImage] = useState<string | null>(photoURL);
  const [initialUsername, setInitialUsername] = useState(username);
  const [initialImage, setInitialImage] = useState(photoURL);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Bloqueia acesso se não estiver logado
  useEffect(() => {
    if (!uid && !loading) {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
      );
    }
  }, [uid, loading]);

  // Marca se houve alteração
  useEffect(() => {
    setIsModified(username !== initialUsername || image !== initialImage);
  }, [username, image]);

  // Inicializa estado com valores do contexto
  useEffect(() => {
    setImage(photoURL);
    setInitialUsername(username);
    setInitialImage(photoURL);
    setLoading(false);
  }, [username, photoURL]);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(t("permission_needed_title"), t("permission_needed_message"));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert(t("fill_correctly_title"), t("fill_correctly_message"));
      return;
    }

    if (!uid) return;

    try {
      await setDoc(
        doc(db, "users", uid),
        { username, photoURL: image || "" },
        { merge: true }
      );
      setPhotoURL(image || "");
      setInitialUsername(username);
      setInitialImage(image);
      setIsModified(false);
      Alert.alert(t("success_title"), t("profile_updated"));
    } catch (error) {
      console.error(error);
      Alert.alert(t("error_title"), t("profile_save_error"));
    }
  };
  
const handleLogout = async () => {
  setIsLoggingOut(true);
  try {
    await auth.signOut();
    await AsyncStorage.clear();
    setUsername("");
    setPhotoURL("");

    navigation.dispatch(
      StackActions.replace("Onboarding") 
    );
  } catch (error) {
    console.error("Erro no logout:", error);
    Alert.alert("Erro", "Não foi possível sair.");
  } finally {
    setIsLoggingOut(false);
  }
};
      
  const handleShareApp = async () => {
    const message =
      "Baixe o aplicativo VestQuest: https://play.google.com/store/apps/details?id=com.viniiv.VestQuest";
    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar o app.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{t("loading_profile")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: Math.max(insets.top, 16) + 90 },
        ]}
      >
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.7}>
            <Image
              source={
                image ? { uri: image } : require("../../../assets/img/perfil.png")
              }
              style={styles.avatarExpanded}
            />
          </TouchableOpacity>

          <Text style={styles.welcomeText}>
            {t("greeting", { name: username })}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <Feather name="edit-3" size={20} color="#000" />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { opacity: isModified ? 1 : 0.5 }]}
            onPress={handleSave}
            disabled={!isModified}
          >
            <Text style={styles.saveButtonText}>{t("save")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Ranking" as never)}
          >
            <Feather name="bar-chart-2" size={23} color="#000" />
            <Text style={styles.menuText}>{t("Ranking")}</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Termos" as never)}
          >
            <Feather name="file-text" size={23} color="#000" />
            <Text style={styles.menuText}>{t("terms")}</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              const newLang = i18n.language === "pt" ? "en" : "pt";
              i18n.changeLanguage(newLang);
            }}
          >
            <MaterialIcons name="language" size={20} color="#000" />
            <Text style={styles.menuText}>{t("choose_language")}</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleShareApp}>
            <Feather name="share-2" size={23} color="#000" />
            <Text style={styles.menuText}>{t("send_app")}</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <MaterialIcons name="logout" size={23} color="#000" />
            <Text style={styles.menuText}>{t("logout")}</Text>
            <Entypo name="chevron-right" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal transparent animationType="fade" visible={isLoggingOut}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#f7f8fa",
              padding: 30,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#000" />
            <Text style={{ marginTop: 15, fontSize: 16 }}>
              {t("signing_out") || "Saindo..."}
            </Text>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
}
