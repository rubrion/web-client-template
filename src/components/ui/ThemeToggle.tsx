import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';

import { useTheme } from '../../context/useTheme';

// Simplified SVG components without framer-motion dependencies
const SunIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { themeMode, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Tooltip
      title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
      arrow
      enterDelay={500}
    >
      <div
        className={className}
        style={{
          transform: `scale(${isPressed ? 0.95 : isHovered ? 1.1 : 1})`,
          transition: 'transform 0.2s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label="toggle theme"
          sx={{
            p: 1.25,
            borderRadius: 1.5,
            transition: 'all 0.2s ease-in-out',
            background:
              themeMode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.04)',
            '&:hover': {
              background:
                themeMode === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              opacity: 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            {themeMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </div>
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default ThemeToggle;
