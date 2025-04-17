import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';

const NotFound: React.FC = () => {
  const { t } = useTranslation('screens');

  return (
    <BaseLayout>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {t('notFound.title', '404 - Page Not Found')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t(
            'notFound.message',
            'Sorry, the page you are looking for does not exist.'
          )}
        </Typography>
        <Button
          component={Link}
          to={ROUTES.PUBLIC.HOME.path}
          variant="contained"
          color="primary"
        >
          {t('notFound.returnHome', 'Return to Home Page')}
        </Button>
      </Container>
    </BaseLayout>
  );
};

export default NotFound;
