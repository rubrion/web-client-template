import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DevicesIcon from '@mui/icons-material/Devices';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { Box, SvgIcon } from '@mui/material';
import React from 'react';

import { borderRadius } from '../../theme/themeUtils';
import { useThemeValues } from '../../theme/useThemeValues';

export type PlaceholderType =
  | 'blog'
  | 'project'
  | 'generic'
  | 'service'
  | 'team'
  | 'web'
  | 'mobile'
  | 'design'
  | 'marketing';

interface PlaceholderImageProps {
  type?: PlaceholderType;
  title?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  iconSize?: 'small' | 'medium' | 'large';
  customIcon?: React.ReactNode;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  type = 'generic',
  title,
  width = '100%',
  height = 'auto',
  aspectRatio = '16/9',
  iconSize = 'large',
  customIcon,
}) => {
  const { color, isDarkMode } = useThemeValues();

  // Map icon sizes to numeric values
  const iconSizeMap = {
    small: 24,
    medium: 40,
    large: 64,
  };

  // Get icon size in pixels
  const iconSizeInPx = iconSizeMap[iconSize] || 40;

  // Get background and icon colors based on type and theme
  const getBgColor = () => {
    switch (type) {
      case 'blog':
        return isDarkMode
          ? 'rgba(37, 99, 235, 0.1)'
          : 'rgba(37, 99, 235, 0.05)';
      case 'project':
        return isDarkMode
          ? 'rgba(99, 102, 241, 0.1)'
          : 'rgba(99, 102, 241, 0.05)';
      case 'service':
        return isDarkMode
          ? 'rgba(20, 184, 166, 0.1)'
          : 'rgba(20, 184, 166, 0.05)';
      case 'team':
        return isDarkMode
          ? 'rgba(236, 72, 153, 0.1)'
          : 'rgba(236, 72, 153, 0.05)';
      case 'web':
      case 'mobile':
      case 'design':
      case 'marketing':
        return isDarkMode
          ? 'rgba(124, 58, 237, 0.1)'
          : 'rgba(124, 58, 237, 0.05)';
      default:
        return isDarkMode ? color('background.paper') : color('grey.100');
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'blog':
        return color('primary.main');
      case 'project':
        return color('secondary.main');
      case 'service':
        return isDarkMode ? '#14b8a6' : '#0d9488';
      case 'team':
        return isDarkMode ? '#ec4899' : '#db2777';
      case 'web':
      case 'mobile':
      case 'design':
      case 'marketing':
        return isDarkMode ? '#8b5cf6' : '#7c3aed';
      default:
        return isDarkMode ? color('grey.400') : color('grey.500');
    }
  };

  // Choose the appropriate icon component
  const getIconComponent = () => {
    switch (type) {
      case 'blog':
        return ArticleIcon;
      case 'project':
        return WorkIcon;
      case 'service':
        return BusinessIcon;
      case 'team':
        return PersonIcon;
      case 'web':
        return CodeIcon;
      case 'mobile':
        return DevicesIcon;
      case 'design':
        return DesignServicesIcon;
      case 'marketing':
        return BusinessIcon;
      default:
        return ImageIcon;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <Box
      sx={{
        width,
        height,
        aspectRatio,
        backgroundColor: getBgColor(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: getIconColor(),
        borderRadius: borderRadius.xs,
        overflow: 'hidden',
        minHeight: '100px', // Ensure minimum height
      }}
      role="img"
      aria-label={title || `${type} placeholder image`}
    >
      {customIcon || (
        <SvgIcon
          component={IconComponent}
          sx={{
            fontSize: iconSizeInPx,
            width: iconSizeInPx,
            height: iconSizeInPx,
            display: 'block',
          }}
        />
      )}
      {title && (
        <Box
          component="span"
          sx={{
            mt: 1,
            px: 2,
            maxWidth: '100%',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Box>
      )}
    </Box>
  );
};

export default PlaceholderImage;
