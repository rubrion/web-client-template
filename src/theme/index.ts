export * from './colors';
export { default as darkTheme } from './darkTheme';
export { default as lightTheme } from './lightTheme';
export * from './themeUtils';

// Add a single import point for theme-related constants
export const themeConstants = {
  spacing: require('./themeUtils').spacing,
  borderRadius: require('./themeUtils').borderRadius,
  shadows: require('./themeUtils').shadows,
  gridSizes: require('./themeUtils').gridSizes,
  transitions: require('./themeUtils').transitions,
  sectionPadding: require('./themeUtils').sectionPadding,
  colors: {
    ...require('./colors').primaryColors,
    ...require('./colors').slateColors,
    ...require('./colors').semanticColors,
    ...require('./colors').commonColors,
    ...require('./colors').overlayColors,
  },
};
