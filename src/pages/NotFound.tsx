import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';

const NotFound: React.FC = () => {
  const { getRequiredContent } = useLocalizedContent('screens', 'notFound');

  // Get translation content and handle errors consistently
  const translations = {
    title: getRequiredContent<string>('title'),
    message: getRequiredContent<string>('message'),
    returnHome: getRequiredContent<string>('returnHome'),
  };

  return (
    <BaseLayout>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {translations.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {translations.message}
        </Typography>
        <Button
          component={Link}
          to={ROUTES.PUBLIC.HOME.path}
          variant="contained"
          color="primary"
        >
          {translations.returnHome}
        </Button>
      </Container>
    </BaseLayout>
  );
};

export default NotFound;
