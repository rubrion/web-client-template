import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Container,
  Link,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ROUTES from '../../routes';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  my?: number;
  showHome?: boolean;
  homeLabel?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  maxWidth = 'lg',
  my = 1,
  showHome = false,
  homeLabel = 'Home',
}) => {
  // Create a new array with home item if showHome is true
  const displayItems = React.useMemo(() => {
    if (showHome && items && items.length > 0) {
      const homeItem: BreadcrumbItem = {
        label: homeLabel,
        href: ROUTES.PUBLIC.HOME.path,
      };
      return [homeItem, ...items];
    }
    return items;
  }, [items, showHome, homeLabel]);

  // Don't render if there are no items or only one item
  if (!displayItems || displayItems.length <= 1) {
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
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;

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
