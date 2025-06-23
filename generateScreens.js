// generateScreens.js
const fs = require('fs');
const path = require('path');

const screens = [
  'Inicial',
  'Login',
  'Cadastro',
  'Home',
  'Materia',
  'Mapa',
  'Quiz',
  'Vida',
  'Conquista',
  'Ranking',
  'Desafio',
  'Perfil'
];

const baseDir = path.join(__dirname, 'src', 'screens');

const template = (screenName) => `import { View, Text, StyleSheet } from 'react-native';

export default function ${screenName}() {
  return (
    <View style={styles.container}>
      <Text>${screenName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
`;

screens.forEach((screen) => {
  const screenDir = path.join(baseDir, screen);
  const screenFile = path.join(screenDir, 'index.tsx');

  if (!fs.existsSync(screenDir)) {
    fs.mkdirSync(screenDir, { recursive: true });
  }

  fs.writeFileSync(screenFile, template(screen), 'utf8');
  console.log(`✅ Criado: ${screen}/index.tsx`);
});
