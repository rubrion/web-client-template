import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme as useAppTheme } from '../../context/useTheme';

// Menu Icon as a simple SVG component to avoid dependency on @mui/icons-material
const MenuIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12h18M3 6h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Logo component
const Logo: React.FC = () => {
  const theme = useTheme();

  return (
    <Typography
      variant="h6"
      component={RouterLink}
      to="/"
      sx={{
        fontWeight: 700,
        color: 'inherit',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Business Solutions
    </Typography>
  );
};

interface NavbarProps {
  transparent?: boolean;
}

const pages = ['Home', 'About', 'Services', 'Contact'];

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const theme = useTheme();
  const { themeMode } = useAppTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      elevation={transparent ? 0 : 2}
      sx={{
        background: transparent
          ? 'transparent'
          : theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Logo />
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Logo />
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ mx: 1, my: 2, color: 'inherit', display: 'block' }}
                component={RouterLink}
                to={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right side of navbar - can add actions here */}
          <Box sx={{ flexGrow: 0 }}>
            {/* Optional: Add user menu or other controls here */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
