import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Initialize the MSW worker
export async function initMsw() {
  // Check if MSW should be disabled based on localStorage preference
  const useMSW = localStorage.getItem('useMSW');
  if (useMSW === 'false') {
    console.log('MSW is disabled based on localStorage preference');
    window.__IS_MSW_ACTIVE__ = false;
    return;
  }

  await worker.start();
  window.__IS_MSW_ACTIVE__ = true;
  console.log('Mock Service Worker initialized');
}

export const isMswRunning = () => {
  return Boolean(
    navigator.serviceWorker?.controller?.scriptURL?.includes(
      'mockServiceWorker.js'
    )
  );
};

console.log('MSW handlers registered:', handlers.length);
