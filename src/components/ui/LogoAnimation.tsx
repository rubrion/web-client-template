import { Box, keyframes, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface LogoAnimationProps {
  onAnimationComplete: () => void;
  duration?: number;
  isContentLoaded: boolean;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({
  onAnimationComplete,
  duration = 2500,
  isContentLoaded,
}) => {
  const theme = useTheme();
  const [show, setShow] = useState(true);
  const [showText, setShowText] = useState(false);

  // Animation keyframes
  const fadeIn = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `;

  const fadeOut = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

  const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  `;

  const progressAnim = keyframes`
    0% {
      left: -30%;
    }
    100% {
      left: 100%;
    }
  `;

  // Show the text after a delay
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 500); // Show text sooner for better feedback

    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    // Always start animation timer, but make it shorter if content is already loaded
    const timer = setTimeout(
      () => {
        setShow(false);
        onAnimationComplete();
      },
      isContentLoaded ? Math.min(duration, 1500) : duration
    );

    return () => clearTimeout(timer);
  }, [duration, onAnimationComplete, isContentLoaded]);

  // Create proper background color based on theme
  const backgroundColor =
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark // Darker blue for dark mode
      : theme.palette.primary.main; // Regular blue for light mode

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor, // Use the theme-appropriate background color
        zIndex: 9999,
        opacity: 1,
        animation: show ? 'none' : `${fadeOut} 0.4s ease-out forwards`,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Logo Container */}
        <Box
          sx={{
            width: '180px',
            height: '180px',
            position: 'relative',
            animation: `${bounce} 2s ease-in-out infinite`,
            mb: 4,
          }}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              filter: 'brightness(0) invert(1)', // Always make logo white
            }}
          />
        </Box>

        {/* Simplified container with exact positioning */}
        <Box
          sx={{
            position: 'relative',
            height: '50px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Text element - now white for better contrast */}
          <Typography
            variant="h4"
            component="div"
            align="center"
            sx={{
              color: '#FFFFFF', // White text for best contrast
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              opacity: showText ? 1 : 0,
              visibility: showText ? 'visible' : 'hidden',
              animation: showText ? `${fadeIn} 0.8s ease-out forwards` : 'none',
              transition: 'opacity 0.5s ease-out',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Advancing AI in Brazil
          </Typography>

          {/* Loading Indicator - white for better contrast */}
          <Box
            sx={{
              position: 'absolute',
              opacity: showText ? 0 : 1,
              visibility: showText ? 'hidden' : 'visible',
              transition: 'opacity 0.5s ease-out',
              width: '240px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly more visible base
              borderRadius: '2px',
              overflow: 'hidden',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                backgroundColor: '#FFFFFF', // Pure white for the loading bar
                width: '30%',
                borderRadius: '2px',
                animation: `${progressAnim} 1s infinite linear`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LogoAnimation;
