// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';

i18n
    .use(initReactI18next) // vincula com react-i18next
    .init({
        resources: {
            pt: { translation: pt },
            en: { translation: en },
        },
        lng: 'pt', // idioma padrão
        fallbackLng: 'pt', // fallback se não encontrar o idioma
        interpolation: {
            escapeValue: false, // React já faz isso
        },
    });

export default i18n;
