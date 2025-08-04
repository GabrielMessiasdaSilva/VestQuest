import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import { useRoute, RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../navigation/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultadoQuiz() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Conquista">>();
  const acertos = route.params?.acertos ?? 0; // pega o valor, ou 0 se não existir
  const total = 10; // total de perguntas do quiz
  const porcentagem = acertos / total;

  useEffect(() => {
    const salvarProgresso = async () => {
      const fase = route.params?.faseConcluida;
      if (fase == null) return;

      try {
        const salvo = await AsyncStorage.getItem('fasesConcluidas');
        let fasesSalvas = salvo ? JSON.parse(salvo) : [];

        if (!fasesSalvas.includes(fase)) {
          fasesSalvas.push(fase);
          await AsyncStorage.setItem('fasesConcluidas', JSON.stringify(fasesSalvas));
        }
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    };

    salvarProgresso();

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

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
            color="#83AF6D"
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
          onPress={() => navigation.navigate('Mapa', { faseConcluida: route.params?.faseConcluida })}
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
