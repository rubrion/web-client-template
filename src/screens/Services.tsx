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

import { CTASection, HeroSection, Navbar } from '../components/ui';

const services = [
  {
    id: 1,
    title: 'Web Development',
    icon: 'web-dev-icon.svg',
    description:
      'Custom websites and web applications tailored to your business needs.',
    features: [
      'Responsive Design',
      'E-commerce Solutions',
      'Content Management Systems',
    ],
  },
  {
    id: 2,
    title: 'Mobile App Development',
    icon: 'mobile-dev-icon.svg',
    description:
      'Native and cross-platform mobile applications for iOS and Android.',
    features: [
      'User-Friendly Interface',
      'Performance Optimization',
      'Offline Functionality',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    icon: 'design-icon.svg',
    description:
      'User-centered design solutions that enhance user experience and engagement.',
    features: ['User Research', 'Wireframing & Prototyping', 'Visual Design'],
  },
  {
    id: 4,
    title: 'Digital Marketing',
    icon: 'marketing-icon.svg',
    description:
      'Comprehensive digital marketing strategies to grow your online presence.',
    features: [
      'SEO Optimization',
      'Social Media Marketing',
      'Content Strategy',
    ],
  },
];

const Services: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <HeroSection
        title="Our Services"
        subtitle="We offer a wide range of digital services to help your business thrive in the digital landscape."
        overline="SERVICES"
        buttons={[{ text: 'Get Started' }]}
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          What We Offer
        </Typography>

        <Grid2 container spacing={4}>
          {services.map((service) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={service.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.light',
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 80,
                      width: 80,
                    }}
                    src={service.icon}
                    alt={service.title}
                  />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Typography variant="body2" component="div">
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      <CTASection
        overline="PROCESS"
        title="How We Work"
        subtitle="Our streamlined process ensures efficient\nand effective delivery of your project."
        buttonText="Start Your Project"
      >
        <Grid2 container spacing={2} justifyContent="center">
          {[
            {
              phase: 'Discovery',
              description: 'We understand your requirements and objectives.',
            },
            {
              phase: 'Planning',
              description: 'We create a detailed roadmap for your project.',
            },
            {
              phase: 'Design',
              description: 'We develop wireframes and visual designs.',
            },
            {
              phase: 'Development',
              description: 'We build your solution with clean, efficient code.',
            },
            {
              phase: 'Testing',
              description: 'We thoroughly test for quality and performance.',
            },
            {
              phase: 'Launch',
              description:
                'We deploy your solution and provide ongoing support.',
            },
          ].map((step, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: 10,
                    opacity: 0.1,
                    fontSize: '6rem',
                    fontWeight: 700,
                    zIndex: -1,
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {step.phase}
                </Typography>
                <Typography variant="body2">{step.description}</Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </CTASection>
    </Box>
  );
};

export default Services;
