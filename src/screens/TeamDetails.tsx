import {
  Box,
  Container,
  Grid2,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection, Navbar } from '../components/ui';
import { useScrollTo } from '../hooks/useScrollTo';
import TeamCard from '../components/ui/Card/TeamCard';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';

const teamMembers = [
  {
    id: 1,
    name: 'Peg Legge',
    role: 'CEO',
    image: 'mask-group.png',
    bio: "Peg has over 15 years of experience in the tech industry and has led multiple successful startups. She oversees the company's strategic direction and growth initiatives.",
    expertise: [
      'Strategic Planning',
      'Business Development',
      'Team Leadership',
    ],
    education: 'MBA from Harvard Business School',
    contact: 'peg@start.com',
  },
  {
    id: 2,
    name: 'Richard Guerra',
    role: 'CTO',
    image: 'mask-group-1.png',
    bio: 'Richard is a technology visionary with a passion for innovation. He leads our technical team and ensures that we stay at the forefront of technological advancements.',
    expertise: [
      'Software Architecture',
      'AI & Machine Learning',
      'Cloud Infrastructure',
    ],
    education: 'Ph.D. in Computer Science from MIT',
    contact: 'richard@start.com',
  },
  {
    id: 3,
    name: 'Alexandra Stolz',
    role: 'DESIGNER',
    image: 'mask-group-2.png',
    bio: 'Alexandra brings creativity and user-centered design principles to every project. She leads our design team in creating beautiful and functional user interfaces.',
    expertise: ['UI/UX Design', 'Design Systems', 'User Research'],
    education: 'BFA in Graphic Design from RISD',
    contact: 'alexandra@start.com',
  },
  {
    id: 4,
    name: 'Janet Bray',
    role: 'DEVELOPER',
    image: 'mask-group-3.png',
    bio: 'Janet is a senior developer with expertise in frontend and backend technologies. She is passionate about writing clean, efficient code and mentoring junior developers.',
    expertise: [
      'Full-Stack Development',
      'Performance Optimization',
      'Technical Mentorship',
    ],
    education: 'BS in Computer Science from Stanford University',
    contact: 'janet@start.com',
  },
  {
    id: 5,
    name: 'Michael Chen',
    role: 'MARKETING DIRECTOR',
    image: 'team-member-5.png',
    bio: 'Michael leads our marketing efforts with a data-driven approach. He has a track record of successful campaigns that drive growth and brand awareness.',
    expertise: ['Digital Marketing', 'Content Strategy', 'Analytics'],
    education: 'BS in Marketing from NYU Stern',
    contact: 'michael@start.com',
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    role: 'PROJECT MANAGER',
    image: 'team-member-6.png',
    bio: 'Sarah ensures that our projects are delivered on time and within budget. She is skilled at coordinating cross-functional teams and managing complex projects.',
    expertise: ['Project Planning', 'Agile Methodologies', 'Risk Management'],
    education: 'PMP Certification, MBA from UC Berkeley',
    contact: 'sarah@start.com',
  },
];

const TeamDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();

  // Handle scroll on component mount if needed
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
        id="team-details-section"
        overline="TEAM"
        title="Meet Our Experts"
        buttonText="Join Our Team"
        onButtonClick={() => navigate(ROUTES.PUBLIC.TEAMJOIN.path)}
      >
        <Grid2 container spacing={4}>
          {teamMembers.map((member) => (
            <Grid2 size={gridSizes.thirdWidth} key={member.id}>
              <TeamCard member={member} variant="detailed" />
            </Grid2>
          ))}
        </Grid2>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
          We'd love to learn more about you — send in your application today!
        </Typography>
      </CTASection>
    </Box>
  );
};

export default TeamDetails;
