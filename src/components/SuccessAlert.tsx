import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { SuccessAlert } from './styles'

type CustomAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  duration?: number;
};

export default function CustomAlert({
  visible,
  title,
  message,
  onConfirm,
  duration = 3000,
}: CustomAlertProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // anima fade-in + barra de progresso
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(() => {
        onConfirm();
      });
    } else {
      opacity.setValue(0);
      progress.setValue(1);
    }
  }, [visible]);

  if (!visible) return null;

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[SuccessAlert.overlay, { opacity }]}>
        <View style={SuccessAlert.alertBox}>
          <Text style={SuccessAlert.title}>{title}</Text>
          <Text style={SuccessAlert.message}>{message}</Text>

          {/* Barra verde de progresso */}
          <View style={SuccessAlert.progressBarBackground}>
            <Animated.View style={[SuccessAlert.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}