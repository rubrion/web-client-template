import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  delay?: number;
}

export const useScrollTo = (options: ScrollOptions = {}) => {
  const location = useLocation();
  const { 
    behavior = 'smooth', 
    block = 'start', 
    delay = 100 
  } = options;

  const scrollToElement = (elementId: string): boolean => {
    const element = document.getElementById(elementId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior, block });
      }, delay);
      return true;
    }
    return false;
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior });
  };
  
  // For direct usage with navigation
  const getScrollParams = (elementId: string): string => {
    return `?scrollTo=${elementId}`;
  };

  const getScrollToTopParams = (): string => {
    return '?scrollToTop=true';
  };

  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');
    
    if (scrollToId) {
      // Attempt to scroll to the element
      const success = scrollToElement(scrollToId);
      
      // If element not found immediately, try again after a longer delay
      // This helps with elements that might load dynamically
      if (!success) {
        setTimeout(() => {
          scrollToElement(scrollToId);
        }, 500);
      }
    }
  }, [location.pathname, location.search]);

  // Return functions for manual control
  return {
    scrollToElement,
    scrollToTop,
    getScrollParams,
    getScrollToTopParams
  };
};
