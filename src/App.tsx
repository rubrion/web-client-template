import './App.css';
import './index.css';

import { CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from './components/ui/Footer';
import LogoAnimation from './components/ui/LogoAnimation';
import ScrollToTop from './components/ui/ScrollToTop';
import ThemeToggle from './components/ui/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/routes';

const AppContent: React.FC = () => {
  return (
    <>
      {/* Theme Toggle Button - fixed position */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      {/* Main Content Area - fills available space */}
      <main className="main-content">
        <AppRoutes />
      </main>

      {/* Footer - always full width */}
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(() => {
    const hasShownAnimation = sessionStorage.getItem('animationShown');
    return hasShownAnimation !== 'true';
  });
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      sessionStorage.setItem('animationShown', 'true');
      const contentTimeout = setTimeout(() => {
        setShowAnimation(false);
        setContentLoaded(true);
      }, 3000);

      return () => clearTimeout(contentTimeout);
    } else {
      setContentLoaded(true);
    }
  }, [showAnimation]);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <ScrollToTop>
          <div className="app-root">
            {showAnimation && <LogoAnimation />}
            {contentLoaded && <AppContent />}
          </div>
        </ScrollToTop>
      </Router>
    </ThemeProvider>
  );
};

export default App;
