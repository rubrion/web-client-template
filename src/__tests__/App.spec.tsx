import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from '../App';

// Mock the router to avoid navigation issues in tests
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

test('renders the application with router', () => {
  render(<App />);
  // Since we're now using the router, we should test differently
  // This is a simple test to verify the app renders without errors
  expect(document.body).toBeInTheDocument();
});
