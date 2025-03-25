import { Box, Button, ButtonProps } from '@mui/material';
import React from 'react';

import Section, { SectionProps } from './Section';

interface CTASectionProps extends SectionProps {
  buttonText?: string;
  buttonVariant?: 'contained' | 'outlined' | 'text';
  buttonColor?: ButtonProps['color'];
  onButtonClick?: () => void;
  buttonPosition?: 'top' | 'bottom';
}

const CTASection: React.FC<CTASectionProps> = ({
  buttonText,
  buttonVariant = 'contained',
  buttonColor = 'primary',
  onButtonClick,
  buttonPosition = 'bottom',
  children,
  ...sectionProps
}) => {
  const buttonComponent = buttonText ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Button
        variant={buttonVariant}
        color={buttonColor}
        onClick={onButtonClick}
        size="large"
      >
        {buttonText}
      </Button>
    </Box>
  ) : null;

  return (
    <Section {...sectionProps}>
      {buttonPosition === 'top' && buttonComponent}
      {children}
      {buttonPosition === 'bottom' && buttonComponent}
    </Section>
  );
};

export default CTASection;
