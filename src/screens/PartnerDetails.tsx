import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection, Navbar } from '../components/ui';
import { useScrollTo } from '../hooks/useScrollTo';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';

const partners = [
  {
    id: 1,
    name: 'Partner One',
    logo: 'partner-logo-1.png',
    description: 'Partner One is a leading company in the tech industry.',
    website: 'https://www.partnerone.com',
  },
  {
    id: 2,
    name: 'Partner Two',
    logo: 'partner-logo-2.png',
    description: 'Partner Two specializes in innovative solutions.',
    website: 'https://www.partnertwo.com',
  },
  {
    id: 3,
    name: 'Partner Three',
    logo: 'partner-logo-3.png',
    description: 'Partner Three is known for its exceptional services.',
    website: 'https://www.partnerthree.com',
  },
];

const PartnerDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, []);

  return (
    <Box>
      <Navbar />

      <CTASection
        id="partners-section"
        overline="PARTNERS"
        title="Meet Our Partners"
        buttonText="Become Partner"
        onButtonClick={() => navigate(`${ROUTES.PUBLIC.CONTACT.path}?subject=partner`)}
      >
        <Grid2 container spacing={4}>
          {partners.map((partner) => (
            <Grid2 size={gridSizes.thirdWidth} key={partner.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 0,
                    paddingTop: '100%',
                    backgroundImage: `url(${partner.logo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {partner.name}
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                    {partner.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Website:</strong>{' '}
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {partner.website}
                    </a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
          Join us in building something great together
        </Typography>
      </CTASection>
    </Box>
  );
};

export default PartnerDetails;
