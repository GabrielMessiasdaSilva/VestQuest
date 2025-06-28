import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';

// Definição do tipo de botão de texto
const buttonTextTypes = ['buttonText', 'buttonTextSecondary'] as const;
type ButtonTextType = typeof buttonTextTypes[number];

// Definição do tipo de grupo de matérias
type MateriaTipo = 'Linguagens' | 'Ciências da Natureza' | 'Ciências Humanas' | 'Matemática';

// Definição do tipo de matéria
const materias: { nome: string; cor: string; tipo: ButtonTextType; grupo: MateriaTipo }[] = [
  { nome: 'Matemática', cor: '#FCCA46', tipo: 'buttonText', grupo: 'Matemática' },
  { nome: 'Língua Portuguesa', cor: '#233D4D', tipo: 'buttonTextSecondary', grupo: 'Linguagens' },
  { nome: 'Língua Estrangeira', cor: '#233D4D', tipo: 'buttonTextSecondary', grupo: 'Linguagens' },
  { nome: 'Biologia', cor: '#A1C181', tipo: 'buttonText', grupo: 'Ciências da Natureza' },
  { nome: 'Química', cor: '#A1C181', tipo: 'buttonText', grupo: 'Ciências da Natureza' },
  { nome: 'Física', cor: '#A1C181', tipo: 'buttonText', grupo: 'Ciências da Natureza' },
  { nome: 'História', cor: '#FE7F2D', tipo: 'buttonTextSecondary', grupo: 'Ciências Humanas' },
  { nome: 'Geografia', cor: '#FE7F2D', tipo: 'buttonTextSecondary', grupo: 'Ciências Humanas' },
  { nome: 'Filosofia', cor: '#FE7F2D', tipo: 'buttonTextSecondary', grupo: 'Ciências Humanas' },
  { nome: 'Sociologia', cor: '#FE7F2D', tipo: 'buttonTextSecondary', grupo: 'Ciências Humanas' },
];

// Função para remover acentos de uma string
function removerAcentos(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Componente principal da tela Home
export default function Home() {
  // Estado para armazenar o texto da busca
  const [busca, setBusca] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Filtra as matérias com base na busca, removendo acentos e convertendo para minúsculas
  const materiasFiltradas = materias.filter(m =>
    removerAcentos(m.nome.toLowerCase()).includes(removerAcentos(busca.toLowerCase()))
  );

  const grupos: MateriaTipo[] = ['Linguagens', 'Ciências da Natureza', 'Ciências Humanas'];
  const materiasPorGrupo = grupos.map(grupo => ({
    grupo,
    materias: materiasFiltradas.filter(m => m.grupo === grupo)
  }));
  // Busca a matéria de Matemática, que é tratada separadamente
  const matematica = materiasFiltradas.find(m => m.grupo === 'Matemática');

  // Estado para controlar o foco do campo de busca
  const [isFocused, setIsFocused] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Estudo de matérias</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.searchContainer}
            onPress={() => inputRef.current && inputRef.current.focus()}
          >
            <Image source={require('../../../assets/img/lupa.png')} style={styles.iconPlaceholder} />
            <TextInput
              ref={inputRef}
              style={styles.searchText}
              placeholder={isFocused ? 'Busque aqui' : ''}
              value={busca}
              onChangeText={text => setBusca(text.slice(0, 18))}
              maxLength={18}
              placeholderTextColor="#B5B5B5"
              underlineColorAndroid="transparent"
              onFocus={() => setIsFocused(false)}
            />
          </TouchableOpacity>
          {matematica && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={[styles.buttonPlaceholder, { backgroundColor: matematica.cor }]}>
                <Text style={styles[matematica.tipo]}>{matematica.nome}</Text>
              </View>
            </View>
          )}
          {materiasPorGrupo.filter(({ materias }) => materias.length > 0).map(({ grupo, materias }) => (
            <View key={grupo} style={{ width: '100%', alignItems: 'center' }}>
              <Text style={styles.subtitle}>{grupo}</Text>
              {materias.map(m => (
                <View key={m.nome} style={[styles.buttonPlaceholder, { backgroundColor: m.cor }]}>
                  <Text style={styles[m.tipo]}>{m.nome}</Text>
                </View>
              ))}
            </View>
          ))}
          {materiasFiltradas.length === 0 && (
            <Text style={{ color: '#B5B5B5', marginTop: 24 }}>Nenhuma matéria encontrada</Text>
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}