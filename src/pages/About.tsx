import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MissingTranslation from '../components/translation/MissingTranslation';
import { CTASection, HeroSection } from '../components/ui';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { createScrollRoute, scrollToElement } from '../utils/navigationUtils';
import {
  getStringContent,
  getTranslatableContent,
} from '../utils/translationUtils';

interface ValueItem {
  title: string;
  description: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getContent } = useLocalizedContent('screens', 'about');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search]);

  const hero = {
    title: getContent<string>('hero.title'),
    subtitle: getContent<string>('hero.subtitle'),
    overline: getContent<string>('hero.overline'),
    buttonText: getContent<string>('hero.buttonText'),
  };

  const story = {
    title: getContent<string>('story.title'),
    content: getContent<string[]>('story.content'),
  };

  const values = {
    overline: getContent<string>('values.overline'),
    title: getContent<string>('values.title'),
    subtitle: getContent<string>('values.subtitle'),
    items: getContent<ValueItem[]>('values.items'),
  };

  return (
    <BaseLayout>
      <HeroSection
        title={getTranslatableContent(hero.title, 'about.hero.title')}
        subtitle={getTranslatableContent(hero.subtitle, 'about.hero.subtitle')}
        overline={getTranslatableContent(hero.overline, 'about.hero.overline')}
        buttons={[
          {
            text: getStringContent(hero.buttonText, 'about.hero.buttonText'),
            onClick: () =>
              navigate(
                createScrollRoute(
                  ROUTES.PUBLIC.TEAMDETAILS.path,
                  'team-details-section'
                )
              ),
          },
        ]}
      />

      <Container id="our-story-section" maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                {getTranslatableContent(story.title, 'about.story.title')}
              </Typography>
              {Array.isArray(story.content) ? (
                story.content.map((paragraph: string, index: number) => (
                  <Typography key={index} variant="body1" sx={{ mb: 2 }}>
                    {paragraph}
                  </Typography>
                ))
              ) : (
                <MissingTranslation
                  translationKey="story.content"
                  namespace="screens.about"
                />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundImage: `url('group-3.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 300,
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <CTASection
        overline={getTranslatableContent(
          values.overline,
          'about.values.overline'
        )}
        title={getTranslatableContent(values.title, 'about.values.title')}
        subtitle={getTranslatableContent(
          values.subtitle,
          'about.values.subtitle'
        )}
      >
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(values.items) ? (
            values.items.map((value: ValueItem, index: number) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" component="h3" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2">{value.description}</Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <MissingTranslation
                translationKey="values.items"
                namespace="screens.about"
              />
            </Grid>
          )}
        </Grid>
      </CTASection>
    </BaseLayout>
  );
};

export default About;
