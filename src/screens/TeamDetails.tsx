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

import { HeroSection, Navbar } from '../components/ui';

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
  return (
    <Box>
      <Navbar />
      <HeroSection
        title="Our Team"
        subtitle="Meet the talented individuals who make our company thrive."
        overline="TEAM"
        imageSrc="team-hero.png"
        buttons={[{ text: 'Join Our Team' }]}
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Meet Our Experts
        </Typography>

        <Grid2 container spacing={4}>
          {teamMembers.map((member) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
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
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {member.bio}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Areas of Expertise:
                  </Typography>
                  <Typography variant="body2" component="div">
                    <ul>
                      {member.expertise.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Education:</strong> {member.education}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Contact:</strong> {member.contact}
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

export default TeamDetails;
