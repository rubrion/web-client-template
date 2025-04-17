import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { IS_MOCK, USE_FIRESTORE } from '../../config';

/**
 * Debug component to toggle between data sources at runtime
 * Only shown in development mode
 */
const DataSourceToggle = () => {
  const [dataSource, setDataSource] = useState<'mock' | 'firestore' | 'api'>(
    IS_MOCK ? 'mock' : USE_FIRESTORE ? 'firestore' : 'api'
  );

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'mock' | 'firestore' | 'api'
  ) => {
    if (newValue) {
      setDataSource(newValue);

      // Save preference to localStorage
      localStorage.setItem('dataSource', newValue);

      // Set relevant flags
      if (newValue === 'mock') {
        localStorage.setItem('useMock', 'true');
        localStorage.setItem('useFirestore', 'false');
      } else if (newValue === 'firestore') {
        localStorage.setItem('useMock', 'false');
        localStorage.setItem('useFirestore', 'true');
      } else {
        localStorage.setItem('useMock', 'false');
        localStorage.setItem('useFirestore', 'false');
      }

      // Reload the page to apply changes
      window.location.reload();
    }
  };

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedDataSource = localStorage.getItem('dataSource');
    if (
      savedDataSource === 'mock' ||
      savedDataSource === 'firestore' ||
      savedDataSource === 'api'
    ) {
      setDataSource(savedDataSource);
    }
  }, []);

  // Only render in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: 2,
        padding: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 1,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="caption" sx={{ color: 'white', mb: 0.5 }}>
        Data Source
      </Typography>
      <ToggleButtonGroup
        size="small"
        value={dataSource}
        exclusive
        onChange={handleChange}
        aria-label="data source"
      >
        <ToggleButton
          value="mock"
          aria-label="mock data"
          sx={{ color: 'white' }}
        >
          Mock
        </ToggleButton>
        <ToggleButton
          value="firestore"
          aria-label="firestore"
          sx={{ color: 'white' }}
        >
          Firestore
        </ToggleButton>
        <ToggleButton value="api" aria-label="api" sx={{ color: 'white' }}>
          API
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DataSourceToggle;
