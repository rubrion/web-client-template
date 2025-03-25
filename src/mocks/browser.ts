import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

console.log('MSW handlers registered:', handlers.length);
