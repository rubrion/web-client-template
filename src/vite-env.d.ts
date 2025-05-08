/// <reference types="vite/client" />

import i18n from 'i18next';

// Extend the Window interface to include i18next
declare global {
  interface Window {
    i18next: typeof i18n;
    __IS_MSW_ACTIVE__?: boolean;
    env?: Record<string, string>;
  }
}
