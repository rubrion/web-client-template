import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import React, { useCallback } from 'react';

// Custom KeyboardArrowDown icon to avoid dependency on @mui/icons-material
const KeyboardArrowDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
      fill="currentColor"
    />
  </svg>
);

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  backgroundOverlayOpacity?: number;
  backgroundPosition?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonColor?: 'primary' | 'secondary' | 'inherit';
  buttonVariant?: 'contained' | 'outlined' | 'text';
  contentAlign?: 'left' | 'center' | 'right';
  fullHeight?: boolean;
  nextSectionId?: string;
  videoBackground?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = 'Welcome to Business Solutions',
  subtitle = 'Professional business solutions tailored to your needs',
  backgroundImage = '/images/hero-bg.jpg',
  backgroundOverlay = true,
  backgroundOverlayOpacity = 0.5,
  backgroundPosition = 'center',
  backgroundColor = '#0f172a',
  textColor = '#ffffff',
  buttonText = 'Learn More',
  buttonLink = '#services',
  buttonColor = 'primary',
  buttonVariant = 'contained',
  contentAlign = 'center',
  fullHeight = true,
  nextSectionId = 'content',
  videoBackground,
}) => {
  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [nextSectionId]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh', // Force 100vh height
        minHeight: '100vh', // Ensure minimum height is also 100vh
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor,
        backgroundImage: backgroundImage && !videoBackground ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition,
        color: textColor,
      }}
    >
      {/* Video background if provided */}
      {videoBackground && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      )}

      {/* Background overlay */}
      {backgroundOverlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: `rgba(0, 0, 0, ${backgroundOverlayOpacity})`,
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: contentAlign,
        }}
      >
        <Box
          sx={{
            maxWidth: contentAlign === 'center' ? '800px' : '600px',
            mx: contentAlign === 'center' ? 'auto' : 0,
            mr: contentAlign === 'right' ? 0 : undefined,
            ml: contentAlign === 'left' ? 0 : undefined,
          }}
          className="fade-in"
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 400,
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {subtitle}
          </Typography>

          {buttonText && (
            <Button
              variant={buttonVariant}
              color={buttonColor}
              size="large"
              href={buttonLink}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </Container>

      {/* Scroll down arrow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateY(0) translateX(-50%)',
            },
            '40%': {
              transform: 'translateY(-20px) translateX(-50%)',
            },
            '60%': {
              transform: 'translateY(-10px) translateX(-50%)',
            },
          },
        }}
        onClick={scrollToNext}
      >
        <IconButton
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            color: textColor,
            width: 48,
            height: 48,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Hero;
