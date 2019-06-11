import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Este documento contiene las funciones para poder implementar la internalización en el proyecto 
 */

    //Idiomas a implementar
// English
import en from './assets/locales/en.json';

// Spanish
import es from './assets/locales/es.json';

export enum Language {
    English = 'en',
    Spanish = 'es'
}

//Array de palabras traducidas en el documento
const cldr = {
    [Language.English]: new Array(),
    [Language.Spanish]: new Array(),
};

const resources = {
    [Language.English]: {
        translation: en
    },
    [Language.Spanish]: {
        translation: es
    }
};

i18n
    .use(initReactI18next) // pasa i18n abajo a react-i18next
    .init({
        resources,
        lng: Language.English, // Cambia el lenguaje actual al final del documento
        interpolation: {
            escapeValue: false 
        },
    });


export default i18n;

export function getCurrentLanguage(): string {
    return i18n.language;
}

export type LanguageReturnType = string[];

export function getLanguagesList(): LanguageReturnType[] {
    return [
        ['English', Language.English],
        ['Español', Language.Spanish]
    ];
}

export function changeCurrentLanguage(language: Language): void {
    i18n.changeLanguage(language);

}

// Si no esta implementado el inglés por defecto, usamos el español
changeCurrentLanguage(Language.Spanish);