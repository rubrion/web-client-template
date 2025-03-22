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

import { HeroSection } from '../components/ui';
import ROUTES from '../routes';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: 'portfolio-1.png',
    description: 'A modern e-commerce platform built with React and Node.js.',
  },
  {
    id: 2,
    title: 'Financial Dashboard',
    category: 'UI/UX Design',
    image: 'portfolio-2.png',
    description:
      'An intuitive financial dashboard for tracking investments and expenses.',
  },
  {
    id: 3,
    title: 'Health & Fitness App',
    category: 'Mobile App',
    image: 'portfolio-3.png',
    description: 'A comprehensive health and fitness app for iOS and Android.',
  },
  {
    id: 4,
    title: 'Corporate Website',
    category: 'Web Development',
    image: 'portfolio-4.png',
    description: 'A responsive corporate website for a leading tech company.',
  },
  {
    id: 5,
    title: 'Real Estate Platform',
    category: 'Web Development',
    image: 'portfolio-5.png',
    description:
      'A property listing and management platform with advanced search features.',
  },
  {
    id: 6,
    title: 'Social Media Dashboard',
    category: 'UI/UX Design',
    image: 'portfolio-6.png',
    description:
      'A centralized dashboard for managing multiple social media accounts.',
  },
];

const Portfolio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <HeroSection
        title="Our Portfolio"
        subtitle="Explore our diverse range of projects and see how we've helped businesses transform their digital presence."
        overline="SHOWCASE"
        buttons={[{
          text: 'Know Our Services',
          onClick: () => navigate(`${ROUTES.PUBLIC.SERVICES.path}?scrollTo=services-section`),
        }]}
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Featured Projects
        </Typography>

        <Grid2 container spacing={4}>
          {projects.map((project) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
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
                    pt: '56.25%', // 16:9 aspect ratio
                    bgcolor: 'primary.light',
                  }}
                  image={project.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {project.category}
                  </Typography>
                  <Typography variant="body2">{project.description}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Portfolio;
