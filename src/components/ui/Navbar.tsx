import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../../routes'; // Import your routes configuration

interface NavItem {
  label: string;
  path: string;
}

interface NavbarProps {
  transparent?: boolean;
  logoSrc?: string;
  logoText?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', path: ROUTES.PUBLIC.HOME.path },
  { label: 'Portfolio', path: ROUTES.PUBLIC.PORTFOLIO.path },
  { label: 'Blog', path: ROUTES.BLOG.LIST.path },
  { label: 'Services', path: ROUTES.PUBLIC.SERVICES.path },
  { label: 'Contact', path: ROUTES.PUBLIC.CONTACT.path },
];

const Navbar: React.FC<NavbarProps> = ({
  transparent = false,
  logoSrc = '/group-1-1.svg',
  logoText = 'Start',
  navItems = defaultNavItems,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {logoText}
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                py: 1.5,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.light}14`,
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: transparent ? 'transparent' : 'primary.main',
          paddingTop: '64px' // Add padding-top to ensure consistency
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img width={70} height={48} alt="Logo" src={logoSrc} />
              <Typography
                variant="h4"
                sx={{ fontWeight: 500, color: 'primary.contrastText' }}
              >
                {logoText}
              </Typography>
            </Box>
            {isMobile ? (
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box component="nav">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{ color: 'primary.contrastText', mx: 1 }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
