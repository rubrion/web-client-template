import { Card, CardContent, styled, Typography } from '@mui/material';
import React from 'react';

const TeamMemberImage = styled('div')({
  width: 175,
  height: 175,
  borderRadius: '50%',
  border: '1px solid black',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  marginBottom: 16,
  margin: '0 auto',
});

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 252,
        textAlign: 'center',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <CardContent sx={{ width: '100%' }}>
        <TeamMemberImage style={{ backgroundImage: `url(${image})` }} />
        <Typography variant="h5" component="h3" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
