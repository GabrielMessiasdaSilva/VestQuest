import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

type CustomAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;  // chamado quando terminar o tempo
  duration?: number; // duração em ms (ex: 3000)
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
      <Animated.View style={[styles.overlay, { opacity }]}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Barra verde de progresso */}
          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3C40',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#d0e8dc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#1A3C40',
  },
});
