import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import GreenModal from "../../components/GreenModal";
import RedModal from "../../components/RedModal";
import EndTimeModal from "../../components/EndTimeModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { sortearPerguntas } from "../../utils/perguntasLoader";
import type { Pergunta } from "../../data/perguntasQuiz";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import type { RouteProp, NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../navigation/types";
import { useTranslation } from "react-i18next";

export default function Quiz() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [perguntaAtual, setPerguntaAtual] = useState(1);
  const [vidas, setVidas] = useState(3);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(
    null
  );
  const route = useRoute<RouteProp<RootStackParamList, "Quiz">>();
  const params = route?.params || {};
  const fase = params?.faseAtual ?? 1;
  const [perguntasFase, setPerguntasFase] = useState<Pergunta[]>([]);
  const tempoAtivado = params?.tempoAtivado ?? false;
  const tempoTotal = params?.tempoTotal ?? 0;
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(tempoTotal);
  const [greenModalVisible, setGreenModalVisible] = useState(false);
  const [redModalVisible, setRedModalVisible] = useState(false);
  const [endTimeModalVisible, setEndTimeModalVisible] = useState(false);
  const scrollRef = React.useRef<ScrollView>(null);
  const { t } = useTranslation();
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [highlightMode, setHighlightMode] = useState(false);

useFocusEffect(
  React.useCallback(() => {
    // Quando a tela é focada, inicia o timer
    if (tempoAtivado && tempoRestante > 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTempoRestante(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            setEndTimeModalVisible(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      // Quando a tela perde o foco, limpa o timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [tempoAtivado, tempoRestante])
);


  useEffect(() => {
    const categoria = faseToCategoria[fase] as Pergunta["categoria"];
    const sorteadas = sortearPerguntas(categoria);
    setPerguntasFase(sorteadas);
  }, [fase]);

  useEffect(() => {
    if (vidas === 0) {
      setRedModalVisible(false);
      navigation.navigate("Vida");
    }
  }, [vidas, navigation]);

  useEffect(() => {
    if (tempoAtivado && tempoRestante <= 0) {
      setEndTimeModalVisible(true);
    }
  }, [tempoRestante, tempoAtivado]);

  const faseToCategoria: { [key: number]: string } = {
    1: "matematica",
    2: "linguagens",
    3: "ciencias_natureza",
    4: "ciencias_humanas",
  };

  const pergunta = perguntasFase[perguntaAtual - 1];
  const respostaCorreta = pergunta?.correta;

  useEffect(() => {
    if (perguntasFase.length > 0 && perguntaAtual > perguntasFase.length) {
      navigation.navigate("Conquista", { acertos, faseConcluida: fase });
    }
  }, [perguntaAtual, perguntasFase.length, acertos]);

  function toggleHighlight(wordId: string) {
    if (!highlightMode) return; // só grifa se lápis ativo
    setHighlightedWords((prev) =>
      prev.includes(wordId)
        ? prev.filter((w) => w !== wordId)
        : [...prev, wordId]
    );
  }

  function handleResposta(alternativa: string) {
    setRespostaSelecionada(alternativa);
    if (alternativa === respostaCorreta) {
      setGreenModalVisible(true);
      setAcertos((prev) => prev + 1);
    } else {
      if (vidas > 1) {
        setRedModalVisible(true);
      }
      setVidas((prev) => prev - 1);
    }
  }

  function proximaPergunta() {
    setGreenModalVisible(false);
    setRespostaSelecionada(null);

    if (perguntaAtual === perguntasFase.length) {
      setTimeout(() => {
        navigation.navigate("Conquista", { acertos, faseConcluida: fase });
      }, 300);
    } else {
      setPerguntaAtual(perguntaAtual + 1);
      rolarParaTopo();
    }
  }

  function respostaErrada() {
    setRedModalVisible(false);
    setRespostaSelecionada(null);

    if (perguntaAtual === perguntasFase.length) {
      setTimeout(() => {
        navigation.navigate("Conquista", { acertos, faseConcluida: fase });
      }, 300);
    } else {
      setPerguntaAtual(perguntaAtual + 1);
      rolarParaTopo();
    }
  }

  function pausarTempo() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function retomarTempo() {
    if (tempoAtivado && tempoRestante > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    }
  }

  // Calcula minutos e segundos
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;

  function voltarAoMapa() {
    navigation.navigate("Mapa");
  }

  // Mostra o total de perguntas e a pergunta exibida
  const totalPerguntas = perguntasFase.length;
  const perguntaExibida = Math.min(perguntaAtual, totalPerguntas);

  // Previne o botão de voltar físico (Android) e gestos de navegação (iOS)
  useFocusEffect(
    React.useCallback(() => {
      // Previne botão físico (Android)
      const onBackPress = () => {
        pausarTempo();
        // Se quiser permitir com confirmação:
        Alert.alert(t("quiz.alert.title"), t("quiz.alert.message"), [
          {
            text: t("quiz.alert.cancel"),
            style: "cancel",
            onPress: () => {
              retomarTempo();
            },
          },
          {
            text: t("quiz.alert.exit"),
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      // Previne gestos de navegação (iOS) e back automático
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        pausarTempo();
        // Mostra alerta se quiser confirmar saída:
        Alert.alert(t("quiz.leaveAlert.title"), t("quiz.leaveAlert.message"), [
          {
            text: t("quiz.leaveAlert.stay"),
            style: "cancel",
            onPress: () => {
              retomarTempo();
            },
          },
          {
            text: t("quiz.leaveAlert.confirm"),
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]);
      });

      return () => {
        backHandler.remove();
        unsubscribe();
      };
    }, [navigation])
  );

  const nomesFases: { [key: number]: string } = {
    1: "Matemática",
    2: "Linguagens",
    3: "Ciências da Natureza",
    4: "Ciências Humanas",
  };

  function rolarParaTopo() {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80,
          backgroundColor: "#f7f8fa",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{t("quiz.title")}</Text>
          <View style={styles.statusBar}>
            <Text style={styles.questionCount}>
              {perguntaExibida}/{totalPerguntas}
            </Text>
            <View style={styles.heartsContainer}>
              {[...Array(3)].map((_, i) => (
                <MaterialCommunityIcons
                  key={i}
                  name={i < vidas ? "heart" : "heart-outline"}
                  size={32}
                  color={i < vidas ? "#F44336" : "#B5B5B5"}
                  style={styles.heartIcon}
                />
              ))}
            </View>
            <View style={styles.timerContainer}>
              {tempoAtivado ? (
                <>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={20}
                    color="#233D4D"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.timerText}>
                    {`${minutos}:${segundos.toString().padStart(2, "0")}`}
                  </Text>
                </>
              ) : (
                <View style={{ width: 48 }} />
              )}
            </View>
          </View>
          <View style={styles.question}>
            <Text style={styles.phase}>
              {t("quiz.phase", {
                number: fase,
                name: t(`quiz.phaseName.${fase}`),
              })}
            </Text>
            {pergunta && (
              <View>
                <Text style={[styles.questionText, { flexWrap: "wrap" }]}>
                  {`(ENEM ${pergunta.ano}) ${pergunta.texto}`
                    .split(" ")
                    .map((word, index) => {
                      const wordId = `${perguntaAtual}-${index}`;
                      return (
                        <Text
                          key={index}
                          onPress={() => toggleHighlight(wordId)}
                          style={
                            highlightedWords.includes(wordId)
                              ? { backgroundColor: "yellow" }
                              : {}
                          }
                        >
                          {word}
                          {index < pergunta.texto.split(" ").length ? " " : ""}
                        </Text>
                      );
                    })}
                </Text>

                {Object.entries(pergunta.alternativas).map(([letra, texto]) => (
                  <TouchableOpacity
                    key={letra}
                    onPress={() => handleResposta(letra)}
                    style={[
                      styles.optionButton,
                      respostaSelecionada === letra
                        ? letra === respostaCorreta
                          ? { backgroundColor: "#A1C181" }
                          : {
                              backgroundColor: "#A92929",
                              borderColor: "#000000",
                            }
                        : null,
                    ]}
                  >
                    <Text style={styles.optionText}>
                      {letra}) {texto}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <GreenModal visible={greenModalVisible} onContinue={proximaPergunta} />
      <RedModal visible={redModalVisible} onContinue={respostaErrada} />
      <EndTimeModal
        visible={endTimeModalVisible}
        onNavigate={voltarAoMapa}
        acertos={acertos}
      />

      {/* Botão flutuante do lápis */}
      <TouchableOpacity
        style={styles.floatingPencil}
        onPress={() => setHighlightMode((prev) => !prev)}
      >
        <MaterialCommunityIcons
          name="pencil"
          size={28}
          color={highlightMode ? "#FFD700" : "#888"}
        />
      </TouchableOpacity>
    </View>
  );
}
