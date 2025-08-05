import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Mapa: undefined;
};

export default function Vida() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Mapa'>>();
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/img/raposa_coracao.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{t('outOfLivesTitle')}</Text>

      <Text style={styles.subtitle}>
        {t('outOfLivesMessage')}
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