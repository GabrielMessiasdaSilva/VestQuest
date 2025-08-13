import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import Footer from "../../components/Footer";
import TimeModal from "../../components/TimeModal";
import type { RootStackParamList } from "../../navigation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Mapa() {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTime, setSelectedTime] = useState("none");
  const [modalVisible, setModalVisible] = useState(false);
  const [inputTime, setInputTime] = useState("");

  // Estados para tooltips
  const [tooltipVisible, setTooltipVisible] = useState<
    null | "desafio" | "tempo"
  >(null);

  const showCustomAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const handleActivateTime = () => {
    if (inputTime && Number(inputTime) >= 1 && Number(inputTime) <= 60) {
      setSelectedTime(inputTime);
      setModalVisible(false);
      showCustomAlert(
        t("mapa.alertTempoAtivadoTitulo"),
        t("mapa.alertTempoAtivadoMensagem", { tempo: inputTime })
      );
    } else {
      showCustomAlert(
        t("mapa.alertAtençãoTitulo"),
        t("mapa.alertAtençãoMensagem")
      );
    }
  };

  const handleDeactivateTime = () => {
    setSelectedTime("none");
    setInputTime("");
    setModalVisible(false);
    showCustomAlert(
      t("mapa.alertTempoDesativadoTitulo"),
      t("mapa.alertTempoDesativadoMensagem")
    );
  };

  const [fases, setFases] = useState([
    { numero: 1, status: "disponivel", cor: "amarelo", nome: "matematica" },
    { numero: 2, status: "bloqueada", cor: "azul", nome: "linguagens" },
    { numero: 3, status: "bloqueada", cor: "verde", nome: "ciencias_natureza" },
    { numero: 4, status: "bloqueada", cor: "laranja", nome: "ciencias_humanas", },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      const carregarProgresso = async () => {
        try {
          const salvo = await AsyncStorage.getItem("fasesConcluidas");
          const fasesConcluidas: number[] = salvo ? JSON.parse(salvo) : [];

          setFases((prev) =>
            prev.map((fase) => {
              if (fasesConcluidas.includes(fase.numero)) {
                return { ...fase, status: "concluida" };
              } else if (
                fasesConcluidas.includes(fase.numero - 1) ||
                fase.numero === 1
              ) {
                return { ...fase, status: "disponivel" };
              } else {
                return { ...fase, status: "bloqueada" };
              }
            })
          );
        } catch (error) {
          console.error("Erro ao carregar progresso:", error);
        }
      };

      carregarProgresso();
    }, [])
  );

  const iniciarFase = (faseNumero: number) => {
    navigation.navigate("Quiz", {
      tempoTotal: selectedTime !== "none" ? Number(selectedTime) * 60 : 0,
      tempoAtivado: selectedTime !== "none",
      faseAtual: faseNumero,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {t("mapa.titulo")}
          </Text>

          {/* Linha dos ícones com tooltip */}
          <View style={styles.rowButtons}>
            {/* Desafio Diário */}
            <View style={{ alignItems: "center" }}>
              <View style={{ position: "relative" }}>
                {/* Ícone ? posicionado no topo direito */}
                <TouchableOpacity
                  onPress={() =>
                    setTooltipVisible(
                      tooltipVisible === "desafio" ? null : "desafio"
                    )
                  }
                  style={styles.questionMark}
                >
                  <Icon name="question-circle" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Desafio")}
                  activeOpacity={0.7}
                  style={styles.buttonPlaceholder}
                >
                  <Icon name="bolt" size={32} color="#fff" />
                </TouchableOpacity>
              </View>

              <Text
                style={styles.buttonTitle}
              >
                {t("mapa.desafioDiario")}
              </Text>
            </View>

            {/* Ativar Tempo */}
            <View style={{ alignItems: "center" }}>
              <View style={{ position: "relative" }}>
                {/* Ícone ? posicionado no topo direito */}
                <TouchableOpacity
                  onPress={() =>
                    setTooltipVisible(
                      tooltipVisible === "tempo" ? null : "tempo"
                    )
                  }
                  style={styles.questionMark}
                >
                  <Icon name="question-circle" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.7}
                  style={styles.dropdownButton}
                >
                  <Icon
                    name="clock"
                    size={32}
                    color={selectedTime !== "none" ? "#619B8A" : "#999"}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={styles.buttonTitle}
              >
                {selectedTime !== "none"
                  ? t("mapa.tempoSelecionado", { tempo: selectedTime })
                  : t("mapa.ativarTempo")}
              </Text>
            </View>
          </View>

          {/* Tooltips Modais */}
          <Modal
            transparent
            visible={tooltipVisible !== null}
            animationType="fade"
            onRequestClose={() => setTooltipVisible(null)}
          >
            <Pressable
              style={styles.tooltipContainer}
              onPress={() => setTooltipVisible(null)}
            >
              <View
                style={styles.tooltipContent}
              >
                {tooltipVisible === "desafio" && (
                  <Text style={styles.tooltipText}>
                    {t("mapa.tooltipDesafio")}
                  </Text>
                )}
                {tooltipVisible === "tempo" && (
                  <Text style={styles.tooltipText}>
                    {t("mapa.tooltipTempo")}
                  </Text>
                )}
              </View>
            </Pressable>
          </Modal>

          {/* Mapa vertical com linhas e fases */}
          <View
            style={styles.phaseMapContainer}
          >
            {fases.map((fase, index) => {
              const faseStatus = fase.status;

              const borderColor =
                faseStatus === "concluida"
                  ? "#4CAF50"
                  : faseStatus === "disponivel"
                    ? "#FEC946"
                    : "#bbb";

              return (
                <View
                  key={fase.numero}
                  style={styles.phaseItem}
                >
                  <TouchableOpacity
                    disabled={faseStatus !== "disponivel"}
                    onPress={() => iniciarFase(fase.numero)}
                    activeOpacity={0.7}
                    style={[styles.phaseCircle, {
                      backgroundColor:
                        faseStatus === "concluida" ? "#4CAF50" : "#fff",
                      borderColor,
                      shadowColor:
                        faseStatus === "disponivel" ? "#FEC946" : "transparent",
                      elevation: faseStatus === "disponivel" ? 10 : 0,
                    }]}
                  >
                    <Text
                      style={[styles.phaseNumber, {
                        color: faseStatus === "concluida" ? "#fff" : "#333",
                      }]}
                    >
                      {fase.numero}
                    </Text>

                    {faseStatus === "bloqueada" && (
                      <Image
                        source={require("../../../assets/img/cadeado.png")}
                        style={styles.iconBlocked}
                      />
                    )}

                    {/* Coroa pequena no topo */}
                    <View
                      style={styles.crownPlaceholder}
                    >
                      <Image
                        source={require("../../../assets/img/coroa.png")}
                        style={styles.crownIcon}
                      />
                      <Text
                        style={styles.crownNumber}
                      >
                        {fase.numero}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <Text
                    style={[styles.subjectTitle, {
                      color: faseStatus === "bloqueada" ? "#aaa" : "#444",
                    }]}
                  >
                    {t(`mapa.${fase.nome}`)}
                  </Text>

                  {index < fases.length - 1 && (
                    <View
                      style={styles.lineContainer}
                    >
                      {/* Linha vertical entre as fases */}
                      <View
                        style={{
                          width: 4,
                          height:
                            fases[index].status === "concluida"
                              ? 70 // linha maior se fase concluída
                              : 40, // linha padrão caso contrário
                          backgroundColor:
                            fases[index].status === "concluida" &&
                              fases[index + 1].status !== "bloqueada"
                              ? "#4CAF50"
                              : "#ccc",
                          borderRadius: 2,
                        }}
                      />
                      {/* Círculo indicador no meio da linha */}
                      <View
                        style={{
                          position: "absolute",
                          top:
                            fases[index].status === "concluida"
                              ? 58 // posicionado perto do fim da linha maior
                              : 18, // no meio da linha menor
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          backgroundColor:
                            fases[index].status === "concluida" &&
                              fases[index + 1].status !== "bloqueada"
                              ? "#4CAF50"
                              : "#ccc",
                          borderWidth: 2,
                          borderColor: "#fff",
                          elevation: 3,
                        }}
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <TimeModal
        visible={modalVisible}
        inputTime={inputTime}
        setInputTime={setInputTime}
        onActivate={handleActivateTime}
        onDeactivate={handleDeactivateTime}
        onClose={() => setModalVisible(false)}
      />

      <Footer />
    </View>
  );
}
