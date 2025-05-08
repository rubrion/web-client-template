import { SupportedLanguage } from '../context/LanguageContext';

/**
 * Creates a language-specific route with query parameter
 *
 * @param route The base route
 * @param language Optional language code (defaults to current language)
 * @returns Language-specific route with query parameter
 */
export const createLanguageAwareRoute = (
  route: string,
  language?: string
): string => {
  // If language is not specified or is English (default), don't add language parameter
  if (!language || language === 'en') {
    return route;
  }

  // If route already has query parameters
  if (route.includes('?')) {
    return `${route}&lang=${language}`;
  }

  // Add lang as a query parameter
  return `${route}?lang=${language}`;
};

/**
 * Checks if content is available in the specified language
 *
 * @param contentId The identifier for the content
 * @param language The language to check
 * @param contentType The type of content (e.g., 'blog', 'project')
 * @returns Promise that resolves to true if content is available in the language
 */
export const isContentAvailableInLanguage = async (
  _contentId: string,
  language: SupportedLanguage,
  _contentType: 'blog' | 'project'
): Promise<boolean> => {
  // For default language (English), always return true
  if (language === 'en') {
    return true;
  }

  try {
    // This could be implemented with a lightweight API check
    // For now, we'll assume content exists for demo purposes
    return true;
  } catch (error) {
    console.error(`Error checking content availability: ${error}`);
    return false;
  }
};

/**
 * Gets the appropriate route for content based on language availability
 *
 * @param baseRoute The base route without language parameter
 * @param contentId The content identifier
 * @param language The desired language
 * @param contentType The type of content
 * @returns Promise that resolves to the appropriate route
 */
export const getContentRoute = async (
  baseRoute: string,
  contentId: string,
  language: SupportedLanguage,
  contentType: 'blog' | 'project'
): Promise<string> => {
  const isAvailable = await isContentAvailableInLanguage(
    contentId,
    language,
    contentType
  );

  // If content is available in the requested language, add language parameter
  if (isAvailable && language !== 'en') {
    return createLanguageAwareRoute(baseRoute, language);
  }

  // Otherwise, return the route without language parameter (defaults to English)
  return baseRoute;
};
