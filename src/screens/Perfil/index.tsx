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
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Perfil() {
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [initialUsername, setInitialUsername] = useState("");
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
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
          setUsername(t("default_username"));
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
      const localUri = result.assets[0].uri;
      setImage(localUri);
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
        {
          username,
          photoURL: image || "", // Agora armazena o link local da imagem
        },
        { merge: true }
      ); // Usando merge para não sobrescrever outros campos
      Alert.alert(t("success_title"), t("profile_updated"));
      setInitialUsername(username);
      setInitialImage(image);
      setIsModified(false); // Resetando o estado de modificação após salvar
    } catch (error) {
      console.error(error);
      Alert.alert(t("error_title"), t("profile_save_error"));
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
      Alert.alert(t("error_title"), t("logout_error"));
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
        <Text>{t("loading_profile")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingTop: Math.max(insets.top, 16) + 90 }]}>
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

          <Text style={styles.welcomeText}>
            {t("greeting", { name: username })}
          </Text>

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

          <TouchableOpacity style={styles.menuItem}>
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
      <Footer />
    </View>
  );
}