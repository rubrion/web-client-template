import ROUTES from '../routes';

/**
 * Creates a route with a scroll target parameter
 *
 * @param path Base route path
 * @param scrollTarget ID of element to scroll to
 * @returns Route with scroll parameter
 */
export const createScrollRoute = (
  path: string,
  scrollTarget: string
): string => {
  // Add a query parameter for scrolling
  return `${path}?scrollTo=${scrollTarget}`;
};

/**
 * Creates a route that will scroll to top when navigated to
 *
 * @param path Base route path
 * @returns Route with scroll to top parameter
 */
export const createScrollToTopRoute = (path: string): string => {
  return `${path}?scrollToTop=true`;
};

/**
 * Extracts scroll target from URL
 *
 * @param search URL search string (query parameters)
 * @returns scroll target ID or null
 */
export const getScrollTargetFromURL = (search: string): string | null => {
  const params = new URLSearchParams(search);
  return params.get('scrollTo');
};

/**
 * Checks if URL has scrollToTop parameter
 *
 * @param search URL search string (query parameters)
 * @returns boolean indicating if should scroll to top
 */
export const shouldScrollToTop = (search: string): boolean => {
  const params = new URLSearchParams(search);
  return params.has('scrollToTop');
};

/**
 * Scrolls to an element by ID
 *
 * @param elementId The ID of the element to scroll to
 * @param options Scroll behavior options
 */
export const scrollToElement = (
  elementId: string,
  options?: ScrollIntoViewOptions
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  } else {
    console.warn(`Element with ID ${elementId} not found for scrolling`);
  }
};

/**
 * Pages that have a hero section at the top
 * These are used by both Navbar and BaseLayout components
 */
export const HERO_PAGES = [
  ROUTES.PUBLIC.HOME.path,
  ROUTES.BLOG.ROOT.path,
  ROUTES.BLOG.LIST.path,
  ROUTES.BLOG.LIST_PAGED_STATIC,
  ROUTES.PROJECTS.ROOT.path,
  ROUTES.PROJECTS.LIST.path,
  ROUTES.PROJECTS.LIST_PAGED_STATIC,
];

/**
 * Helper function to check if a path matches any hero page path pattern
 * @param currentPath The current route path to check
 * @returns boolean indicating if the path is for a page with a hero section
 */
export const isHeroPage = (currentPath: string): boolean => {
  return HERO_PAGES.some((heroPath) => {
    // For static paths, exact match
    if (!heroPath.includes(':')) {
      return currentPath === heroPath;
    }

    // For dynamic paths, check if it starts with the base path
    const basePath = heroPath.split('/:')[0];
    return currentPath.startsWith(basePath);
  });
};
