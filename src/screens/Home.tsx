import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeroSection } from '../components/ui';
import TeamCard from '../components/ui/Card/TeamCard';
import { TeamMemberType } from '../components/ui/Card/TeamCard';
import GridLayout from '../components/ui/GridLayout';
import CTASection from '../components/ui/Section/CTASection';
import ROUTES from '../routes';
import { gridSizes, spacing } from '../theme/themeUtils';
import { createScrollRoute, createScrollToTopRoute } from '../utils/navigationUtils';

const teamMembers: TeamMemberType[] = [
  {
    id: 1,
    name: 'Peg Legge',
    role: 'CEO',
    image: 'mask-group.png',
  },
  {
    id: 2,
    name: 'Richard Guerra',
    role: 'CTO',
    image: 'mask-group-1.png',
  },
  {
    id: 3,
    name: 'Alexandra Stolz',
    role: 'DESIGNER',
    image: 'mask-group-2.png',
  },
  {
    id: 4,
    name: 'Janet Bray',
    role: 'DEVELOPER',
    image: 'mask-group-3.png',
  },
];

const partnerLogos = [
  {
    src: 'google-logo.svg',
    alt: 'Partner Logo',
    width: '152.64px',
    height: '50px',
  },
  {
    src: 'microsoft-logo.svg',
    alt: 'Partner Logo',
    width: '210.85px',
    height: '45px',
  },
  {
    src: 'airbnb-logo.svg',
    alt: 'Partner Logo',
    width: '160.29px',
    height: '50px',
  },
  {
    src: 'facebook-logo.svg',
    alt: 'Partner Logo',
    width: '196.38px',
    height: '38px',
  },
  {
    src: 'spotify-logo.svg',
    alt: 'Partner Logo',
    width: '166.82px',
    height: '50px',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  // No need for useScrollTo here as it's handled at the app level

  const teamCards = teamMembers.map((member) => (
    <TeamCard key={member.id} member={member} variant="simple" />
  ));

  const partnerLogoItems = partnerLogos.map((logo, index) => (
    <Box
      key={index}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80px',
      }}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </Box>
  ));

  return (
    <Box>
      <HeroSection
        title="Lorem ipsum dolor sit amet consectetur"
        overline="WELCOME"
        subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nemo hic quos, ab, dolor aperiam nobis cum est eos error ipsum, voluptate culpa nesciunt delectus iste?"
        imageSrc="/group.png"
        buttons={[
          {
            text: 'Become Partner',
            onClick: () => navigate(ROUTES.PUBLIC.CONTACT.path),
          },
          {
            text: 'Join Our Team',
            onClick: () => navigate(ROUTES.PUBLIC.TEAMJOIN.path),
          },
        ]}
      />

      <CTASection
        id="about-section"
        overline="ABOUT US"
        title="Learn More About Us"
        subtitle="Discover our mission, values, and the team behind our success."
        buttonText="Read More"
        onButtonClick={() =>
          navigate(createScrollRoute(ROUTES.PUBLIC.ABOUT.path, 'our-story-section'))
        }
        py={5} // Reduced padding specifically after hero section
      ></CTASection>

      <CTASection
        id="partners-section"
        overline="PARTNERS"
        title="Lorem Ipsum Dolor"
        subtitle="Lorem ipsum, dolor sit amet consectetur\nadipisicing elit."
        buttonText="View Partners"
        onButtonClick={() =>
          navigate(createScrollRoute(ROUTES.PUBLIC.PARTNERDETAILS.path, 'partners-section'))
        }
      >
        <GridLayout
          items={partnerLogoItems}
          itemProps={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4, // Allows 5 logos in a row on large screens
          }}
          spacing={2}
          justifyContent="center"
          containerProps={{
            alignItems: 'center',
            sx: {
              maxWidth: '100%',
              mx: 'auto',
            }
          }}
        />
      </CTASection>

      <CTASection
        id="team-section"
        overline="TEAM"
        title="Our Talents"
        subtitle="Lorem ipsum, dolor sit amet consectetur\nSuscipit nemo hic quos, ab,"
        buttonText="View Team"
        onButtonClick={() =>
          navigate(createScrollRoute(ROUTES.PUBLIC.TEAMDETAILS.path, 'team-details-section'))
        }
      >
        <GridLayout
          items={teamCards}
          itemProps={gridSizes.quarterWidth}
          spacing={4}
        />
      </CTASection>
    </Box>
  );
};

export default Home;
