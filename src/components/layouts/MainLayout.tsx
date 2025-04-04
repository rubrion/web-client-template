import { Box, Container } from '@mui/material';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disablePadding?: boolean;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  maxWidth = 'lg',
  disablePadding = false,
  fullWidth = false,
}) => {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {disablePadding ? (
        <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
      ) : (
        <Container
          maxWidth={fullWidth ? false : maxWidth}
          disableGutters={fullWidth}
          sx={{
            py: 4,
            flex: 1,
            width: '100%',
            maxWidth: fullWidth ? '100% !important' : undefined,
          }}
        >
          {children}
        </Container>
      )}
    </Box>
  );
};

export default MainLayout;
