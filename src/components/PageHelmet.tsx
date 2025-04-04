import { Box } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';

interface PageHelmetProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  children?: React.ReactNode;
}

const PageHelmet: React.FC<PageHelmetProps> = ({
  title,
  description,
  canonicalUrl,
  children,
}) => {
  const siteTitle = 'Business Solutions';
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription =
    description ||
    'Professional business solutions customized for your company needs.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>
      <Box
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default PageHelmet;
