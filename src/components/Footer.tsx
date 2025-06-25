import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { footer } from './styles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Mapa: undefined;
    Perfil: undefined;
};

const Footer = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={footer.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={footer.iconContainer}>
                <Image source={require('../../assets/img/home.png')} style={{ maxWidth: 36, maxHeight: 36 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={footer.iconContainer}>
                <Image source={require('../../assets/img/map.png')} style={{ maxWidth: 36, maxHeight: 36 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={footer.iconContainer}>
                <Image source={require('../../assets/img/perfil.png')} style={{ maxWidth: 36, maxHeight: 36 }} />
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
