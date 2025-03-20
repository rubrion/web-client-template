import { Box, Grid2 } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeroSection } from '../components/ui';
import CTASection from '../components/ui/CTASection';
import TeamMember from '../components/ui/TeamMember';
import ROUTES from '../routes';

const teamMembers = [
  {
    name: 'Peg Legge',
    role: 'CEO',
    image: 'mask-group.png',
  },
  {
    name: 'Richard Guerra',
    role: 'CTO',
    image: 'mask-group-1.png',
  },
  {
    name: 'Alexandra Stolz',
    role: 'DESIGNER',
    image: 'mask-group-2.png',
  },
  {
    name: 'Janet Bray',
    role: 'DEVELOPER',
    image: 'mask-group-3.png',
  },
];

const partnerLogos = [
  {
    src: 'xmlid-24-.svg',
    alt: 'Partner Logo',
    width: '152.64px',
    height: '50px',
  },
  {
    src: 'xmlid-1-.svg',
    alt: 'Partner Logo',
    width: '210.85px',
    height: '45px',
  },
  {
    src: 'xmlid-1--1.svg',
    alt: 'Partner Logo',
    width: '160.29px',
    height: '50px',
  },
  {
    src: 'group-4.svg',
    alt: 'Partner Logo',
    width: '196.38px',
    height: '38px',
  },
  {
    src: 'xmlid-1--2.svg',
    alt: 'Partner Logo',
    width: '166.82px',
    height: '50px',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <HeroSection
        title="Lorem ipsum dolor sit amet consectetur"
        subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nemo hic quos, ab, dolor aperiam nobis cum est eos error ipsum, voluptate culpa nesciunt delectus iste?"
        buttons={[
          {
            text: 'Become Partner',
            onClick: () => navigate(ROUTES.PUBLIC.CONTACT.path),
          },
          {
            text: 'Join Our Team',
          },
        ]}
      />

      <CTASection
        overline="ABOUT US"
        title="Learn More About Us"
        subtitle="Discover our mission, values, and the team behind our success."
        buttonText="Read More"
        onButtonClick={() => navigate(ROUTES.PUBLIC.ABOUT.path)}
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box>
            <h2>Our Story</h2>
            <p>
              Founded in 2020, our company has grown from a small startup to a
              leader in the industry. We believe in innovation, quality, and
              customer satisfaction.
            </p>
          </Box>
        </Grid2>
      </CTASection>

      <CTASection
        overline="PARTNERS"
        title="Lorem Ipsum Dolor"
        subtitle="Lorem ipsum, dolor sit amet consectetur\nadipisicing elit."
        buttonText="View Partners"
        onButtonClick={() => navigate(ROUTES.PUBLIC.PARTNERDETAILS.path)}
      >
        <Grid2
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {partnerLogos.map((logo, index) => (
            <Grid2
              size={{ xs: 6, sm: 4, md: 'auto' }}
              key={index}
              sx={{
                alignItems: 'center',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Grid2>
          ))}
        </Grid2>
      </CTASection>

      <CTASection
        overline="TEAM"
        title="Our Talents"
        subtitle="Lorem ipsum, dolor sit amet consectetur\nSuscipit nemo hic quos, ab,"
        buttonText="View Team"
        onButtonClick={() => navigate(ROUTES.PUBLIC.TEAMDETAILS.path)}
      >
        <Grid2 container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TeamMember
                name={member.name}
                role={member.role}
                image={member.image}
              />
            </Grid2>
          ))}
        </Grid2>
      </CTASection>
    </Box>
  );
};

export default Home;
