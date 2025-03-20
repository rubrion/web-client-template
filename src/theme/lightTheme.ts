// theme.ts
import { createTheme } from '@mui/material/styles';

// Define your color palette
const palette = {
  primary: {
    main: '#74c69d',
    light: '#a5d8bc',
    dark: '#4b9e72',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#212529',
    light: '#495057',
    dark: '#0d0f11',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#f8f9fa',
  },
  text: {
    primary: '#212529',
    secondary: '#6c757d',
  },
};

// Create the theme
const lightTheme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    overline: {
      letterSpacing: '0.2em',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default lightTheme;
