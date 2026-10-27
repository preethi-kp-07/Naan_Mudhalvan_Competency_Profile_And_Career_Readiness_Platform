import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import enTranslations from './locales/en.json';
import taTranslations from './locales/ta.json';
import {
  COMPETENCY_TRANSLATIONS,
  LEVEL_TRANSLATIONS,
  DIFFICULTY_TRANSLATIONS,
  SEVERITY_TRANSLATIONS,
} from './dataTranslations';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string, params?: Record<string, string | number>) => string;
  getCompetencyName: (name: string) => string;
  getLevelName: (level: string) => string;
  getDifficultyName: (diff: string) => string;
  getSeverityName: (severity: string) => string;
}

const STORAGE_KEY = 'nm_language';

const translationsMap: Record<Language, any> = {
  en: enTranslations,
  ta: taTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ta' || saved === 'en') {
        return saved;
      }
    } catch {
      // LocalStorage might be disabled or unavailable
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      if (lang === 'ta') {
        document.documentElement.classList.add('font-tamil');
      } else {
        document.documentElement.classList.remove('font-tamil');
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (language === 'ta') {
        document.documentElement.classList.add('font-tamil');
      } else {
        document.documentElement.classList.remove('font-tamil');
      }
    }
  }, [language]);

  // Deep dot-notation lookup with fallback and interpolation
  const t = (key: string, fallback?: string, params?: Record<string, string | number>): string => {
    const activeDict = translationsMap[language] || translationsMap.en;
    const fallbackDict = translationsMap.en;

    const resolveKey = (dict: any, path: string): string | undefined => {
      if (!dict) return undefined;
      const parts = path.split('.');
      let current = dict;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      return typeof current === 'string' ? current : undefined;
    };

    let result = resolveKey(activeDict, key);
    if (!result && language !== 'en') {
      result = resolveKey(fallbackDict, key);
    }
    if (!result) {
      result = fallback !== undefined ? fallback : key;
    }

    if (params && typeof result === 'string') {
      return result.replace(/\{(\w+)\}/g, (_, match) => {
        return params[match] !== undefined ? String(params[match]) : `{${match}}`;
      });
    }

    return result;
  };

  const getCompetencyName = (name: string): string => {
    if (language === 'ta') {
      return COMPETENCY_TRANSLATIONS[name]?.ta || name;
    }
    return COMPETENCY_TRANSLATIONS[name]?.en || name;
  };

  const getLevelName = (level: string): string => {
    if (language === 'ta') {
      return LEVEL_TRANSLATIONS[level]?.ta || level;
    }
    return LEVEL_TRANSLATIONS[level]?.en || level;
  };

  const getDifficultyName = (diff: string): string => {
    if (language === 'ta') {
      return DIFFICULTY_TRANSLATIONS[diff]?.ta || diff;
    }
    return DIFFICULTY_TRANSLATIONS[diff]?.en || diff;
  };

  const getSeverityName = (severity: string): string => {
    if (language === 'ta') {
      return SEVERITY_TRANSLATIONS[severity]?.ta || severity;
    }
    return SEVERITY_TRANSLATIONS[severity]?.en || severity;
  };

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      getCompetencyName,
      getLevelName,
      getDifficultyName,
      getSeverityName,
    }),
    [language]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Compatible with react-i18next pattern
export const useTranslation = () => {
  const { language, setLanguage, t } = useLanguage();
  return {
    t,
    i18n: {
      language,
      changeLanguage: setLanguage,
    },
  };
};
