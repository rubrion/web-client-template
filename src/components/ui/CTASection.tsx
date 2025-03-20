import { Box, Button, Container } from '@mui/material';
import React from 'react';

import SectionHeader from './SectionHeader';

interface CTASectionProps {
  overline: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary';
  onButtonClick?: () => void;
  children?: React.ReactNode; // Make children optional
  my?: number;
}

const CTASection: React.FC<CTASectionProps> = ({
  overline,
  title,
  subtitle,
  buttonText,
  buttonVariant = 'secondary',
  onButtonClick,
  children,
  my = 8,
}) => {
  return (
    <Container maxWidth="lg" sx={{ my }}>
      <SectionHeader overline={overline} title={title} subtitle={subtitle} />
      {children && <Box sx={{ textAlign: 'center' }}>{children}</Box>}
      {buttonText && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color={buttonVariant}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CTASection;
