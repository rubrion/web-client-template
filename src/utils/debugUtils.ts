import { IS_MOCK, USE_FIRESTORE } from '../config';

/**
 * Debug utility to log data source information
 */
export function logDataSourceInfo() {
  if (import.meta.env.DEV) {
    const style =
      'background: #333; color: white; padding: 2px 5px; border-radius: 2px;';

    console.group('%c[Data Source Info]', style);

    // Simplified data source display
    console.log('Active Data Source:', IS_MOCK ? 'Mock (MSW)' : 'API');
    if (!IS_MOCK) {
      console.log('API Type:', USE_FIRESTORE ? 'Firestore DB' : 'REST API');
    }

    console.log('Configuration Flags:', {
      IS_MOCK,
      USE_FIRESTORE,
      MSW_ACTIVE: window.__IS_MSW_ACTIVE__,
    });

    console.log('Local Storage Settings:', {
      useMSW: localStorage.getItem('useMSW'),
      dataSource: localStorage.getItem('dataSource'),
    });

    console.log('Environment Variables:', {
      API_URL: import.meta.env.VITE_API_URL || 'Not set',
      USE_FIRESTORE_ENV: import.meta.env.VITE_USE_FIRESTORE || 'Not set',
      FIREBASE_CONFIG: import.meta.env.VITE_FIREBASE_CONFIG ? 'Set' : 'Not set',
    });

    console.groupEnd();
  }
}

/**
 * Install debug hooks to monitor network activity
 */
export function installNetworkDebugHooks() {
  if (import.meta.env.DEV && localStorage.getItem('debugMode') === 'true') {
    const originalFetch = window.fetch;

    // Replace fetch with our instrumented version
    window.fetch = async function (...args) {
      const url = args[0];
      // Fix: Safely extract URL string from various types fetch accepts
      const urlString =
        typeof url === 'string'
          ? url
          : url instanceof Request
            ? url.url
            : url instanceof URL
              ? url.toString()
              : String(url);

      console.log(`%c[Network] Fetch: ${urlString}`, 'color: #2196f3');

      try {
        const response = await originalFetch.apply(this, args);
        return response;
      } catch (error) {
        // Fix: Safely extract error message from unknown type
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        console.error(
          `%c[Network] Fetch Error: ${errorMessage}`,
          'color: #f44336'
        );
        throw error;
      }
    };

    console.log('%c[Debug] Network monitoring installed', 'color: #4caf50');
  }
}
