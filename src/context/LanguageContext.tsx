import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

interface Language {
  code: string;
  name: string;
  flag?: string;
}

interface LanguageContextType {
  currentLanguage: string;
  languages: Language[];
  changeLanguage: (code: string) => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  languages,
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = useRef(true);
  const lastPathRef = useRef(location.pathname);
  const processingLanguageChange = useRef(false);

  // Get the simple language code from potentially hyphenated code (e.g., 'en-US' -> 'en')
  const getSimpleLanguageCode = (code: string): string => {
    return code.split('-')[0];
  };

  // Sync URL with current language, but avoid infinite loops
  useEffect(() => {
    const currentLangCode = getSimpleLanguageCode(i18n.language);

    // Skip on initial mount to prevent double redirects
    if (isInitialMount.current) {
      isInitialMount.current = false;

      // Don't modify URL or language on initial mount
      // Let other mechanisms handle this to avoid redirect loops
      return;
    }

    // Prevent processing if we're already handling a language change
    if (processingLanguageChange.current) {
      processingLanguageChange.current = false;
      return;
    }

    // Only process if the path has actually changed
    if (location.pathname === lastPathRef.current) {
      return;
    }

    lastPathRef.current = location.pathname;

    const pathParts = location.pathname.split('/');
    const potentialLang = pathParts[1];

    // If URL has a valid language code but different from current, update i18n
    if (languages.some((lang) => lang.code === potentialLang)) {
      if (potentialLang !== currentLangCode) {
        console.log(`Updating language from URL: ${potentialLang}`);
        i18n.changeLanguage(potentialLang);
      }
    }
  }, [location.pathname, i18n, navigate]);

  // Change language and update URL
  const changeLanguage = (code: string) => {
    const currentLangCode = getSimpleLanguageCode(i18n.language);

    if (code === currentLangCode) return;

    console.log(`Manually changing language to: ${code}`);
    processingLanguageChange.current = true;

    // Change i18n language
    i18n.changeLanguage(code);

    // Trigger event for components to refresh
    // Immediately dispatch the event rather than using setTimeout
    try {
      const event = new CustomEvent('i18n-language-changed', {
        detail: { language: code, timestamp: Date.now() },
      });
      document.dispatchEvent(event);
    } catch (error) {
      console.error('Error dispatching language change event:', error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: getSimpleLanguageCode(i18n.language),
        languages,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
