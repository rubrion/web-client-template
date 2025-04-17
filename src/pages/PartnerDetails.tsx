import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection } from '../components/ui';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';

interface Partner {
  id?: number;
  name: string;
  logo: string;
  description: string;
  website: string;
}

const PartnerDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'partners');

  const partnerData = {
    hero: {
      title: getContent<string>('hero.title'),
    },
    details: {
      overline: getContent<string>('details.overline'),
      title: getContent<string>('details.title'),
      buttonText: getContent<string>('details.buttonText'),
      footer: getContent<string>('details.footer'),
    },
    partners: getContent<Partner[]>('partners'),
    websiteLabel: getContent<string>('websiteLabel'),
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search, scrollToElement]);

  return (
    <BaseLayout>
      <CTASection
        id="partners-section"
        overline={partnerData.details.overline}
        title={partnerData.details.title}
        buttonText={partnerData.details.buttonText}
        onButtonClick={() =>
          navigate(`${ROUTES.PUBLIC.CONTACT.path}?subject=partner`)
        }
      >
        <Grid container spacing={4}>
          {Array.isArray(partnerData.partners) &&
            partnerData.partners.map((partner: Partner) => (
              <Grid
                size={gridSizes.thirdWidth}
                key={partner.id || partner.name}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 0,
                      paddingTop: '100%',
                      backgroundImage: `url(${partner.logo})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {partner.name}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                      {partner.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{partnerData.websiteLabel}</strong>{' '}
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {partner.website}
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          {partnerData.details.footer}
        </Typography>
      </CTASection>
    </BaseLayout>
  );
};

export default PartnerDetails;
