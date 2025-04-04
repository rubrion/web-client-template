import type { GridProps as MuiGridProps } from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import React from 'react';

// Create a simple wrapper around MUI Grid that accepts both item and container props
interface GridProps extends Omit<MuiGridProps, 'item' | 'container'> {
  item?: boolean;
  container?: boolean;
}

// Simple wrapper component that passes props directly to MUI Grid
const Grid: React.FC<GridProps> = ({ item, container, ...props }) => {
  return <MuiGrid item={item} container={container} {...props} />;
};

export default Grid;
export type { GridProps };
