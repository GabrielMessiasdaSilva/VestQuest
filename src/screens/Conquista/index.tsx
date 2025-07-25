import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import { useRoute, RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Mapa: undefined;
  Ranking: undefined;
  Conquista: { acertos: number }; // Aqui define que recebe acertos
};

export default function ResultadoQuiz() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Conquista">>();
  const acertos = route.params?.acertos ?? 0; // pega o valor, ou 0 se não existir
  const total = 10; // total de perguntas do quiz
  const porcentagem = acertos / total;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Parabéns!</Text>
        <Text style={styles.subtitle}>
          Você completou esse quiz{"\n"}com sucesso!
        </Text>

        <Text style={styles.resultText}>
          Acertou {acertos}/{total} questões!
        </Text>

        <View style={styles.circleWrapper}>
          {/* Fundo vermelho: representa o erro */}
          <Progress.Circle
            size={240}
            progress={1}
            thickness={8}
            color="#D9534F" // vermelho
            unfilledColor="#eee"
            borderWidth={0}
          />
          <Progress.Circle
            size={240}
            progress={porcentagem}
            thickness={8}
            color="#83AF6D" // verde
            unfilledColor="transparent"
            borderWidth={0}
            showsText={true}
            formatText={() => `${Math.round(porcentagem * 100)}%`}
            textStyle={styles.percentageText}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Text style={styles.buttonTextPrimary}>Voltar ao mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Ranking")}
        >
          <Text style={styles.buttonTextSecondary}>Ver meu ranking</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}
