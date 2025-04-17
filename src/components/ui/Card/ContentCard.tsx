import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PlaceholderImage from '../PlaceholderImage';

export interface ContentItem {
  id: string | number;
  title: string;
  description?: string;
  summary?: string;
  image?: string;
  category?: string;
  tags?: string[];
  ctaLink: string;
  ctaText: string;
  date?: string;
  author?: string;
}

interface ContentCardProps {
  item: ContentItem;
  elevation?: number;
  imageHeight?: string;
  imageAspectRatio?: string;
  showCategory?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  elevation = 1,
  imageHeight = '0',
  imageAspectRatio = '56.25%', // 16:9 ratio
  showCategory = true,
  variant = 'default',
}) => {
  const [imageError, setImageError] = useState(false);
  const contentText = item.description || item.summary || '';

  // Determine content type based on the link or category
  const getContentType = (): 'blog' | 'project' | 'generic' => {
    if (
      item.ctaLink.includes('/blog/') ||
      item.category?.toLowerCase().includes('blog')
    ) {
      return 'blog';
    }
    if (
      item.ctaLink.includes('/projects/') ||
      item.category?.toLowerCase().includes('project')
    ) {
      return 'project';
    }
    return 'generic';
  };

  // Check if the item has a valid image that hasn't failed to load
  const hasValidImage = Boolean(
    item.image && item.image.trim() !== '' && !imageError
  );

  return (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: imageAspectRatio,
          width: '100%',
        }}
      >
        {hasValidImage ? (
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            onError={() => setImageError(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <PlaceholderImage
              type={getContentType()}
              iconSize="large"
              width="100%"
              height="100%"
            />
          </Box>
        )}

        {variant === 'featured' && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            Featured
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        {showCategory && item.category && (
          <Typography
            variant="overline"
            color="text.secondary"
            component="div"
            sx={{ mb: 1 }}
          >
            {item.category}
          </Typography>
        )}

        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            fontSize: variant === 'compact' ? '1.1rem' : '1.25rem',
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {item.title}
        </Typography>

        {variant !== 'compact' && contentText && (
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ mb: 2 }}
          >
            {contentText}
          </Typography>
        )}

        {item.date && (
          <Typography variant="caption" color="text.secondary">
            {item.date}
            {item.author && ` • By ${item.author}`}
          </Typography>
        )}

        {item.tags && item.tags.length > 0 && (
          <Box sx={{ mt: 2, mb: 1 }}>
            {item.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={item.ctaLink}
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            fontWeight: 500,
            textTransform: variant === 'featured' ? 'none' : 'uppercase',
            fontSize: variant === 'featured' ? '0.9rem' : '0.75rem',
          }}
        >
          {item.ctaText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContentCard;
