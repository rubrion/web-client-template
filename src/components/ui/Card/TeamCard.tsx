import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

import PlaceholderImage from '../PlaceholderImage';

export interface TeamMemberType {
  id?: number;
  name: string;
  role: string;
  image?: string;
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
  // Check if the image exists and is a non-empty string
  const hasValidImage = Boolean(member.image && member.image.trim().length > 0);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {hasValidImage ? (
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
          onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
            // If the image fails to load, hide it and let the placeholder show
            const target = e.currentTarget;
            target.style.backgroundImage = 'none';
            target.style.display = 'none';
          }}
        />
      ) : (
        <Box
          sx={{
            margin: '10px 10px 0 10px',
            paddingTop: '75%',
            position: 'relative',
          }}
        >
          <Box
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <PlaceholderImage
              type="team"
              aspectRatio="4/3"
              title={member.name}
              iconSize="large"
            />
          </Box>
        </Box>
      )}
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
