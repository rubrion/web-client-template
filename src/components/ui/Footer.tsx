import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

// Simple interface for motion components without unused props
interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  // We keep these props in the interface for compatibility,
  // but we don't need to destructure them in the component
  variants?: Record<string, unknown>;
  initial?: string | Record<string, unknown>;
  whileInView?: string | Record<string, unknown>;
  viewport?: Record<string, unknown>;
}

// Simple fallback component that ignores motion props
const MotionDiv: React.FC<React.PropsWithChildren<MotionProps>> = ({
  children,
  // Prefix with underscore to indicate they're intentionally unused
  // Or remove them from destructuring completely
  ...props
}) => {
  // Remove motion-specific props before spreading to avoid DOM warnings
  const {
    variants: _variants,
    initial: _initial,
    whileInView: _whileInView,
    viewport: _viewport,
    ...domProps
  } = props;

  return <div {...domProps}>{children}</div>;
};

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Animation variants for reference - kept for documentation but not used in the DOM
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.9)'
            : 'rgba(248, 250, 252, 0.9)',
        borderTop: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          // We'd pass motion props here if using framer-motion
          className="footer-container"
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 4,
            }}
          >
            <Box>
              <Box className="footer-item">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Business Solutions
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 2, color: 'text.secondary' }}
                >
                  Professional business solutions customized for your company
                  needs. We help businesses transform and grow in the digital
                  era.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  © {currentYear} Business Solutions. All rights reserved.
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box className="footer-item">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Quick Links
                </Typography>
                <Stack direction="column" spacing={1}>
                  {['Home', 'About', 'Services', 'Solutions', 'Contact'].map(
                    (item) => (
                      <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        underline="none"
                        sx={{
                          color: 'text.secondary',
                          transition: 'all 0.2s',
                          '&:hover': {
                            color: 'primary.main',
                            transform: 'translateX(4px)',
                            display: 'inline-block',
                          },
                        }}
                      >
                        {item}
                      </Link>
                    )
                  )}
                </Stack>
              </Box>
            </Box>

            <Box>
              <Box className="footer-item">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Contact Us
                </Typography>
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    123 Business Avenue
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Enterprise District, BZ 10101
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    contact@businesssolutions.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    +1 (555) 123-4567
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 2,
            }}
          >
            <Box className="footer-item">
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                Designed with Material UI principles. All rights reserved.
              </Typography>
            </Box>

            <Box className="footer-item">
              <Stack direction="row" spacing={2}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                  (item) => (
                    <Link
                      key={item}
                      href="#"
                      underline="hover"
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {item}
                    </Link>
                  )
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
