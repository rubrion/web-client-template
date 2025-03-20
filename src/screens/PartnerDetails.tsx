import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Typography,
} from '@mui/material';
import React from 'react';

import { Navbar } from '../components/ui';

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
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Meet Our Partners
        </Typography>

        <Grid2 container spacing={4}>
          {partners.map((partner) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={partner.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
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
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {partner.name}
                  </Typography>
                  <Typography variant="body2" paragraph>
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
      </Container>
    </Box>
  );
};

export default PartnerDetails;
