import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Animated } from 'react-native';
import { footer } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RootStackParamList } from '../navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from "../services/userContext";

const mapScreens = ['Mapa', 'Quiz', 'Vida', 'Conquista', 'Ranking', 'Desafio'];
const homeScreens = ['Home', 'Materia'];

const Footer = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const isMapScreen = mapScreens.includes(route.name);
    const isHomeScreen = homeScreens.includes(route.name);
    const fadeAnim = useRef(new Animated.Value(isMapScreen ? 1 : 0)).current;
    const { photoURL } = useUser();

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0.3, duration: 100, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    }, [isMapScreen, isHomeScreen]);

    return (
        <View style={[footer.container, { paddingBottom: insets.bottom }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={footer.iconContainer}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Image
                        source={
                            isHomeScreen
                                ? require('../../assets/img/home.png')
                                : require('../../assets/img/home-outline.png')
                        }
                        style={{ maxWidth: 36, maxHeight: 36 }}
                    />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={footer.iconContainer}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <MaterialCommunityIcons
                        name={isMapScreen ? 'map-marker-radius' : 'map-marker-radius-outline'}
                        size={36}
                        color={isMapScreen ? '#000' : '#B5B5B5'}
                    />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={footer.iconContainer}>
                <Image
                    source={photoURL ? { uri: photoURL } : require('../../assets/img/perfil.png')}
                    style={{ width: 36, height: 36, borderRadius: 18 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;