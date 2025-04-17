import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import all translation resources
import enResources from './i18n/locales/en';
import esResources from './i18n/locales/es';
import ptResources from './i18n/locales/pt';

// Debug resources
console.log('Initializing i18n with resources:', {
  en: Object.keys(enResources),
  es: Object.keys(esResources),
  pt: Object.keys(ptResources),
});

// Process resources to include screen files - removed as require.context is only available in webpack
const processScreenResources = (
  resources: Record<string, any>
): Record<string, any> => {
  // If there's no screens object, create an empty one
  if (!resources.screens) {
    resources.screens = {};
  }

  // Return the resources unchanged - we'll rely on explicit imports instead
  return resources;
};

// Process resources to include screen files
const en = processScreenResources(enResources);
const es = processScreenResources(esResources);
const pt = processScreenResources(ptResources);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, es, pt },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    returnNull: false,
    returnEmptyString: false,

    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng.split('-')[0]);
  console.log(`Language changed to: ${lng}`);

  const event = new CustomEvent('i18n-language-changed', {
    detail: { language: lng },
  });
  document.dispatchEvent(event);
});

export default i18n;
