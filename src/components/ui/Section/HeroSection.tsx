import {
  Box,
  Button,
  Container,
  Grid2,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { gridSizes } from '../../../theme/themeUtils';
import Navbar from '../Navbar'; // Import Navbar component

interface HeroSectionProps {
  title: string;
  subtitle: string;
  overline?: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary';
  imageSrc?: string;
  buttons?: { text: string; onClick?: () => void }[];
}

const StyledHeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  minHeight: '100vh', // Take full viewport height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'hidden',
}));

const ArrowDown = styled('div')<{ show: boolean }>(({ theme, show }) => ({
  position: 'fixed', // Change to fixed positioning
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  cursor: 'pointer',
  opacity: show ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
  visibility: show ? 'visible' : 'hidden',
  animation: show ? 'bounce 2s infinite' : 'none',
  zIndex: 10, // Ensure it's above other content
  '&::before': {
    content: '""',
    display: 'block',
    width: 24,
    height: 24,
    borderLeft: `4px solid ${theme.palette.common.white}`,
    borderBottom: `4px solid ${theme.palette.common.white}`,
    transform: 'rotate(-45deg)',
    marginBottom: theme.spacing(1),
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '50%': {
      transform: 'translateX(-50%) translateY(-10px)',
    },
  },
}));

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  overline,
  buttonVariant = 'secondary',
  imageSrc,
  buttons = [],
}) => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);

  const handleScroll = () => {
    // Always scroll to the next section after the hero
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      window.scrollTo({
        top: nextSection.getBoundingClientRect().top + window.pageYOffset,
        behavior: 'smooth',
      });
    } else {
      // If there's no next section, scroll to the end of the hero
      window.scrollTo({
        top: window.innerHeight, // Scroll one viewport height
        behavior: 'smooth',
      });
    }
  };

  const handleWindowScroll = () => {
    // Only show arrow when user is at the very top (scrollY === 0)
    setShowArrow(window.scrollY === 0);
  };

  useEffect(() => {
    // Set initial state based on scroll position
    setShowArrow(window.scrollY === 0);

    // Add event listener
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <StyledHeroSection ref={heroRef}>
        <Container maxWidth="lg">
          <Grid2 container spacing={8} sx={{ alignItems: 'flex-start' }}>
            {' '}
            {/* Align items at the top */}
            <Grid2 size={gridSizes.hero.content}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: theme.typography.overline.letterSpacing }}
              >
                {overline}
              </Typography>
              <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  opacity: 0.75,
                  whiteSpace: {
                    xs: 'normal',
                    md: imageSrc ? 'normal' : 'nowrap',
                  },
                  maxWidth: {
                    xs: '100%',
                    md: imageSrc ? '100%' : '90%',
                  },
                }}
              >
                {subtitle}
              </Typography>

              {buttons.length > 0 && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color={buttonVariant}
                      onClick={button.onClick}
                      sx={{
                        textTransform: 'none',
                        bgcolor: theme.palette.common.black,
                        color: theme.palette.common.white,
                        '&:hover': {
                          bgcolor: theme.palette.grey[900],
                        },
                      }}
                    >
                      {button.text}
                    </Button>
                  ))}
                </Box>
              )}
            </Grid2>
            {/* Right Section - Image */}
            <Grid2
              size={gridSizes.hero.image}
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  height: { xs: 250, md: 378 }, // Set specific height for the image container
                  width: '100%', // Ensure image fits within the container
                  alignSelf: 'flex-start', // Align image at the top
                }}
              />
            </Grid2>
          </Grid2>
        </Container>
        {showArrow && <ArrowDown show={showArrow} onClick={handleScroll} />}
      </StyledHeroSection>
    </>
  );
};

export default HeroSection;
