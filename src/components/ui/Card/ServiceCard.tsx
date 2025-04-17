import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

import PlaceholderImage from '../PlaceholderImage';

export interface ServiceItemType {
  id?: number | string;
  title: string;
  icon?: string;
  description: string;
  features?: string[];
}

interface ServiceCardProps {
  service: ServiceItemType;
  elevation?: number;
  imageHeight?: number | string;
  variant?: 'default' | 'compact';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  elevation = 1,
  imageHeight = 140,
  variant = 'default',
}) => {
  // Helper function to determine service type based on title
  const getServiceType = ():
    | 'web'
    | 'mobile'
    | 'design'
    | 'marketing'
    | 'service' => {
    const lowerTitle = service.title.toLowerCase();
    if (lowerTitle.includes('web')) return 'web';
    if (lowerTitle.includes('mobile') || lowerTitle.includes('app'))
      return 'mobile';
    if (
      lowerTitle.includes('design') ||
      lowerTitle.includes('ui') ||
      lowerTitle.includes('ux')
    )
      return 'design';
    if (lowerTitle.includes('marketing') || lowerTitle.includes('seo'))
      return 'marketing';
    return 'service';
  };

  return (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {service.icon ? (
        <CardMedia
          component="div"
          sx={{
            height: imageHeight,
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
      ) : (
        <Box sx={{ height: imageHeight }}>
          <PlaceholderImage
            type={getServiceType()}
            title={service.title}
            height={imageHeight}
          />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {service.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          sx={{ mb: 2 }}
        >
          {service.description}
        </Typography>

        {service.features &&
          service.features.length > 0 &&
          variant !== 'compact' && (
            <Typography variant="body2" component="div">
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Typography>
          )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
