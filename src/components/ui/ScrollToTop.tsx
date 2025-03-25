import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
    children: React.ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Only scroll to top if there are no scroll-related params in the URL
        const params = new URLSearchParams(location.search);
        const hasScrollParams = params.has('scrollTo') || params.has('scrollToTop');

        if (!hasScrollParams) {
            // Maintain scroll position on regular navigation
            return;
        }

        // Only scroll to top when explicitly requested with scrollToTop=true
        if (params.get('scrollToTop') === 'true') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }, [location.pathname, location.search]);

    return <>{children}</>;
};

export default ScrollToTop;
