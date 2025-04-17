import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { MissingTranslationError } from '../hooks/useLocalizedContent';

interface TranslationState {
  isLoading: boolean;
  hasError: boolean;
  errorDetails: string | null;
}

interface TranslationContextType {
  getContent: <T>(namespace: string, key: string) => T | null;
  getRequiredContent: <T>(namespace: string, key: string) => T;
  translationState: TranslationState;
  resetError: () => void;
  missingKeys: string[];
}

const TranslationContext = createContext<TranslationContextType>({
  getContent: () => null,
  getRequiredContent: () => {
    throw new Error('Not implemented');
  },
  translationState: {
    isLoading: false,
    hasError: false,
    errorDetails: null,
  },
  resetError: () => {},
  missingKeys: [],
});

export const useTranslationContext = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [translationState, setTranslationState] = useState<TranslationState>({
    isLoading: true,
    hasError: false,
    errorDetails: null,
  });
  const [missingKeys, setMissingKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (i18n.isInitialized) {
      setTranslationState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [i18n.isInitialized]);

  const resetError = useCallback(() => {
    setTranslationState((prev) => ({
      ...prev,
      hasError: false,
      errorDetails: null,
    }));
  }, []);

  const getContent = useCallback(
    <T,>(namespace: string, key: string): T | null => {
      try {
        if (!i18n.isInitialized) {
          console.warn(`i18n not initialized when getting ${namespace}:${key}`);
          return null;
        }

        const result = i18n.t(`${key}`, { ns: namespace, returnObjects: true });

        if (typeof result === 'string' && result === key) {
          const fullKey = `${namespace}:${key}`;

          setMissingKeys((prev) => {
            const updated = new Set(prev);
            updated.add(fullKey);
            return updated;
          });

          console.warn(`Missing translation for ${fullKey}`);
          return null;
        }

        return result as T;
      } catch (error) {
        console.error(
          `Error getting translation for ${namespace}:${key}`,
          error
        );
        return null;
      }
    },
    [i18n]
  );

  const getRequiredContent = useCallback(
    <T,>(namespace: string, key: string): T => {
      try {
        if (!i18n.isInitialized) {
          throw new Error(
            `i18n not initialized when getting ${namespace}:${key}`
          );
        }

        const result = i18n.t(`${key}`, { ns: namespace, returnObjects: true });

        if (typeof result === 'string' && result === key) {
          throw new MissingTranslationError(key, namespace);
        }

        return result as T;
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : `Unknown error getting ${namespace}:${key}`;

        setTranslationState({
          isLoading: false,
          hasError: true,
          errorDetails: errorMsg,
        });

        throw error;
      }
    },
    [i18n]
  );

  useEffect(() => {
    resetError();
  }, [i18n.language, resetError]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && missingKeys.size > 0) {
      console.warn('Missing translations:', Array.from(missingKeys));
    }
  }, [missingKeys]);

  return (
    <TranslationContext.Provider
      value={{
        getContent,
        getRequiredContent,
        translationState,
        resetError,
        missingKeys: Array.from(missingKeys),
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
