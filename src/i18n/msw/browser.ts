import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// Create the MSW worker
export const worker = setupWorker(...handlers);

// Initialize the MSW worker only in development
export async function initMswForI18n() {
  // Only initialize in development environment
  if (!import.meta.env.DEV) {
    console.log('MSW is disabled in production');
    return false;
  }

  // Check if MSW should be disabled based on localStorage preference
  const useMSW = localStorage.getItem('useMSW');
  if (useMSW === 'false') {
    console.log('MSW is disabled based on localStorage preference');
    return false;
  }

  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: { scope: '/' },
      },
    });
    console.log('MSW initialized for i18n API mocking');
    return true;
  } catch (error) {
    console.error('Failed to start MSW for i18n:', error);
    return false;
  }
}

// Check if MSW is running
export const isMswRunning = () => {
  return Boolean(
    navigator.serviceWorker?.controller?.scriptURL?.includes(
      'mockServiceWorker.js'
    )
  );
};
