import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  Animated,
  Easing,
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
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

export default function Mapa() {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTime, setSelectedTime] = useState("none");
  const [modalVisible, setModalVisible] = useState(false);
  const [inputTime, setInputTime] = useState("");
  const rotation = React.useRef(new Animated.Value(0)).current;

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
    {
      numero: 4,
      status: "bloqueada",
      cor: "laranja",
      nome: "ciencias_humanas",
    },
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

  // Componente animado do relógio

  interface AnimatedClockProps {
    active: boolean;
    size?: number;
    color?: string;
  }

  function AnimatedClock({
    active,
    size = 40,
    color = "#619B8A",
  }: AnimatedClockProps) {
    const rotationMinutes = React.useRef(new Animated.Value(0)).current;
    const rotationHours = React.useRef(new Animated.Value(0)).current;
    const center = size / 2;
    const radius = center - 2;

    React.useEffect(() => {
      if (active) {
        // ponteiro dos minutos
        Animated.loop(
          Animated.timing(rotationMinutes, {
            toValue: 1,
            duration: 10000, // ajuste para animação visível
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();

        // ponteiro das horas
        Animated.loop(
          Animated.timing(rotationHours, {
            toValue: 1,
            duration: 70000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      } else {
        rotationMinutes.stopAnimation();
        rotationMinutes.setValue(0);
        rotationHours.stopAnimation();
        rotationHours.setValue(0);
      }
    }, [active]);

    // Iniciar minutos a 70° (aprox 0.199 de 360°)
    const rotateMinutesInterpolate = rotationMinutes.interpolate({
      inputRange: [0, 1],
      outputRange: ["70deg", "430deg"], // 70° inicial + 360° rotação
    });

    const rotateHoursInterpolate = rotationHours.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* círculo externo */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={4}
          fill="none"
        />

        {/* Números comentados */}
        {/*
      const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
      {numbers.map((num) => {
        const angle = ((num - 3) / 12) * 2 * Math.PI;
        const x = center + radius * 0.75 * Math.cos(angle);
        const y = center + radius * 0.75 * Math.sin(angle) + 1;
        return (
          <SvgText
            key={num}
            x={x}
            y={y}
            fontSize={radius * 0.25}
            fill={color}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {num}
          </SvgText>
        );
      })}
      */}

        {/* ponteiro das horas */}
        <Animated.View
          style={{
            position: "absolute",
            width: size,
            height: size,
            top: 0,
            left: 0,
            transform: [{ rotate: rotateHoursInterpolate }],
          }}
        >
          <Svg height={size} width={size}>
            <Line
              x1={center}
              y1={center}
              x2={center}
              y2={center - radius * 0.5}
              stroke={color}
              strokeWidth={2.1}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>

        {/* ponteiro dos minutos */}
        <Animated.View
          style={{
            position: "absolute",
            width: size,
            height: size,
            top: 0,
            left: 0,
            transform: [{ rotate: rotateMinutesInterpolate }],
          }}
        >
          <Svg height={size} width={size}>
            <Line
              x1={center}
              y1={center}
              x2={center}
              y2={center - radius * 0.74}
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>

        {/* ponto central */}
        <Circle cx={center} cy={center} r={2.1} fill={color} />
      </Svg>
    );
  }

  // Componente animado do Desafio Diário
  function DailyChallengeIcon() {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    const rotateAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      const tilt = Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -5,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      Animated.parallel([pulse, tilt]).start();
    }, []);

    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [-5, 5],
      outputRange: ["-5deg", "5deg"],
    });

    return (
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
        }}
      >
        <Icon name="bolt" size={32} color="#fff" />
      </Animated.View>
    );
  }

  // Componente animado do círculo das fases

  interface AnimatedPhaseCircleProps {
    children: React.ReactNode;
    isActive: boolean; // disponível ou concluída
    style?: any;
  }

  function AnimatedPhaseCircle({
    children,
    isActive,
    style,
  }: AnimatedPhaseCircleProps) {
    const translateYAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      if (isActive) {
        // Animação de flutuação vertical
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateYAnim, {
              toValue: -4, // sobe 4px
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
              toValue: 4, // desce 4px
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    }, [isActive]);

    return (
      <Animated.View
        style={[style, { transform: [{ translateY: translateYAnim }] }]}
      >
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{t("mapa.titulo")}</Text>

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
                  <DailyChallengeIcon />
                </TouchableOpacity>
              </View>

              <Text style={styles.buttonTitle}>{t("mapa.desafioDiario")}</Text>
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
                  <AnimatedClock
                    active={selectedTime !== "none"}
                    size={40}
                    color={selectedTime !== "none" ? "#619B8A" : "#999"}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.buttonTitle}>
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
              <View style={styles.tooltipContent}>
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
          <View style={styles.phaseMapContainer}>
            {fases.map((fase, index) => {
              const faseStatus = fase.status;
              const borderColor =
                faseStatus === "concluida"
                  ? "#4CAF50"
                  : faseStatus === "disponivel"
                  ? "#FEC946"
                  : "#bbb";

              return (
                <View key={fase.numero} style={styles.phaseItem}>
                  <TouchableOpacity
                    disabled={faseStatus !== "disponivel"}
                    onPress={() => iniciarFase(fase.numero)}
                    activeOpacity={0.7}
                  >
                    <AnimatedPhaseCircle
                      isActive={faseStatus === "disponivel"}
                      style={[
                        styles.phaseCircle,
                        {
                          backgroundColor:
                            faseStatus === "concluida" ? "#4CAF50" : "#fff",
                          borderColor,
                          shadowColor:
                            faseStatus === "disponivel"
                              ? "#FEC946"
                              : "transparent",
                          elevation: faseStatus === "disponivel" ? 10 : 0,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.phaseNumber,
                          {
                            color: faseStatus === "concluida" ? "#fff" : "#333",
                          },
                        ]}
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
                      <View style={styles.crownPlaceholder}>
                        <Image
                          source={require("../../../assets/img/coroa.png")}
                          style={styles.crownIcon}
                        />
                        <Text style={styles.crownNumber}>{fase.numero}</Text>
                      </View>
                    </AnimatedPhaseCircle>
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.subjectTitle,
                      { color: faseStatus === "bloqueada" ? "#aaa" : "#444" },
                    ]}
                  >
                    {t(`mapa.${fase.nome}`)}
                  </Text>

                  {index < fases.length - 1 && (
                    <View style={styles.lineContainer}>
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
