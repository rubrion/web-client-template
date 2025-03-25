import './App.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker
    .start({
      onUnhandledRequest: 'bypass',
    })
    .catch((error) => {
      console.error('Failed to start the mock service worker:', error);
    });
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
