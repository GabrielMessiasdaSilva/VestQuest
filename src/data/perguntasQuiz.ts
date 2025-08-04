export type Pergunta = {
    id: number;
    texto: string;
    alternativas: { [letra: string]: string };
    correta: string;
    categoria: 'ciencias_natureza' | 'linguagens' | 'matematica' | 'ciencias_humanas';
    ano: number;
};