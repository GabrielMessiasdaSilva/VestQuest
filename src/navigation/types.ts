export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Inicial: undefined;
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Vida: undefined;
  Ranking: undefined;
  Conquista: { acertos: number, faseConcluida?: number };
  Perfil: undefined;
  Mapa: { faseConcluida?: number } | undefined;
  Materia: undefined;
  Desafio: undefined;
  Quiz: { tempoTotal: number; tempoAtivado: boolean, faseAtual: number };
  Main: undefined;
};