import { Box, Container, Typography } from '@mui/material';
import React from 'react';

// Define social media icons
const defaultSocialIcons = [
  { src: 'group-33.svg', alt: 'Social Icon' },
  { src: 'group-34.svg', alt: 'Social Icon' },
  { src: 'group-35.svg', alt: 'Social Icon' },
  { src: 'group-36.svg', alt: 'Social Icon' },
  { src: 'group-37.svg', alt: 'Social Icon' },
  { src: 'group-38.svg', alt: 'Social Icon' },
  { src: 'group-39.svg', alt: 'Social Icon' },
];

interface FooterProps {
  socialIcons?: Array<{ src: string; alt: string }>;
  copyrightText?: string;
}

const Footer: React.FC<FooterProps> = ({
  socialIcons = defaultSocialIcons,
  copyrightText = '© Start, 2022. All rights reserved.',
}) => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        py: 4,
        pb: { xs: `calc(env(safe-area-inset-bottom) + 16px)`, sm: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 3, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {socialIcons.map((icon, index) => (
              <img
                key={index}
                height={18}
                alt={icon.alt}
                src={icon.src}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.contrastText',
              textAlign: { xs: 'center', sm: 'right' },
            }}
          >
            {copyrightText}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
