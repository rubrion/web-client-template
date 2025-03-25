import { Box, Typography, keyframes, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface LogoAnimationProps {
    onAnimationComplete: () => void;
    duration?: number;
    isContentLoaded: boolean;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({
    onAnimationComplete,
    duration = 2500,
    isContentLoaded,
}) => {
    const theme = useTheme();
    const [show, setShow] = useState(true);
    const [showText, setShowText] = useState(false);

    // Animation keyframes
    const fadeIn = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `;

    const fadeOut = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

    const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  `;

    const progressAnim = keyframes`
    0% {
      left: -30%;
    }
    100% {
      left: 100%;
    }
  `;

    // Show the text after a delay
    useEffect(() => {
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 800); // Show text after logo appears

        return () => clearTimeout(textTimer);
    }, []);

    useEffect(() => {
        // Only start the animation timer when content is loaded
        if (isContentLoaded) {
            const timer = setTimeout(() => {
                setShow(false);
                onAnimationComplete();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onAnimationComplete, isContentLoaded]);

    // Create more contrasting background for the logo
    const backgroundColor = theme.palette.secondary.main; // Dark background

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor,
                zIndex: 9999,
                opacity: 1,
                animation: show ? 'none' : `${fadeOut} 0.4s ease-out forwards`,
                transition: 'opacity 0.4s ease-out',
                pointerEvents: show ? 'auto' : 'none',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Logo Container */}
                <Box
                    sx={{
                        width: '150px',
                        height: '150px',
                        position: 'relative',
                        animation: `${bounce} 2s ease-in-out infinite`,
                        mb: 4,
                    }}
                >
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        style={{
                            width: '100%',
                            height: '100%',
                            filter: 'brightness(0) invert(1)',  // Ensure logo is white on dark background
                        }}
                    />
                </Box>

                {/* Simplified container with exact positioning */}
                <Box
                    sx={{
                        position: 'relative',
                        height: '50px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Text element */}
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            position: 'absolute',
                            color: theme.palette.primary.light,
                            fontWeight: 'bold',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            opacity: showText ? 1 : 0,
                            visibility: showText ? 'visible' : 'hidden',
                            animation: showText ? `${fadeIn} 0.8s ease-out forwards` : 'none',
                            transition: 'opacity 0.5s ease-out',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'auto',
                        }}
                    >
                        Business Solutions
                    </Typography>

                    {/* Loading Indicator - directly under the text */}
                    <Box
                        sx={{
                            position: 'absolute',
                            opacity: showText ? 0 : 1,
                            visibility: showText ? 'hidden' : 'visible',
                            transition: 'opacity 0.5s ease-out',
                            width: '240px',
                            height: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                backgroundColor: theme.palette.primary.light,
                                width: '30%',
                                borderRadius: '2px',
                                animation: `${progressAnim} 1s infinite linear`,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LogoAnimation;
