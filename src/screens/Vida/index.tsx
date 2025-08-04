import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Mapa: undefined;
};

export default function Vida() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Mapa'>>();

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

      <Text style={styles.title}>Você ficou sem vidas!</Text>

      <Text style={styles.subtitle}>
        Errar agora é melhor do que no dia da {"\n"}prova. Tente de novo, tenho
        certeza de {"\n"}que na próxima você vai conseguir!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Mapa")}
      >
        <Text style={styles.buttonText}>Voltar ao mapa</Text>
      </TouchableOpacity>
    </View>
  );
}
