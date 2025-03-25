/**
 * Helper function to generate a URL with a scrollTo parameter
 * @param path The base route path
 * @param scrollTarget The ID of the element to scroll to
 * @returns The complete URL with scroll parameter
 */
export const createScrollRoute = (path: string, scrollTarget?: string): string => {
  if (!scrollTarget) return path;
  return `${path}?scrollTo=${scrollTarget}`;
};

/**
 * Helper function to generate a URL that will scroll to top
 * @param path The base route path
 * @returns The complete URL with scrollToTop parameter
 */
export const createScrollToTopRoute = (path: string): string => {
  return `${path}?scrollToTop=true`;
};

/**
 * Helper function to generate a URL with both scroll parameters and additional query parameters
 * @param path The base route path
 * @param params Additional query parameters as an object
 * @param scrollTarget The ID of the element to scroll to (optional)
 * @param scrollToTop Whether to scroll to top (optional)
 * @returns The complete URL with all parameters
 */
export const createRouteWithParams = (
  path: string, 
  params: Record<string, string> = {}, 
  scrollTarget?: string,
  scrollToTop?: boolean
): string => {
  const searchParams = new URLSearchParams();
  
  // Add all regular params
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  
  // Add scroll parameters
  if (scrollTarget) {
    searchParams.append('scrollTo', scrollTarget);
  }
  
  if (scrollToTop) {
    searchParams.append('scrollToTop', 'true');
  }
  
  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
};

/**
 * Helper function to determine if the current route should scroll to a section
 * @param search The location.search string
 * @returns Boolean indicating if scroll behavior should be triggered
 */
export const shouldHandleScroll = (search: string): boolean => {
  const params = new URLSearchParams(search);
  return params.has('scrollTo') || params.has('scrollToTop');
};
