import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  number?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  number,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        {icon && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 60,
                width: 60,
              }}
              src={icon}
              alt={title}
            />
          </Box>
        )}
        {number !== undefined && (
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: -20,
              left: 10,
              opacity: 0.1,
              fontSize: '6rem',
              fontWeight: 700,
              zIndex: 0,
            }}
          >
            {number}
          </Typography>
        )}
        <Typography variant="h5" component="h3" gutterBottom align="center">
          {title}
        </Typography>
        <Typography variant="body2" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
