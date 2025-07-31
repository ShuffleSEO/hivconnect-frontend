import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';

// Available languages
export const availableLanguages = {
  en: 'English',
  es: 'Español'
} as const;

export type Language = keyof typeof availableLanguages;

// Default language
export const defaultLanguage: Language = 'en';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    },
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Key separator and namespace separator
    keySeparator: '.',
    nsSeparator: false,

    // React specific options
    react: {
      useSuspense: false
    }
  });

export default i18n;