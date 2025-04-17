import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

export interface PageContent {
  [key: string]: any;
}

interface ContentContextType {
  content: PageContent | null;
  loading: boolean;
  error: Error | null;
  loadPageContent: (pageId: string) => Promise<void>;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  content: null,
  loading: false,
  error: null,
  loadPageContent: async () => {},
  refreshContent: async () => {},
});

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const loadPageContent = useCallback(
    async (pageId: string) => {
      if (!pageId) return;

      setLoading(true);
      setError(null);
      setCurrentPageId(pageId);

      try {
        const currentLang = i18n.language.split('-')[0];
        const data = i18n.getResourceBundle(currentLang, 'screens');

        console.log(
          `Loading content for page '${pageId}' in language '${currentLang}'`
        );
        console.log('Available screens data:', data);

        let pageContent = data?.[pageId];

        if (pageContent) {
          console.log(`Found content for '${pageId}'`, pageContent);
          setContent(pageContent);
        } else {
          if (currentLang !== 'en') {
            const fallbackData = i18n.getResourceBundle('en', 'screens');
            pageContent = fallbackData?.[pageId];

            if (pageContent) {
              console.log(
                `Using English fallback for '${pageId}'`,
                pageContent
              );
              setContent(pageContent);
            } else {
              console.warn(`No content found for '${pageId}' in any language`);
              setContent({});
            }
          } else {
            console.warn(`No content found for '${pageId}' in English`);
            setContent({});
          }
        }
      } catch (err) {
        console.error(`Error loading content for '${pageId}'`, err);
        setError(err as Error);
        setContent({});
      } finally {
        setLoading(false);
      }
    },
    [i18n]
  );

  const refreshContent = useCallback(async () => {
    if (currentPageId) {
      await loadPageContent(currentPageId);
    }
  }, [currentPageId, loadPageContent]);

  useEffect(() => {
    const handleLanguageChange = () => {
      refreshContent();
    };

    document.addEventListener('i18n-language-changed', handleLanguageChange);

    return () => {
      document.removeEventListener(
        'i18n-language-changed',
        handleLanguageChange
      );
    };
  }, [refreshContent]);

  useEffect(() => {
    if (currentPageId) {
      console.log(
        `Language changed to ${i18n.language}, reloading content for ${currentPageId}`
      );
      loadPageContent(currentPageId);
    }
  }, [i18n.language, currentPageId, loadPageContent]);

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
        loadPageContent,
        refreshContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);

export default ContentContext;
