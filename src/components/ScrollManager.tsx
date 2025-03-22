// ScrollManager.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        // Check if there's a targetId in the URL params
        const params = new URLSearchParams(search);
        const targetId = params.get('scrollTo');

        if (targetId) {
            // Wait a bit for the component to render
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Fallback to top if element not found
                    window.scrollTo(0, 0);
                }
            }, 100);
        } else {
            // Default behavior: scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname, search]);

    return null;
};

export default ScrollToTop;