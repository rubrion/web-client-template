import React from 'react';

import MissingTranslation from '../components/translation/MissingTranslation';

/**
 * Helper function to safely handle potentially undefined or null translation content
 * with standardized fallback to MissingTranslation component
 *
 */
export function getTranslatableContent(
  content: React.ReactNode | null,
  translationKey: string
): React.ReactNode {
  if (content === null) {
    return React.createElement(MissingTranslation, {
      translationKey,
      showTooltip: true,
    });
  }
  return content;
}
