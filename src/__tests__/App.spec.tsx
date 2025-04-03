import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import App from '../App';

// Mock the context and router to avoid navigation and theme issues in tests
vi.mock('../context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock('react-router-dom', () => ({
  createBrowserRouter: vi.fn(() => ({})),
  RouterProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="router">{children}</div>
  ),
}));

describe('App component', () => {
  test('renders the application with router', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeInTheDocument();
  });
});
