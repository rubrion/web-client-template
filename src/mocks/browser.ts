import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Initialize the MSW worker
export async function initMsw() {
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
