import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { auth, db } from "../../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type RootStackParamList = {
  Mapa: undefined;
};

export default function Desafio() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Mapa">>();
  const { t } = useTranslation();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "Jogador");
        } else {
          setUsername("Jogador");
        }
      } else {
        setUsername("Jogador");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/img/balao_conversa_verde.png")}
        style={styles.speechBubble}
        resizeMode="contain"
      >
        <Text style={styles.speechText}>{t('speech')}</Text>
      </ImageBackground>

      <Image
        source={require("../../../assets/img/raposa_confiante.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        {username !== null ? t('greetingChallenge', { username }) : "t('greetingNoName')"}
      </Text>

      <Text style={styles.subtitle}>
        {t('instructions')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Mapa")}
      >
        <Text style={styles.buttonText}>{t('backToMap')}</Text>
      </TouchableOpacity>
    </View>
  );
}
