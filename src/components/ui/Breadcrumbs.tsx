import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Container,
  Link,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  my?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  maxWidth = 'lg',
  my = 1, // Reduced from 2 to 1
}) => {
  // Don't render if there are no items or only one item
  if (!items || items.length <= 1) {
    return null;
  }

  return (
    <Container maxWidth={maxWidth}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          mt: my,
          mb: 2.5, // Reduced bottom margin to bring content closer
          color: 'text.secondary',
          '& .MuiBreadcrumbs-ol': { flexWrap: 'wrap' },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          // Current page (last item) is not a link
          if (isLast) {
            return (
              <Typography
                key={index}
                color="text.primary"
                sx={{ fontWeight: 'medium' }}
              >
                {item.label}
              </Typography>
            );
          }

          // For links (non-last items)
          return (
            <Link
              key={index}
              component={RouterLink}
              to={item.href || '#'}
              color="inherit"
              sx={{
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Container>
  );
};

export default Breadcrumbs;
