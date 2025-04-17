import { useCallback } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offset?: number;
}

export const useScrollTo = () => {
  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}) => {
      const { behavior = 'smooth', offset = 0 } = options;

      setTimeout(() => {
        const element = document.getElementById(elementId);

        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior,
          });
        }
      }, 100);
    },
    []
  );

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  return { scrollToElement, scrollToTop };
};
