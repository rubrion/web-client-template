import { Box, Container } from '@mui/material';
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  noPadding?: boolean;
}

/**
 * PageLayout component
 *
 * Use this for consistent page layout with proper width handling.
 * - fullWidth=true removes container width limits
 * - noPadding=true removes the default padding
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = 'lg',
  fullWidth = false,
  noPadding = false,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {fullWidth ? (
        // Full width content
        <Box
          sx={{
            width: '100%',
            padding: noPadding ? 0 : undefined,
            flex: 1,
          }}
        >
          {children}
        </Box>
      ) : (
        // Centered content with maxWidth
        <Container
          maxWidth={maxWidth}
          disableGutters={noPadding}
          sx={{
            py: noPadding ? 0 : 4,
            px: noPadding ? 0 : undefined,
            flex: 1,
          }}
        >
          {children}
        </Container>
      )}
    </Box>
  );
};

export default PageLayout;
