import {
  CssBaseline,
  PaletteMode,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import darkTheme from '../theme/darkTheme';
import lightTheme from '../theme/lightTheme';

interface ThemeContextType {
  themeMode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'dark',
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as PaletteMode | null;
    if (storedTheme) {
      setThemeMode(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    localStorage.setItem('theme', newThemeMode);
  };

  const theme = useMemo(() => {
    return themeMode === 'light' ? lightTheme : darkTheme;
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
