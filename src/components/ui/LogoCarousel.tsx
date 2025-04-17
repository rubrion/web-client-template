import { Box, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface Logo {
  src: string;
  alt: string;
  width: string;
  height: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  speed?: number;
  maxLogoHeight?: number;
  padding?: string;
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({
  logos = [],
  speed = 20,
  maxLogoHeight = 40,
  padding = '0 40px',
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const duplicatedLogos = useMemo(
    () => [...logos, ...logos, ...logos],
    [logos]
  );

  useEffect(() => {
    if (!innerRef.current || !containerRef.current) return;

    const updateWidth = () => {
      if (innerRef.current) {
        const logosContainerWidth = innerRef.current.scrollWidth / 3;
        if (logosContainerWidth > 0 && logosContainerWidth !== totalWidth) {
          setTotalWidth(logosContainerWidth);
        }
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
    }

    return () => {
      if (innerRef.current) {
        resizeObserver.unobserve(innerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [logos, totalWidth]);

  const keyframeStyles = useMemo(() => {
    if (!totalWidth) return '';

    return `
      @keyframes scrollLogos {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth}px);
        }
      }
    `;
  }, [totalWidth]);

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => {
      setAnimationKey((prev) => prev + 1);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <style>{keyframeStyles}</style>
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: '100px',
            height: '100%',
            zIndex: 2,
          },
          '&::before': {
            left: 0,
            background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)`,
          },
          '&::after': {
            right: 0,
            background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)`,
          },
        }}
        ref={containerRef}
      >
        <Box
          ref={innerRef}
          key={`logo-carousel-${animationKey}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            animation: totalWidth
              ? `scrollLogos ${speed}s linear infinite`
              : 'none',
            gap: 4,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <Box
              key={`logo-${index}`}
              sx={{
                padding: padding,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxHeight: maxLogoHeight,
                  width: 'auto',
                  height: 'auto',
                  maxWidth: logo.width,
                  filter:
                    hoveredIndex === index
                      ? 'none'
                      : isDarkMode
                        ? 'brightness(0) invert(0.7)'
                        : 'grayscale(100%) brightness(0.9)',
                  opacity: hoveredIndex === index ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default LogoCarousel;
