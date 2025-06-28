import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, Animated } from 'react-native';
import { footer } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
    Home: undefined;
    Mapa: undefined;
    Perfil: undefined;
    Quiz?: undefined;
    Vida?: undefined;
    Conquista?: undefined;
    Ranking?: undefined;
    Desafio?: undefined;
    Materia?: undefined;
};

const mapScreens = ['Mapa', 'Quiz', 'Vida', 'Conquista', 'Ranking', 'Desafio'];
const homeScreens = ['Home', 'Materia'];

const Footer = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const isMapScreen = mapScreens.includes(route.name);
    const isHomeScreen = homeScreens.includes(route.name);

    const fadeAnim = useRef(new Animated.Value(isMapScreen ? 1 : 0)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0.3, duration: 100, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    }, [isMapScreen, isHomeScreen]);

    return (
        <View style={footer.container}>
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
                <Image source={require('../../assets/img/perfil.png')} style={{ maxWidth: 36, maxHeight: 36 }} />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
