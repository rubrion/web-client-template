import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const LogoAnimation: React.FC = () => {
  const [scale, setScale] = useState(0.5);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Animate in
    setOpacity(1);
    setScale(1);

    // Setup cleanup for animation out
    return () => {
      setOpacity(0);
      setScale(0.5);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: 'all 0.5s ease-out',
        }}
      >
        <Box
          component="img"
          src="/logo.svg"
          alt="Logo"
          sx={{
            width: 120,
            height: 120,
          }}
        />
      </Box>
    </Box>
  );
};

export default LogoAnimation;
