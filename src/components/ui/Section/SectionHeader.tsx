import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

export interface SectionHeaderProps {
  overline: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  subtitle,
  align = 'center',
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: align, mb: 4 }}>  {/* Reduced from 6 to 4 */}
      <Typography variant="overline" sx={{ color: theme.palette.primary.main }}>
        {overline}
      </Typography>
      <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1">
          {subtitle.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < subtitle.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
