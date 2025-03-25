// src/theme/themeUtils.ts
import { Theme } from '@mui/material';

export const spacing = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
};

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

export const buttonSizes = {
  small: {
    padding: '8px 16px',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '10px 20px',
    fontSize: '1rem',
  },
  large: {
    padding: '12px 24px',
    fontSize: '1.125rem',
  },
};

export const getSectionPadding = (theme: Theme) => ({
  py: theme.spacing(spacing.lg),
});

export const getCardShadow = (theme: Theme) => ({
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
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

// Function to get contrasting text color based on background
export const getContrastText = (backgroundColor: string) => {
  // Simple implementation - for a full solution, calculate color luminance
  return backgroundColor.startsWith('#') && backgroundColor.length >= 7
    ? parseInt(backgroundColor.slice(1, 7), 16) > 0xffffff / 2
      ? '#000000' 
      : '#ffffff'
    : '#ffffff';
};
