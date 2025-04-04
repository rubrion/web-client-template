import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { darkTheme, lightTheme } from '../theme';
import { ThemeContextType, ThemeMode } from './ThemeContextTypes';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme from localStorage or use system preference or default to dark
  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return 'light';
    }

    return 'dark'; // Default to dark
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // Default value before useEffect runs

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'light' : 'dark';
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setThemeMode(newMode);
      }
    };

    // Add listener for system preference changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }

    // Set the initial theme after mount
    setThemeMode(getInitialTheme());

    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', themeMode);
    // Add or remove a CSS class on the html element for global styles
    document.documentElement.setAttribute('data-theme', themeMode);

    // Add transition class for smooth theme changes
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300); // Match this with the CSS transition duration
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, setThemeMode }}>
      <MUIThemeProvider theme={currentTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export the context for useTheme hook
export { ThemeContext };
