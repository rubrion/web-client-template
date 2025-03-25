import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { spacing } from '../../theme/themeUtils';

// Define social media icons
const defaultSocialIcons = [
  { src: 'facebook-ico.svg', alt: 'Social Icon' },
  { src: 'instagram-ico.svg', alt: 'Social Icon' },
  { src: 'twitter-ico.svg', alt: 'Social Icon' },
  { src: 'pinterest-ico.svg', alt: 'Social Icon' },
  { src: 'tiktok-ico.svg', alt: 'Social Icon' },
  { src: 'whatsapp-ico.svg', alt: 'Social Icon' },
  { src: 'youtube-ico.svg', alt: 'Social Icon' },
];

interface FooterProps {
  socialIcons?: Array<{ src: string; alt: string }>;
  copyrightText?: string;
}

const Footer: React.FC<FooterProps> = ({
  socialIcons = defaultSocialIcons,
  copyrightText = '© Start, 2025. All rights reserved.',
}) => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        py: 4,
        pb: { xs: `calc(env(safe-area-inset-bottom) + 16px)`, sm: spacing.sm },
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
