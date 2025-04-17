import './i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense, useEffect } from 'react';

import LanguageUpdater from './components/translation/LanguageUpdater';
import LoadingIndicator from './components/ui/LoadingIndicator';
import { ContentProvider } from './context/ContentContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { TranslationProvider } from './context/TranslationContext';
import AppRoutes from './routes/routes';
import { setupAnimationControl } from './utils/animationUtils';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const debugStyles = `
.app-container img,
.app-container svg {
  visibility: visible !important;
  opacity: 1 !important;
}

.disable-animations * {
  transition: none !important;
  animation: none !important;
}

/* Prevent FOUC (Flash Of Unstyled Content) */
.app-container {
  opacity: 1;
  transition: opacity 0.15s ease-in;
}

.app-container--loading {
  opacity: 0;
}

/* Improve transitions between routes */
.page-transition-enter {
  opacity: 0;
}
.page-transition-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.page-transition-exit {
  opacity: 1;
}
.page-transition-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
`;

const App: React.FC = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = debugStyles;
    document.head.appendChild(styleElement);

    const cleanupAnimationControl = setupAnimationControl();

    // Add a class to the body during initial loading
    document.body.classList.add('app-loading');

    // Remove the loading class after a short delay
    const timeout = setTimeout(() => {
      document.body.classList.remove('app-loading');
    }, 100);

    return () => {
      document.head.removeChild(styleElement);
      cleanupAnimationControl();
      clearTimeout(timeout);
      document.body.classList.remove('app-loading');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TranslationProvider>
            <ContentProvider>
              <LanguageUpdater />
              <div className="app-container">
                <Suspense
                  fallback={
                    <LoadingIndicator
                      message="Loading application..."
                      fullHeight
                    />
                  }
                >
                  <AppRoutes />
                </Suspense>
              </div>
            </ContentProvider>
          </TranslationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
