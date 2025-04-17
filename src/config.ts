/**
 * Application configuration and runtime settings
 */

// Declare global window property for TypeScript
declare global {
  interface Window {
    __IS_MSW_ACTIVE__?: boolean;
    env?: Record<string, string>;
  }
}

/**
 * Get an environment variable with fallback to window.env or default value
 */
export const getEnvVariable = (key: string, defaultValue = ''): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const value = import.meta.env[key];
      if (value !== undefined) return value;
    }
  } catch {
    // Silent catch - import.meta might not be available
  }

  if (typeof window !== 'undefined') {
    const windowEnv = window.env || {};
    if (windowEnv[key] !== undefined) {
      return windowEnv[key];
    }
  }

  return defaultValue;
};

/**
 * Get stored data source preference from localStorage
 */
function getStoredPreference(key: string, defaultValue: boolean): boolean {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored === 'true') return true;
  if (stored === 'false') return false;
  return defaultValue;
}

/**
 * API base URL from environment
 */
export const API_BASE_URL = getEnvVariable('VITE_API_URL', '');

/**
 * Feature flags
 */
export const FEATURES = {
  ENABLE_ANALYTICS: getEnvVariable('VITE_ENABLE_ANALYTICS') === 'true',
  ENABLE_NEWSLETTER:
    getEnvVariable('VITE_ENABLE_NEWSLETTER', 'true') !== 'false',
  MAINTENANCE_MODE: getEnvVariable('VITE_MAINTENANCE_MODE') === 'true',
};

/**
 * Pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 9,
  MAX_PAGE_SIZE: 50,
};

/**
 * External service URLs
 */
export const EXTERNAL_SERVICES = {
  GITHUB_URL: 'https://github.com/organization/project',
  TWITTER_URL: 'https://twitter.com/organization',
  LINKEDIN_URL: 'https://linkedin.com/in/organization',
};

/**
 * Runtime configuration flags
 */
export const IS_MOCK =
  typeof window !== 'undefined' &&
  import.meta.env.DEV &&
  (window.__IS_MSW_ACTIVE__ === true || getStoredPreference('useMSW', false));

export const USE_FIRESTORE =
  (getEnvVariable('VITE_USE_FIRESTORE') === 'true' ||
    getStoredPreference('useFirestore', false)) &&
  !IS_MOCK;
export const API_PAGE_LIMIT = PAGINATION.DEFAULT_PAGE_SIZE;
