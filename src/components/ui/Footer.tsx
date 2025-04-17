import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import ROUTES from '../../routes';
import { spacing } from '../../theme/themeUtils';
import { getStringContent } from '../../utils/translationUtils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { getContent: getCommonContent } = useLocalizedContent('common');
  const { getContent: getNavContent } = useLocalizedContent('navigation');

  const translations = {
    tagline: getCommonContent<string>('footer.tagline'),
    navigation: getCommonContent<string>('footer.navigation'),
    contact: getCommonContent<string>('footer.contact'),
    rights: getCommonContent<string>('footer.rights'),
    privacy: getCommonContent<string>('footer.links.privacy'),
    terms: getCommonContent<string>('footer.links.terms'),
    contactInfo: {
      email: getCommonContent<string>('footer.contactInfo.email'),
      phone: getCommonContent<string>('footer.contactInfo.phone'),
      address: getCommonContent<string>('footer.contactInfo.address'),
    },
    menu: {
      home: getNavContent<string>('menu.home'),
      services: getNavContent<string>('menu.services'),
      projects: getNavContent<string>('menu.projects'),
      contact: getNavContent<string>('menu.contact'),
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: spacing.xl,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={spacing.lg} justifyContent="space-between">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              RAIA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getStringContent(translations.tagline, 'footer.tagline')}
            </Typography>
          </Grid>

          {/* Second column - Navigation */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {getStringContent(translations.navigation, 'footer.navigation')}
            </Typography>
            <Box>
              <Link
                component={RouterLink}
                to={ROUTES.PUBLIC.HOME.path}
                color="inherit"
                display="block"
                sx={{ mb: 1 }}
              >
                {getStringContent(
                  translations.menu.home,
                  'navigation.menu.home'
                )}
              </Link>
              <Link
                component={RouterLink}
                to={ROUTES.PUBLIC.SERVICES.path}
                color="inherit"
                display="block"
                sx={{ mb: 1 }}
              >
                {getStringContent(
                  translations.menu.services,
                  'navigation.menu.services'
                )}
              </Link>
              <Link
                component={RouterLink}
                to={ROUTES.PUBLIC.PROJECTS.path}
                color="inherit"
                display="block"
                sx={{ mb: 1 }}
              >
                {getStringContent(
                  translations.menu.projects,
                  'navigation.menu.projects'
                )}
              </Link>
              <Link
                component={RouterLink}
                to={ROUTES.PUBLIC.CONTACT.path}
                color="inherit"
                display="block"
              >
                {getStringContent(
                  translations.menu.contact,
                  'navigation.menu.contact'
                )}
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {getStringContent(translations.contact, 'footer.contact')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: {translations.contactInfo.email || 'info@raia.com'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {translations.contactInfo.phone || '+1 234 567 8900'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: spacing.lg }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} RAIA.{' '}
            {getStringContent(translations.rights, 'footer.rights')}
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mx: spacing.xs }}>
              {getStringContent(translations.privacy, 'footer.links.privacy')}
            </Link>
            <Link href="#" color="inherit" sx={{ mx: spacing.xs }}>
              {getStringContent(translations.terms, 'footer.links.terms')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
