import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

// Define available languages
export const AVAILABLE_LANGUAGES = ['en', 'es', 'pt'] as const;
export type SupportedLanguage = (typeof AVAILABLE_LANGUAGES)[number];

// Update the context type to include language property
export interface LanguageContextType {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  isRtl: boolean;
}

const defaultLanguage: SupportedLanguage = 'en';

// Create the context with proper types
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  changeLanguage: () => {},
  isRtl: false,
});

export interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Get stored language from localStorage or URL param
    const storedLang = localStorage.getItem('i18nextLng');
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    // Check if the language is supported
    const isValidLanguage = (
      lang?: string | null
    ): lang is SupportedLanguage => {
      return !!lang && AVAILABLE_LANGUAGES.includes(lang as SupportedLanguage);
    };

    // Priority: URL param > localStorage > browser preference > default
    if (isValidLanguage(langParam)) {
      return langParam;
    }

    if (isValidLanguage(storedLang)) {
      return storedLang;
    }

    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (isValidLanguage(browserLang)) {
      return browserLang;
    }

    return defaultLanguage;
  });

  const [isRtl, setIsRtl] = useState(false);

  // Change language handler
  const changeLanguage = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);

    // Update URL parameter without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', url);
  };

  // Update RTL status when language changes
  useEffect(() => {
    const isRtlLanguage = ['ar', 'he'].includes(language);
    setIsRtl(isRtlLanguage);
    document.documentElement.setAttribute('dir', isRtlLanguage ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Force sync with i18next
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
