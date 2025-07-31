// Import translation files directly for server-side use
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

export type Language = 'en' | 'es';
export const defaultLanguage: Language = 'en';

const translations = {
  en: enTranslations,
  es: esTranslations
};

// Helper function to get nested object values using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// Translation function for Astro components - now uses Astro.currentLocale
export function t(key: string, language: Language = defaultLanguage, interpolation?: Record<string, string | number>): string {
  const translation = getNestedValue(translations[language], key);
  
  if (translation === undefined) {
    // Fallback to default language
    const fallbackTranslation = getNestedValue(translations[defaultLanguage], key);
    if (fallbackTranslation === undefined) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return interpolateString(fallbackTranslation, interpolation);
  }
  
  return interpolateString(translation, interpolation);
}

// Simple interpolation function
function interpolateString(str: string, values?: Record<string, string | number>): string {
  if (!values) return str;
  
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
}

// Get available languages for Astro components
export function getAvailableLanguages() {
  return {
    en: 'English',
    es: 'Español'
  };
}

// Get current language from Astro context
export function getCurrentLanguage(astroLocale?: string): Language {
  if (astroLocale && (astroLocale === 'en' || astroLocale === 'es')) {
    return astroLocale;
  }
  return defaultLanguage;
}

// Generate language-specific URLs using Astro's i18n routing
export function getLocalizedUrl(path: string, language: Language): string {
  if (language === defaultLanguage) {
    return path;
  }
  return `/${language}${path}`;
}

// Get alternate language URLs for the current page
export function getAlternateLanguageUrls(currentPath: string): Record<Language, string> {
  return {
    en: currentPath.startsWith('/es') ? currentPath.replace('/es', '') || '/' : currentPath,
    es: currentPath.startsWith('/es') ? currentPath : `/es${currentPath}`
  };
}

// Export translations for direct access if needed
export { translations };