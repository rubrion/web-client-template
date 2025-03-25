import { Box, Container, ContainerProps } from '@mui/material';
import React from 'react';

import SectionHeader, { SectionHeaderProps } from './SectionHeader';

export interface SectionProps extends SectionHeaderProps {
  id?: string;
  maxWidth?: ContainerProps['maxWidth'];
  spacing?: number;
  children?: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  py?: number;
}

const Section: React.FC<SectionProps> = ({
  id,
  overline,
  title,
  subtitle,
  align = 'center',
  maxWidth = 'lg',
  spacing = 6,
  backgroundColor,
  backgroundImage,
  py = 6,
  children,
}) => {
  return (
    <Box
      id={id}
      sx={{
        py,
        backgroundColor,
        backgroundImage: backgroundImage
          ? `url('${backgroundImage}')`
          : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
      }}
    >
      <Container maxWidth={maxWidth}>
        <SectionHeader
          overline={overline}
          title={title}
          subtitle={subtitle}
          align={align}
        />
        {children && <Box sx={{ mt: spacing }}>{children}</Box>}
      </Container>
    </Box>
  );
};

export default Section;
