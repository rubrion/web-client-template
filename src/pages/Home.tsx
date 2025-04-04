import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

import PageHelmet from '../components/PageHelmet';
import SectionContainer from '../components/ui/SectionContainer';
import Hero from '../components/ui/Hero';

const HomePage: React.FC = () => {
  return (
    <PageHelmet title="Home">
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Hero Section - Full Viewport Height */}
        <Hero
          title="Transform Your Business Today"
          subtitle="Professional business solutions that drive growth and innovation"
          backgroundImage="/images/hero-bg.jpg"
          buttonText="Get Started"
          buttonLink="#content"
          nextSectionId="content"
          backgroundOverlayOpacity={0.6}
        />

        {/* Main Content Section - The next section after Hero */}
        <Box id="content" sx={{ scrollMarginTop: '1rem' }}>
          <SectionContainer backgroundColor={theme => theme.palette.background.default} py={10}>
            <Container>
              <Typography 
                variant="h2" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 6,
                  fontWeight: 700
                }}
              >
                Our Services
              </Typography>
              
              <Grid container spacing={4}>
                {/* Service items */}
                {['Consulting', 'Development', 'Analytics', 'Support'].map((service) => (
                  <Grid item xs={12} md={6} lg={3} key={service}>
                    <Box 
                      sx={{ 
                        p: 3, 
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1,
                        height: '100%',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 3,
                        }
                      }}
                    >
                      <Typography variant="h5" sx={{ mb: 2 }}>{service}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Professional {service.toLowerCase()} services to help your business grow and adapt to changing markets.
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </SectionContainer>

          {/* Additional Section */}
          <SectionContainer 
            backgroundColor={theme => theme.palette.mode === 'dark' ? '#1a2942' : '#f1f5f9'} 
            py={10}
          >
            <Container>
              <Typography 
                variant="h2" 
                sx={{ 
                  textAlign: 'center',
                  mb: 6,
                  fontWeight: 700 
                }}
              >
                Why Choose Us?
              </Typography>

              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <img 
                    src="/images/business-team.jpg" 
                    alt="Business team" 
                    style={{ width: '100%', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" sx={{ mb: 3 }}>Expert Solutions for Modern Business</Typography>
                  <Typography variant="body1" paragraph>
                    Our team brings years of expertise and innovation to help your business thrive in today's competitive landscape.
                  </Typography>
                  <Typography variant="body1">
                    With a focus on results and client satisfaction, we develop customized strategies that address your specific needs and challenges.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </SectionContainer>
        </Box>
      </Box>
    </PageHelmet>
  );
};

export default HomePage;
