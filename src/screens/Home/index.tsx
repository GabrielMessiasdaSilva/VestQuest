import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { styles } from './styles';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

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

// Definindo o tipo das rotas usadas
type RootStackParamList = {
  Materia: { nome: string; cor: string; assuntos: string[] };
};

// Função que retorna os assuntos de cada matéria
const assuntosPorMateria: Record<string, string[]> = {
  'Matemática': [
    'Geometria (plana e espacial)',
    'Álgebra (funções, equações, sistemas)',
    'Grandezas e medidas (razões, proporções, porcentagens)',
    'Estatística e Probabilidade',
    'Análise Gráfica e Noções de Lógica',
  ],
  'Língua Portuguesa': [
    'Interpretação de texto (leitura e compreensão)',
    'Gramática (morfologia, sintaxe, semântica)',
    'Literatura (movimentos literários, análise de obras)',
  ],
  'Língua Estrangeira': [
    'Compreensão de texto (inglês ou espanhol)',
    'Vocabulário e gramática básica',
  ],
  'Biologia': [
    'Genética e Evolução',
    'Ecologia (ambientes, cadeias alimentares)',
    'Citologia (células, tecidos)',
    'Fisiologia (seres vivos, sistemas)',
  ],
  'Química': [
    'Química Geral (equações, reações)',
    'Físico-Química (reações, estados da matéria)',
    'Química Orgânica (estruturas, funções)',
  ],
  'Física': [
    'Mecânica (leis de Newton, movimento)',
    'Termologia (temperatura, calor)',
    'Óptica (espelhos, lentes)',
    'Ondulatória (ondas, som)',
    'Eletromagnetismo (ondas eletromagnéticas, circuitos)',
  ],
  'História': [
    'História do Brasil',
    'História Geral (antiga, medieval)',
    'Idade Moderna e Contemporânea',
  ],
  'Geografia': [
    'Geografia do Brasil (economia, população)',
    'Geopolítica (geografia política, relações internacionais)',
    'Cartografia (leitura de mapas, escalas)',
    'Meio Ambiente (questões ambientais, sustentabilidade)',
  ],
  'Filosofia': [
    'Filosofia Antiga (Platão, Aristóteles)',
    'Filosofia Moderna (Descartes, Kant)',
    'Ética e Política (questões éticas, teorias políticas)',
  ],
  'Sociologia': [
    'Sociologia Clássica (Comte, Durkheim)',
    'Cultura e Sociedade (identidade, cultura)',
    'Cidadania (questões sociais, direitos)',
  ],
};

// Componente principal da tela Home
export default function Home() {
  // Estado para armazenar o texto da busca
  const [busca, setBusca] = useState('');
  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
              <TouchableOpacity
                style={[styles.buttonPlaceholder, { backgroundColor: matematica.cor }]}
                onPress={() => navigation.navigate('Materia', { nome: matematica.nome, cor: matematica.cor, assuntos: assuntosPorMateria[matematica.nome] || [] })}
              >
                <Text style={styles[matematica.tipo]}>{matematica.nome}</Text>
              </TouchableOpacity>
            </View>
          )}
          {materiasPorGrupo.filter(({ materias }) => materias.length > 0).map(({ grupo, materias }) => (
            <View key={grupo} style={{ width: '100%', alignItems: 'center' }}>
              <Text style={styles.subtitle}>{grupo}</Text>
              {materias.map(m => (
                <TouchableOpacity
                  key={m.nome}
                  style={[styles.buttonPlaceholder, { backgroundColor: m.cor }]}
                  onPress={() => navigation.navigate('Materia', { nome: m.nome, cor: m.cor, assuntos: assuntosPorMateria[m.nome] || [] })}
                >
                  <Text style={styles[m.tipo]}>{m.nome}</Text>
                </TouchableOpacity>
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