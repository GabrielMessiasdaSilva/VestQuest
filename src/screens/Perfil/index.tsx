import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Footer from '../../components/Footer';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

export default function Perfil() {
  const [username, setUsername] = useState('Usuário01');
  const [password, setPassword] = useState('***************');

  return (
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.profileCard}>
            <Image 
              source={require('../../../assets/img/raposa_confiante.png')} 
              style={styles.avatar}
            />
            <Text style={styles.welcomeText}>Olá {username}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              <Feather name="edit-3" size={20} color="#000" />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Feather name="edit-3" size={20} color="#000" />
            </View>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Feather name="file-text" size={23} color="#000" />
              <Text style={styles.menuText}>Termos e Condições</Text>
              <Entypo name="chevron-right" size={23} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <MaterialIcons name="language" size={20} color="#000" />
              <Text style={styles.menuText}>Escolher língua</Text>
              <Entypo name="chevron-right" size={23} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Feather name="share-2" size={23} color="#000" />
              <Text style={styles.menuText}>Enviar o app para amigos</Text>
              <Entypo name="chevron-right" size={23} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <MaterialIcons name="logout" size={23} color="#000" />
              <Text style={styles.menuText}>Sair da sua conta</Text>
              <Entypo name="chevron-right" size={23} color="#000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />
      </View>
  );
}