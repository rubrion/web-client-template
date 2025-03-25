import { Grid2, Grid2Props } from '@mui/material';
import React from 'react';

import { gridSizes } from '../../theme/themeUtils';

interface GridItemConfig {
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
}

interface GridLayoutProps {
  items: React.ReactNode[];
  itemProps?: GridItemConfig;
  containerProps?: Omit<Grid2Props, 'container'>;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  spacing?: number;
}

const GridLayout: React.FC<GridLayoutProps> = ({
  items,
  itemProps = gridSizes.thirdWidth,
  spacing = 4,
  justifyContent = 'center',
  containerProps,
}) => {
  return (
    <Grid2
      container
      spacing={spacing}
      justifyContent={justifyContent}
      {...containerProps}
    >
      {items.map((item, index) => (
        <Grid2 key={index} size={itemProps}>
          {item}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GridLayout;
