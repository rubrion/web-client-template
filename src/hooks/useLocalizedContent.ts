import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export class MissingTranslationError extends Error {
  constructor(key: string, namespace: string) {
    super(`Missing translation for key: ${key} in namespace: ${namespace}`);
    this.name = 'MissingTranslationError';
  }
}

const globalMissingKeys = new Set<string>();

/**
 * Enhanced hook to get localized content with error handling for missing translations
 * @param namespace The namespace to look for translations
 * @param prefix Optional prefix for the keys to look up (e.g. 'home' for 'home.title')
 * @returns Object with functions to get content and language info
 */
export function useLocalizedContent(namespace: string, prefix?: string) {
  const { t, i18n } = useTranslation(namespace);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [forceRefresh, setForceRefresh] = useState(0);
  const [missingKeys, setMissingKeys] = useState<Set<string>>(new Set());

  // Force refresh when language changes
  useEffect(() => {
    const handleLanguageChange = (event?: CustomEvent) => {
      const newLang = event?.detail?.language || i18n.language;
      if (newLang !== currentLang) {
        setCurrentLang(newLang);
        setForceRefresh((prev) => prev + 1); // Force refresh
        console.log(
          `Language changed to ${newLang} in useLocalizedContent hook`
        );
      }
    };

    // Listen for both direct i18n events and custom events
    document.addEventListener(
      'i18n-language-changed',
      handleLanguageChange as EventListener
    );
    i18n.on('languageChanged', handleLanguageChange);

    // Initial check of resources
    const currentResource = i18n.getResourceBundle(i18n.language, namespace);
    console.log(
      `Current ${namespace} resources for ${i18n.language}:`,
      currentResource
    );

    return () => {
      document.removeEventListener(
        'i18n-language-changed',
        handleLanguageChange as EventListener
      );
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, namespace, currentLang]);

  // Memoize the t function with dependencies on currentLang and forceRefresh
  // This ensures translations are re-evaluated when language changes
  const memT = useMemo(() => {
    return (key: string, options?: any) => {
      return t(key, options);
    };
  }, [t, currentLang, forceRefresh]);

  // Log missing translations in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && missingKeys.size > 0) {
      console.warn(
        `Missing translations in ${namespace}${prefix ? `/${prefix}` : ''}: `,
        Array.from(missingKeys).join(', ')
      );
    }
  }, [missingKeys, namespace, prefix]);

  /**
   * Get content from translations with strict error handling
   * @throws MissingTranslationError if the translation is not found
   */
  const getRequiredContent = useCallback(
    <T>(key: string): T => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      try {
        const result = memT(fullKey, { returnObjects: true });

        if (
          typeof result === 'string' &&
          (result === fullKey || result === '')
        ) {
          throw new MissingTranslationError(fullKey, namespace);
        }

        return result as T;
      } catch (error) {
        console.error(`Translation error for ${fullKey}:`, error);
        throw error instanceof MissingTranslationError
          ? error
          : new MissingTranslationError(fullKey, namespace);
      }
    },
    [memT, prefix, namespace]
  );

  /**
   * Get content from translations without fallbacks
   * Returns null if the translation is missing instead of using fallbacks
   */
  const getContent = useCallback(
    <T>(key: string): T | null => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      try {
        const result = memT(fullKey, { returnObjects: true });

        // Check if we got back the key itself (missing translation)
        if (
          typeof result === 'string' &&
          (result === fullKey || result === '')
        ) {
          // Track the missing key both locally and globally
          setMissingKeys((prev) => {
            const updated = new Set(prev);
            updated.add(key);
            return updated;
          });

          const globalKey = `${namespace}:${fullKey}`;
          if (!globalMissingKeys.has(globalKey)) {
            globalMissingKeys.add(globalKey);
            console.warn(
              `Missing translation for key: ${fullKey} in ${namespace}`
            );
          }

          return null;
        }

        return result as T;
      } catch (error) {
        console.error(`Translation error for ${fullKey}:`, error);
        return null;
      }
    },
    [memT, prefix, namespace]
  );

  const hasTranslation = useCallback(
    (key: string): boolean => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const result = memT(fullKey, { returnObjects: false });
      return typeof result === 'string' && result !== fullKey && result !== '';
    },
    [memT, prefix]
  );

  const getMissingKeys = useCallback((): string[] => {
    return Array.from(missingKeys);
  }, [missingKeys]);

  const getAllMissingKeys = useCallback((): string[] => {
    return Array.from(globalMissingKeys);
  }, []);

  return {
    getContent,
    getRequiredContent,
    hasTranslation,
    currentLang,
    t: memT,
    i18n,
    missingKeys: getMissingKeys(),
    allMissingKeys: getAllMissingKeys(),
  };
}

export default useLocalizedContent;
