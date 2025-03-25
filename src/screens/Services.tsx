import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection, Navbar } from '../components/ui';
import { useScrollTo } from '../hooks/useScrollTo';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';

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
        id="services-section"
        overline="SERVICES"
        title="What We Offer"
        maxWidth="lg"
      >
        <Grid2 container spacing={4}>
          {services.map((service) => (
            <Grid2 size={gridSizes.quarterWidth} key={service.id}>
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
                  <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
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
      </CTASection>

      <CTASection
        overline="PROCESS"
        title="How We Work"
        subtitle="Our streamlined process ensures efficient\nand effective delivery of your project."
        buttonText="Get Started"
        onButtonClick={() => navigate(`${ROUTES.PUBLIC.CONTACT.path}?subject=services`)}
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
            <Grid2 size={gridSizes.thirdWidth} key={index}>
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
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
          Tell us what you need — we'll deliver tailored solutions for your
          business.
        </Typography>
      </CTASection>
    </Box>
  );
};

export default Services;
