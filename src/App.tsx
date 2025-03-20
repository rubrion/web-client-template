import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from './components/ui/Footer';
import AppRoutes from './routes/routes';
import lightTheme from './theme/lightTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <div id="root">
          <main id="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
