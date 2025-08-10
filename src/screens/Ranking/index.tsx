import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type RootStackParamList = {
  Mapa: undefined;
};

export default function Ranking() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const acertos = userData.quizResults || {};

            const formattedData = [
              {
                materia: t("subjectsRanking.matematica"),
                acertos: acertos.matematica || 0,
                cor: "#FFD966",
              },
              {
                materia: t("subjectsRanking.linguagens"),
                acertos: acertos.linguagens || 0,
                cor: "#203864",
              },
              {
                materia: t("subjectsRanking.natureza"),
                acertos: acertos.ciencias_natureza || 0,
                cor: "#A8D08D",
              },
              {
                materia: t("subjectsRanking.humanas"),
                acertos: acertos.ciencias_humanas || 0,
                cor: "#F4B084",
              },
            ];

            setData(formattedData);
          } else {
            console.log("Usuário não encontrado no Firestore");
          }
        } catch (error) {
          console.error("Erro ao buscar acertos:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const maxAcertos = Math.max(...data.map((d) => d.acertos), 1); // evita divisão por zero
  const chartHeight = 320;

  const dataOrdenada = [...data].sort((a, b) => b.acertos - a.acertos).slice(0, 3);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>{t("titleRanking")}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : dataOrdenada.length === 0 || dataOrdenada.every(item => item.acertos === 0) ? (
          <Text style={styles.paragraph}>
            {t("rankingSemDados")}
          </Text>
        ) : (
          <View style={styles.chartContainer}>
            {dataOrdenada.map((item, index) => {
              const height = (item.acertos / maxAcertos) * chartHeight;

              return (
                <View key={index} style={styles.columnContainer}>
                  <Text style={styles.acertosNumero}>{item.acertos}</Text>
                  <Text style={styles.acertosTexto}>{t("hits")}</Text>

                  <View
                    style={[styles.bar, { height, backgroundColor: item.cor }]}
                  >
                    <View style={styles.insideBar}>
                      <Text style={styles.posicao}>{index + 1}°</Text>
                      <Text style={styles.materia}>{item.materia}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

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
