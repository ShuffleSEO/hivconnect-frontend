import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { type Language, defaultLanguage, availableLanguages } from './config';
import './config'; // Initialize i18n

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  availableLanguages: typeof availableLanguages;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = defaultLanguage 
}) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);

  // Initialize language from localStorage or initial prop
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hivconnect-language') as Language;
    const langToUse = savedLanguage && savedLanguage in availableLanguages ? savedLanguage : initialLanguage;
    
    if (langToUse !== currentLanguage) {
      setCurrentLanguage(langToUse);
      i18n.changeLanguage(langToUse);
    }
  }, [initialLanguage, currentLanguage, i18n]);

  const changeLanguage = (language: Language) => {
    if (language in availableLanguages) {
      setCurrentLanguage(language);
      i18n.changeLanguage(language);
      localStorage.setItem('hivconnect-language', language);
      
      // Update document language attribute for accessibility
      document.documentElement.lang = language;
      
      // Dispatch custom event for non-React components
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook for non-React components (Astro components)
export const getTranslation = (language: Language = defaultLanguage) => {
  const translations = {
    en: () => import('./locales/en.json'),
    es: () => import('./locales/es.json')
  };

  return translations[language]();
};

// Helper function to get current language from localStorage
export const getCurrentLanguage = (): Language => {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const saved = localStorage.getItem('hivconnect-language') as Language;
  return saved && saved in availableLanguages ? saved : defaultLanguage;
};

// Helper function to format translation key paths
export const formatTranslationKey = (key: string): string => {
  return key.split('.').join('.');
};