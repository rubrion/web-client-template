// Assuming there's a main.tsx file, here's how you would update it to set the MSW flag

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { initMsw } from './mocks/browser';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Initialize MSW in development
async function bootstrap() {
  if (import.meta.env.DEV) {
    await initMsw();
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

bootstrap();
