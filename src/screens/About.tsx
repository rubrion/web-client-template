import { Box, Container, Grid2 } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CTASection, HeroSection } from '../components/ui';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';
import { createScrollRoute } from '../utils/navigationUtils';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <HeroSection
        title="About Our Company"
        subtitle="Learn about our mission, values, and the team behind our success."
        overline="ABOUT US"
        buttons={[
          {
            text: 'Meet Our Team',
            onClick: () =>
              navigate(
                createScrollRoute(ROUTES.PUBLIC.TEAMDETAILS.path, 'team-details-section')
              ),
          },
        ]}
      />

      <Container id="our-story-section" maxWidth="lg" sx={{ my: 8 }}>
        <Grid2 container spacing={6}>
          <Grid2 size={gridSizes.halfWidth}>
            <Box>
              <h2>Our Story</h2>
              <p>
                Founded in 2020, our company has grown from a small startup to a
                leader in the industry. We believe in innovation, quality, and
                customer satisfaction.
              </p>
              <p>
                Our team consists of talented professionals who are passionate
                about creating exceptional products and services that make a
                difference in people's lives.
              </p>
            </Box>
          </Grid2>
          <Grid2 size={gridSizes.halfWidth}>
            <Box
              sx={{
                backgroundImage: `url('about-story.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 300,
                borderRadius: 2,
              }}
            />
          </Grid2>
        </Grid2>
      </Container>

      <CTASection
        overline="VALUES"
        title="What We Stand For"
        subtitle="Our core values guide everything we do\nand shape our company culture."
      >
        <Grid2 container spacing={4} justifyContent="center">
          {[
            {
              title: 'Innovation',
              description:
                'Constantly pushing boundaries and exploring new ideas.',
            },
            {
              title: 'Quality',
              description: 'Delivering excellence in everything we create.',
            },
            {
              title: 'Integrity',
              description:
                'Being honest, transparent, and ethical in all our actions.',
            },
            {
              title: 'Collaboration',
              description: 'Working together to achieve common goals.',
            },
          ].map((value, index) => (
            <Grid2 size={gridSizes.quarterWidth} key={index}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </CTASection>
    </Box>
  );
};

export default About;
