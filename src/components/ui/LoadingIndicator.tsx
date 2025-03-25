import { Box, keyframes, styled, Typography } from '@mui/material';
import React from 'react';

// Define keyframes for the bouncing animation - make it faster
const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

interface DotProps {
    delay?: number;
}

const Dot = styled('div')<DotProps>(({ theme, delay = 0 }) => ({
    width: 10,
    height: 10,
    margin: '0 3px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    display: 'inline-block',
    animation: `${bounce} 1s infinite ease-in-out both`,
    animationDelay: `${delay}s`,
}));

interface LoadingIndicatorProps {
    message?: string;
    fullHeight?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    message = 'Loading',
    fullHeight = false,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: fullHeight ? '50vh' : '200px',
                padding: 3,
                width: '100%',
                margin: '0 auto',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 1
            }}>
                <Dot delay={0} />
                <Dot delay={0.1} />
                <Dot delay={0.2} />
            </Box>
            {message && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        textAlign: 'center'
                    }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingIndicator;
