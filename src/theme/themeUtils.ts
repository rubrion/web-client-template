// src/theme/themeUtils.ts
import { Theme } from '@mui/material';

import {
  commonColors,
  overlayColors,
  primaryColors,
  semanticColors,
  slateColors,
} from './colors';

// Spacing scales
export const spacing = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
};

// Section padding values
export const sectionPadding = {
  y: {
    small: 4,
    medium: 8,
    large: 12,
  },
  x: {
    small: 2,
    medium: 4,
    large: 6,
  },
};

// Common grid layouts
export const gridSizes = {
  fullWidth: { xs: 12 },
  halfWidth: { xs: 12, sm: 6 },
  thirdWidth: { xs: 12, sm: 6, md: 4 },
  quarterWidth: { xs: 12, sm: 6, md: 3 },

  hero: {
    content: { xs: 12, md: 6 },
    image: { xs: 12, md: 6 },
  },

  responsive: {
    mobile: { xs: 12 },
    tablet: { xs: 12, sm: 6 },
    desktop: { xs: 12, sm: 6, md: 4 },
  },
};

// Border radius values
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: '50%',
};

// Shadow definitions
export const shadows = {
  card: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  cardHover: '0 15px 30px rgba(0, 0, 0, 0.1)',
  button: '0 8px 15px rgba(0, 0, 0, 0.1)',
  dropdown: '0 5px 15px rgba(0, 0, 0, 0.08)',
  none: 'none',
};

// Export overlay colors from color.ts to make them accessible
export { overlayColors } from './colors';

// Button sizes with consistent values
export const buttonSizes = {
  small: {
    padding: '8px 16px',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '10px 24px',
    fontSize: '1rem',
  },
  large: {
    padding: '12px 24px',
    fontSize: '1.125rem',
  },
};

// Common transitions
export const transitions = {
  fast: 'all 0.2s ease',
  medium: 'all 0.3s ease',
  slow: 'all 0.5s ease',
};

export const getSectionPadding = () => ({
  py: spacing.lg,
});

export const getCardShadow = () => ({
  boxShadow: shadows.card,
  transition: transitions.medium,
  '&:hover': {
    boxShadow: shadows.cardHover,
    transform: 'translateY(-5px)',
  },
});

export const breakpoints = {
  mobile: '@media (max-width: 600px)',
  tablet: '@media (max-width: 960px)',
  desktop: '@media (min-width: 961px)',
};

// Animation helpers
export const animationDurations = {
  short: 300,
  medium: 500,
  long: 1000,
};

export const animations = {
  fadeIn: {
    opacity: 0,
    y: 20,
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.6,
    },
  },
  fadeInRight: {
    opacity: 0,
    x: -20,
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      duration: 0.5,
    },
  },
  fadeInLeft: {
    opacity: 0,
    x: 20,
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      duration: 0.5,
    },
  },
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    animate: {
      opacity: 1,
      scale: 1,
    },
    transition: {
      duration: 0.5,
    },
  },
  floating: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Function to get contrasting text color based on background
export const getContrastText = (backgroundColor: string) => {
  // Simple implementation - for a full solution, calculate color luminance
  return backgroundColor.startsWith('#') && backgroundColor.length >= 7
    ? parseInt(backgroundColor.slice(1, 7), 16) > 0xffffff / 2
      ? commonColors.black
      : commonColors.white
    : commonColors.white;
};

// Themed helper to get specific color value from theme or fallback to colors constants
export const getThemeValue = (
  theme: Theme,
  path: string,
  fallback?: string
): string => {
  try {
    // Split path by dots (e.g., "primary.main")
    const parts = path.split('.');

    // Start with theme.palette
    let value: any = theme.palette;

    // Navigate through the path
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // Path doesn't exist in theme, try to get from color constants
        return getColorConstant(path) || fallback || slateColors[500];
      }
    }

    return typeof value === 'string' ? value : fallback || slateColors[500];
  } catch (error) {
    console.warn(`Error getting theme value for path: ${path}`, error);
    return fallback || slateColors[500];
  }
};

// Helper function to get color from constants
function getColorConstant(path: string): string | undefined {
  const parts = path.split('.');

  // Define the roots to search
  const colorRoots: Record<string, any> = {
    primary: primaryColors,
    slate: slateColors,
    semantic: semanticColors,
    overlay: overlayColors,
    common: commonColors,
  };

  // Try to find the color in our constants
  const rootKey = parts[0];
  if (rootKey in colorRoots) {
    let value = colorRoots[rootKey];
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return undefined;
      }
    }
    return typeof value === 'string' ? value : undefined;
  }

  return undefined;
}
