import { Box, Container } from '@mui/material';
import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  backgroundColor?: string;
  backgroundImage?: string;
  fullHeight?: boolean;
  py?: number;
  px?: number;
  disablePadding?: boolean;
}

/**
 * SectionContainer component
 *
 * Creates a full-width section with centered content.
 * Use this for alternating background colors/sections on landing pages.
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  maxWidth = 'lg',
  backgroundColor,
  backgroundImage,
  fullHeight = false,
  py = 8,
  px = 2,
  disablePadding = false,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
        minHeight: fullHeight ? '100vh' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        py: disablePadding ? 0 : py,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          px: disablePadding ? 0 : px,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default SectionContainer;
