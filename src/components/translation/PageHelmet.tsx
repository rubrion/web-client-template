import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PageHelmetProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  translationKey?: string;
  translationNamespace?: string;
}

const PageHelmet: React.FC<PageHelmetProps> = ({
  title,
  description,
  children,
  translationKey,
  translationNamespace = 'common',
}) => {
  const { t, i18n } = useTranslation(translationNamespace);

  useEffect(() => {
    // Handle direct translation keys
    const tryTranslate = (key: string, defaultValue: string) => {
      // Skip if not a translation key pattern
      if (!key.includes(':') && !key.includes('.')) {
        return defaultValue;
      }

      try {
        // Split namespace:key format if present
        if (key.includes(':')) {
          const [namespace, actualKey] = key.split(':');
          // Use the specific namespace for this translation
          return i18n.t(`${actualKey}`, { ns: namespace }) || defaultValue;
        } else {
          // Use the default namespace
          return t(key, defaultValue);
        }
      } catch (error) {
        console.warn(`Translation error for key ${key}:`, error);
        return defaultValue;
      }
    };

    // For page title: first try to use translationKey.title if provided, then title as a direct key, then fall back to title as-is
    let finalTitle = title;

    if (translationKey) {
      finalTitle = t(`${translationKey}.title`, { defaultValue: title });
    } else {
      finalTitle = tryTranslate(title, title);
    }

    document.title = finalTitle;

    // Handle description in a similar way
    if (description) {
      let finalDescription = description;

      if (translationKey) {
        finalDescription = t(`${translationKey}.description`, {
          defaultValue: description,
        });
      } else {
        finalDescription = tryTranslate(description, description);
      }

      let metaDescription = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;

      if (!metaDescription) {
        metaDescription = document.createElement('meta') as HTMLMetaElement;
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute('content', finalDescription);
    }
  }, [
    title,
    description,
    t,
    i18n.language,
    translationKey,
    translationNamespace,
  ]);

  return <>{children}</>;
};

export default PageHelmet;
