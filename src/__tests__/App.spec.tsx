import App from '../App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('renders the Vite + React heading', () => {
  render(<App />);
  const heading = screen.getByText(/Vite \+ React/i);
  expect(heading).toBeInTheDocument();
});
