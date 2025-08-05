import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

type RootStackParamList = {
  Mapa: undefined;
};

export default function Ranking() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const data = [
    {
      materia: t("subjectsRanking.natureza"),
      acertos: 9,
      cor: "#A8D08D",
      posicao: "2°",
    },
    {
      materia: t("subjectsRanking.matematica"),
      acertos: 10,
      cor: "#FFD966",
      posicao: "1°",
    },
    {
      materia: t("subjectsRanking.linguagens"),
      acertos: 8,
      cor: "#203864",
      posicao: "3°",
    },
  ];

  const maxAcertos = Math.max(...data.map((d) => d.acertos));
  const chartHeight = 320;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>
          {t("titleRanking")}
        </Text>
        <View style={styles.chartContainer}>
          {data.map((item, index) => {
            const height = (item.acertos / maxAcertos) * chartHeight;

            return (
              <View key={index} style={styles.columnContainer}>
                <Text style={styles.acertosNumero}>{item.acertos}</Text>
                <Text style={styles.acertosTexto}>{t("hits")}</Text>

                <View
                  style={[styles.bar, { height, backgroundColor: item.cor }]}
                >
                  <View style={styles.insideBar}>
                    <Text style={styles.posicao}>{item.posicao}</Text>
                    <Text style={styles.materia}>{item.materia}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Text style={styles.buttonTextPrimary}>{t("backToMap")}</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}