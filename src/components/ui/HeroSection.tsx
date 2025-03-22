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

import Navbar from './Navbar'; // Import Navbar component

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
  height: 'calc(100vh - 64px - 64px)', // Adjust height to account for Navbar height and additional space
  maxHeight: 'calc(100vh - 64px - 64px)', // Set maximum height to the viewport height minus Navbar height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Align components at the top
  alignItems: 'flex-start', // Ensure elements are positioned at the top
  overflow: 'hidden', // Ensure content does not overflow
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px - 56px)', // Adjust height for smaller screens
    maxHeight: 'calc(100vh - 56px - 56px)', // Set maximum height for smaller screens
  },
}));

const ArrowDown = styled('div')<{ show: boolean }>(({ theme, show }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  cursor: 'pointer',
  opacity: show ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
  visibility: show ? 'visible' : 'hidden',
  animation: show ? 'bounce 2s infinite' : 'none',
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
  overline = 'WELCOME',
  buttonVariant = 'secondary',
  imageSrc,
  buttons = [],
}) => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);

  const handleScroll = () => {
    if (heroRef.current) {
      window.scrollTo({
        top: heroRef.current.offsetTop + heroRef.current.offsetHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleWindowScroll = () => {
    if (heroRef.current) {
      const heroMiddle =
        heroRef.current.offsetTop + heroRef.current.offsetHeight / 2;
      if (window.scrollY > heroMiddle) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    }
  };

  useEffect(() => {
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
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: theme.typography.overline.letterSpacing }}
              >
                {overline}
              </Typography>
              <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.75 }}>
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
              size={{ xs: 12, md: 6 }}
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
