// Create a new file: NewsletterPopup.tsx

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import {
  getStringContent,
  getTranslatableContent,
} from '../../utils/translationUtils';

interface NewsletterProps {
  open: boolean;
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const { getContent } = useLocalizedContent('common', 'newsletter');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [forceRefresh, setForceRefresh] = useState(0);

  // Get translations with proper structure
  const translations = {
    title: getContent<string>('title'),
    description: getContent<string>('description'),
    emailLabel: getContent<string>('emailLabel'),
    emailRequired: getContent<string>('emailRequired'),
    invalidEmail: getContent<string>('invalidEmail'),
    subscribeButton: getContent<string>('subscribeButton'),
    privacyNotice: getContent<string>('privacyNotice'),
    successTitle: getContent<string>('successTitle'),
    successMessage: getContent<string>('successMessage'),
    closeButton: getContent<string>('closeButton'),
    close: getContent<string>('close'),
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setForceRefresh((prev) => prev + 1);
    };

    document.addEventListener('i18n-language-changed', handleLanguageChange);

    return () => {
      document.removeEventListener(
        'i18n-language-changed',
        handleLanguageChange
      );
    };
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError(
        getStringContent(
          translations.emailRequired,
          'newsletter.emailRequired'
        ) || 'Email is required'
      );
      return;
    }

    if (!validateEmail(email)) {
      setError(
        getStringContent(
          translations.invalidEmail,
          'newsletter.invalidEmail'
        ) || 'Please enter a valid email'
      );
      return;
    }

    // Simulate API call
    try {
      const response = await fetch('/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setEmail('');
        setSubscribed(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Newsletter subscription failed:', err);
      setError('Subscription failed. Please try again.');
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSubscribed(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: '8px', // Less rounded corners
          maxWidth: '500px',
          width: '100%',
        },
      }}
      key={`newsletter-popup-${forceRefresh}`}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label={getStringContent(translations.close, 'newsletter.close')}
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 0 }}>
        {!subscribed ? (
          <>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              {getTranslatableContent(translations.title, 'newsletter.title')}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {getTranslatableContent(
                translations.description,
                'newsletter.description'
              )}
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label={
                  getStringContent(
                    translations.emailLabel,
                    'newsletter.emailLabel'
                  ) || ''
                }
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!error}
                helperText={error}
                sx={{ mb: 1.5 }}
                size="medium"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubscribe}
                sx={{
                  py: 1.25,
                  fontWeight: 600,
                  mt: 1,
                  borderRadius: '4px', // Less rounded button
                }}
              >
                {getStringContent(
                  translations.subscribeButton,
                  'newsletter.subscribeButton'
                )}
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 1.5, textAlign: 'center' }}
              >
                {getTranslatableContent(
                  translations.privacyNotice,
                  'newsletter.privacyNotice'
                )}
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Box
                component="svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  fill={theme.palette.success.main}
                />
              </Box>
            </Box>

            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {getTranslatableContent(
                translations.successTitle,
                'newsletter.successTitle'
              )}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2.5 }}>
              {getTranslatableContent(
                translations.successMessage,
                'newsletter.successMessage'
              )}
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              sx={{
                mt: 1,
                fontWeight: 500,
                borderRadius: '4px', // Less rounded button
              }}
            >
              {getStringContent(
                translations.closeButton,
                'newsletter.closeButton'
              )}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
