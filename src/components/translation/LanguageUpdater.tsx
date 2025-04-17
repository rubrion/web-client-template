import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Component to ensure language changes are properly propagated
 * to all components that need it
 */
const LanguageUpdater = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Handler for when i18n language changes
    const handleLanguageChange = () => {
      console.log('Language changed event detected, refreshing content');

      // Force reload of translations
      Object.keys(i18n.options.resources || {}).forEach((lng) => {
        Object.keys(i18n.options.resources?.[lng] || {}).forEach((ns) => {
          // Force reload the resources
          i18n.reloadResources([lng], [ns]);
        });
      });

      // Dispatch a custom event for components to refresh
      const event = new CustomEvent('i18n-language-changed', {
        detail: { language: i18n.language },
      });
      document.dispatchEvent(event);
    };

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return null; // This is a non-rendering component
};

export default LanguageUpdater;
