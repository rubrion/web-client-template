import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

export interface TeamMemberType {
  id?: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
  expertise?: string[];
  education?: string;
  contact?: string;
}

interface TeamCardProps {
  member: TeamMemberType;
  variant?: 'simple' | 'detailed';
}

const TeamCard: React.FC<TeamCardProps> = ({ member, variant = 'simple' }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="div"
        sx={{
          position: 'relative',
          paddingTop: '75%',
          backgroundImage: `url(${member.image})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          margin: '10px 10px 0 10px',
        }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {member.name}
        </Typography>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          {member.role}
        </Typography>

        {variant === 'detailed' && (
          <>
            {member.bio && (
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {member.bio}
              </Typography>
            )}
            {member.expertise && (
              <>
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
              </>
            )}
            {member.education && (
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                <strong>Education:</strong> {member.education}
              </Typography>
            )}
            {member.contact && (
              <Typography variant="body2">
                <strong>Contact:</strong> {member.contact}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamCard;
