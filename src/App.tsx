import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Footer from './components/ui/Footer';
import LogoAnimation from './components/ui/LogoAnimation';
import ScrollToTop from './components/ui/ScrollToTop';
import AppRoutes from './routes/routes';
import lightTheme from './theme/lightTheme';

const AppContent: React.FC = () => {
  return (
    <div id="root">
      <main id="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  // Animation control states
  const [showAnimation, setShowAnimation] = useState(() => {
    // Check if we've shown the animation in this session
    const hasShownAnimation = sessionStorage.getItem('animationShown');
    return hasShownAnimation !== 'true';
  });
  const [contentLoaded, setContentLoaded] = useState(false);
  const [animationStartedFading, setAnimationStartedFading] = useState(false);

  // Preload the content
  useEffect(() => {
    // Mark content as loaded after a short delay to allow the app to render
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 1000); // Give more time to ensure content is actually ready

    return () => clearTimeout(timer);
  }, []);

  // When animation completes, mark it as shown
  const handleAnimationComplete = () => {
    // First mark that animation started fading
    setAnimationStartedFading(true);

    // After animation completes, update session storage
    setTimeout(() => {
      setShowAnimation(false);
      sessionStorage.setItem('animationShown', 'true');
    }, 350); // Slightly shorter than the animation duration for a smoother transition
  };

  // Determine visibility for main content
  // We want it visible but opacity 0 while animation is shown
  // Then a smooth transition to opacity 1 as animation fades out
  const mainContentStyle = {
    position: 'relative' as const,
    height: '100%',
    opacity: animationStartedFading ? 1 : 0,
    transition: 'opacity 0.5s ease-in',
    zIndex: animationStartedFading ? 1 : 0,
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      {/* Always render the main app content */}
      <div style={mainContentStyle}>
        <Router>
          <ScrollToTop>
            <AppContent />
          </ScrollToTop>
        </Router>
      </div>

      {/* Show animation overlay if needed */}
      {showAnimation && (
        <LogoAnimation
          onAnimationComplete={handleAnimationComplete}
          isContentLoaded={contentLoaded}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
