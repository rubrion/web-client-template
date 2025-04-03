import './App.css';

import { HelmetProvider } from 'react-helmet-async';

import AppRouter from './routes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
