import './i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

async function prepareApp() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('./mocks/browser');

      try {
        await worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: '/mockServiceWorker.js',
            options: { scope: '/' },
          },
        });
        console.log('🔶 Mock Service Worker initialized successfully');
      } catch (mswError) {
        console.error('Failed to start MSW:', mswError);
      }
    } catch (error) {
      console.error('Failed to initialize Mock Service Worker', error);
    }
  }

  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Could not find root element to mount React app');
    const fallbackRoot = document.createElement('div');
    fallbackRoot.id = 'root';
    document.body.appendChild(fallbackRoot);
    console.warn('Created fallback root element');

    const errorRoot = ReactDOM.createRoot(fallbackRoot);
    errorRoot.render(
      <div
        style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          color: '#721c24',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          margin: '20px',
        }}
      >
        <h2>Application Error</h2>
        <p>
          The application could not initialize properly. Could not find the root
          element.
        </p>
        <p>Please check your HTML template for an element with id="root".</p>
      </div>
    );
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render React application:', error);
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.margin = '20px';
    errorDiv.style.fontFamily = 'Arial, sans-serif';
    errorDiv.style.color = '#721c24';
    errorDiv.style.backgroundColor = '#f8d7da';
    errorDiv.style.border = '1px solid #f5c6cb';
    errorDiv.style.borderRadius = '4px';

    errorDiv.innerHTML = `
      <h2>Application Error</h2>
      <p>The application failed to initialize properly.</p>
      <p>Please check the console for detailed error information.</p>
    `;

    rootElement.appendChild(errorDiv);
  }
}

prepareApp().catch((error) => {
  console.error('Critical application initialization error:', error);

  const errorMessage = document.createElement('div');
  errorMessage.style.padding = '20px';
  errorMessage.style.margin = '20px';
  errorMessage.style.fontFamily = 'Arial, sans-serif';
  errorMessage.style.color = '#721c24';
  errorMessage.style.backgroundColor = '#f8d7da';
  errorMessage.style.border = '1px solid #f5c6cb';
  errorMessage.style.borderRadius = '4px';

  errorMessage.innerHTML = `
    <h2>Critical Application Error</h2>
    <p>The application could not be initialized.</p>
    <p>Error: ${error?.message || 'Unknown error'}</p>
  `;

  document.body.appendChild(errorMessage);
});
