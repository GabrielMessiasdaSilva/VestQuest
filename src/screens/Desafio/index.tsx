import React from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Mapa: undefined;
};

export default function Desafio() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Mapa">>();

  return (
    <View style={styles.container}>
      {/* Balão de fala */}
<ImageBackground
  source={require("../../../assets/img/balao_conversa_verde.png")}
  style={styles.speechBubble}
  resizeMode="contain"
>
  <Text style={styles.speechText}>
    O desafio de hoje é {"\n"}responder um quiz em {"\n"}10 minutos
  </Text>
</ImageBackground>


      <Image
        source={require("../../../assets/img/raposa_confiante.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Olá, Jogador!</Text>

      <Text style={styles.subtitle}>
        Você irá voltar ao mapa e escolher a {"\n"}quantidade de tempo indicada
        para{"\n"} realizar seu quiz
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
