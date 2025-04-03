import './App.css';

import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from './context/ThemeProvider';
import AppRouter from './routes';

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
