import React from 'react';

import MissingTranslation from '../components/translation/MissingTranslation';

/**
 * Helper function to safely handle potentially undefined or null translation content
 * with standardized fallback to MissingTranslation component
 */
export function getTranslatableContent(
  content: string | React.ReactNode | undefined | null,
  translationKey: string
): string | React.ReactNode {
  if (content === undefined || content === null) {
    return React.createElement(MissingTranslation, {
      translationKey,
      showTooltip: true,
    });
  }
  return content;
}

/**
 * Helper function to safely handle potentially undefined or null string translation content
 * Returns either the content or a debug-formatted key as fallback (removed default text param)
 */
export function getStringContent(
  content: string | undefined | null,
  translationKey: string
): string {
  if (content === undefined || content === null) {
    // For debugging in development, add a special prefix to indicate missing translation
    if (process.env.NODE_ENV === 'development') {
      return `[${translationKey}]`;
    }
    return ''; // Return empty string instead of default text
  }
  return content;
}

/**
 * Helper function to handle array content safely
 */
export function getArrayContent<T>(
  content: T[] | undefined,
  translationKey: string,
  defaultArray: T[] = []
): T[] | React.ReactNode {
  if (!content || !Array.isArray(content) || content.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      return React.createElement(MissingTranslation, {
        translationKey: `${translationKey} (array)`,
        showTooltip: true,
      });
    }
    return defaultArray;
  }
  return content;
}

/**
 * Safe accessor for nested object properties with MissingTranslation fallback
 */
export function getNestedContent<T>(
  obj: any,
  path: string,
  translationKey: string
): T | React.ReactNode {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (
      current === undefined ||
      current === null ||
      typeof current !== 'object'
    ) {
      return React.createElement(MissingTranslation, {
        translationKey: `${translationKey}.${path}`,
        showTooltip: true,
      });
    }
    current = current[key];
  }

  if (current === undefined || current === null) {
    return React.createElement(MissingTranslation, {
      translationKey: `${translationKey}.${path}`,
      showTooltip: true,
    });
  }

  return current as T;
}
