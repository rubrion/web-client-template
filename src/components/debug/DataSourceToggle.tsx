import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { IS_MOCK, USE_FIRESTORE } from '../../config';

/**
 * Component that allows toggling between different data sources during development
 */
const DataSourceToggle: React.FC = () => {
  const [dataSource, setDataSource] = useState<'mock' | 'firestore' | 'api'>(
    IS_MOCK ? 'mock' : USE_FIRESTORE ? 'firestore' : 'api'
  );

  // Handler for changing data source
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'mock' | 'firestore' | 'api'
  ) => {
    if (!newValue) return;

    setDataSource(newValue);

    // Store preference in localStorage
    localStorage.setItem('dataSource', newValue);

    // Update the flags
    if (newValue === 'mock') {
      localStorage.setItem('useMSW', 'true');
      localStorage.setItem('useFirestore', 'false');
    } else if (newValue === 'firestore') {
      localStorage.setItem('useMSW', 'false');
      localStorage.setItem('useFirestore', 'true');
    } else {
      // API
      localStorage.setItem('useMSW', 'false');
      localStorage.setItem('useFirestore', 'false');
    }

    // Reload to apply changes
    window.location.reload();
  };

  // Initialize from localStorage on component mount
  useEffect(() => {
    const savedDataSource = localStorage.getItem('dataSource') as
      | 'mock'
      | 'firestore'
      | 'api'
      | null;
    if (
      savedDataSource &&
      ['mock', 'firestore', 'api'].includes(savedDataSource)
    ) {
      setDataSource(savedDataSource);
    }
  }, []);

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 2,
        padding: 1,
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <Typography
        variant="caption"
        sx={{ display: 'block', textAlign: 'center', color: 'white', mb: 0.5 }}
      >
        Data Source
      </Typography>

      <ToggleButtonGroup
        value={dataSource}
        exclusive
        onChange={handleChange}
        size="small"
        aria-label="data source"
      >
        <ToggleButton
          value="mock"
          sx={{ color: 'white', '&.Mui-selected': { bgcolor: '#ff9800' } }}
        >
          Mock
        </ToggleButton>
        <ToggleButton
          value="firestore"
          sx={{ color: 'white', '&.Mui-selected': { bgcolor: '#4caf50' } }}
        >
          Firestore
        </ToggleButton>
        <ToggleButton
          value="api"
          sx={{ color: 'white', '&.Mui-selected': { bgcolor: '#2196f3' } }}
        >
          API
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DataSourceToggle;
