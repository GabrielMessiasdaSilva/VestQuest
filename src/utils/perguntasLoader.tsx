import type { Pergunta } from '../data/perguntasQuiz';
import { perguntasMatematica } from '../data/perguntas/matematica';
import { perguntasCN } from '../data/perguntas/ciencias_natureza';
import { perguntasLinguagens } from '../data/perguntas/linguagens';
import { perguntasCH } from '../data/perguntas/ciencias_humanas';

export function sortearPerguntas(categoria: Pergunta['categoria'], quantidade = 10): Pergunta[] {
    let perguntasFiltradas: Pergunta[] = [];

    switch (categoria) {
        case 'matematica':
            perguntasFiltradas = perguntasMatematica;
            break;
        case 'ciencias_natureza':
            perguntasFiltradas = perguntasCN;
            break;
        case 'linguagens':
            perguntasFiltradas = perguntasLinguagens;
            break;
        case 'ciencias_humanas':
            perguntasFiltradas = perguntasCH;
            break;
    }

    const sorteadas = [...perguntasFiltradas]
        .sort(() => Math.random() - 0.5)
        .slice(0, quantidade);

    return sorteadas;
}
