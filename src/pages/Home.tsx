import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { HeroSection } from '../components/ui';
import TeamCard from '../components/ui/Card/TeamCard';
import { TeamMemberType } from '../components/ui/Card/TeamCard';
import GridLayout from '../components/ui/GridLayout';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import LogoCarousel from '../components/ui/LogoCarousel';
import CTASection from '../components/ui/Section/CTASection';
import { useTranslationContext } from '../context/TranslationContext';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';
import { createScrollRoute } from '../utils/navigationUtils';
import {
  getStringContent,
  getTranslatableContent,
} from '../utils/translationUtils';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { getContent, getRequiredContent, translationState } =
    useTranslationContext();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Home - Language changed, forcing refresh');
      setRefreshKey((prev) => prev + 1);
    };

    document.addEventListener('i18n-language-changed', handleLanguageChange);
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      document.removeEventListener(
        'i18n-language-changed',
        handleLanguageChange
      );
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const [pageData, setPageData] = useState<{
    teamMembers: TeamMemberType[] | null;
    partners: Record<string, string> | null;
  }>({
    teamMembers: null,
    partners: null,
  });

  useEffect(() => {
    try {
      const teamMembers = getRequiredContent<TeamMemberType[]>(
        'screens',
        'home.teamMembers'
      );

      const partners = getRequiredContent<Record<string, string>>(
        'common',
        'partners'
      );

      setPageData({
        teamMembers,
        partners,
      });
    } catch (error) {
      console.error('Error loading required data:', error);
    }
  }, [i18n.language, refreshKey, getRequiredContent]);

  const partnerLogos = pageData.partners
    ? [
        {
          src: 'google-logo.svg',
          alt: pageData.partners.google || 'Google',
          width: '152.64px',
          height: '50px',
        },
        {
          src: 'microsoft-logo.svg',
          alt: pageData.partners.microsoft || 'Microsoft',
          width: '210.85px',
          height: '45px',
        },
        {
          src: 'airbnb-logo.svg',
          alt: pageData.partners.airbnb || 'Airbnb',
          width: '160.29px',
          height: '50px',
        },
        {
          src: 'facebook-logo.svg',
          alt: pageData.partners.facebook || 'Facebook',
          width: '196.38px',
          height: '38px',
        },
        {
          src: 'spotify-logo.svg',
          alt: pageData.partners.spotify || 'Spotify',
          width: '166.82px',
          height: '50px',
        },
      ]
    : [];

  const teamCards = pageData.teamMembers
    ? pageData.teamMembers.map((member) => {
        const validMember: TeamMemberType = {
          ...member,
          image: member.image || undefined,
        };
        return (
          <TeamCard
            key={validMember.id}
            member={validMember}
            variant="simple"
          />
        );
      })
    : [];

  const hero = {
    title: getContent<string>('screens', 'home.hero.title'),
    subtitle: getContent<string>('screens', 'home.hero.subtitle'),
    overline: getContent<string>('screens', 'home.hero.overline'),
  };

  const aboutContent = {
    overline: getContent<string>('screens', 'home.about.overline'),
    title: getContent<string>('screens', 'home.about.title'),
    subtitle: getContent<string>('screens', 'home.about.subtitle'),
    buttonText: getContent<string>('screens', 'home.about.buttonText'),
  };

  const partnersContent = {
    overline: getContent<string>('screens', 'home.partners.overline'),
    title: getContent<string>('screens', 'home.partners.title'),
    subtitle: getContent<string>('screens', 'home.partners.subtitle'),
    buttonText: getContent<string>('screens', 'home.partners.buttonText'),
  };

  const teamContent = {
    overline: getContent<string>('screens', 'home.team.overline'),
    title: getContent<string>('screens', 'home.team.title'),
    subtitle: getContent<string>('screens', 'home.team.subtitle'),
    buttonText: getContent<string>('screens', 'home.team.buttonText'),
  };

  const ctaContent = {
    becomePartner: getContent<string>('screens', 'home.cta.becomePartner'),
    joinTeam: getContent<string>('screens', 'home.cta.joinTeam'),
  };

  if (translationState.isLoading) {
    return (
      <BaseLayout showNavbar={true} transparentNavbar={false}>
        <LoadingIndicator message="Loading content..." fullHeight />
      </BaseLayout>
    );
  }

  if (translationState.hasError) {
    return (
      <BaseLayout showNavbar={true} transparentNavbar={false}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'error.main',
              borderRadius: 1,
              bgcolor: 'error.light',
              color: 'error.dark',
              maxWidth: 600,
            }}
          >
            <h2>Translation Error</h2>
            <p>{translationState.errorDetails}</p>
            <p>
              Please check your translation files for the current language:{' '}
              {i18n.language}
            </p>
          </Box>
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout showNavbar={false}>
      <Box key={`home-content-${refreshKey}-${i18n.language}`}>
        <HeroSection
          title={getTranslatableContent(hero.title, 'home.hero.title')}
          subtitle={getTranslatableContent(hero.subtitle, 'home.hero.subtitle')}
          overline={getTranslatableContent(hero.overline, 'home.hero.overline')}
          imageSrc="/group.png"
          buttons={[
            {
              text: getStringContent(
                ctaContent.becomePartner,
                'home.cta.becomePartner'
              ),
              onClick: () => navigate(ROUTES.PUBLIC.CONTACT.path),
            },
            {
              text: getStringContent(ctaContent.joinTeam, 'home.cta.joinTeam'),
              onClick: () => navigate(ROUTES.PUBLIC.TEAMJOIN.path),
            },
          ]}
          showNavbar={true}
        />

        <CTASection
          id="about-section"
          overline={getTranslatableContent(
            aboutContent.overline,
            'home.about.overline'
          )}
          title={getTranslatableContent(aboutContent.title, 'home.about.title')}
          subtitle={getTranslatableContent(
            aboutContent.subtitle,
            'home.about.subtitle'
          )}
          buttonText={getStringContent(
            aboutContent.buttonText,
            'home.about.buttonText'
          )}
          onButtonClick={() =>
            navigate(
              createScrollRoute(ROUTES.PUBLIC.ABOUT.path, 'our-story-section')
            )
          }
          py={5}
        />

        <CTASection
          id="partners-section"
          overline={getTranslatableContent(
            partnersContent.overline,
            'home.partners.overline'
          )}
          title={getTranslatableContent(
            partnersContent.title,
            'home.partners.title'
          )}
          subtitle={getTranslatableContent(
            partnersContent.subtitle,
            'home.partners.subtitle'
          )}
          buttonText={getStringContent(
            partnersContent.buttonText,
            'home.partners.buttonText'
          )}
          onButtonClick={() =>
            navigate(
              createScrollRoute(
                ROUTES.PUBLIC.PARTNERDETAILS.path,
                'partners-section'
              )
            )
          }
        >
          <LogoCarousel
            logos={partnerLogos}
            speed={15}
            maxLogoHeight={60}
            padding="0 5px"
          />
        </CTASection>

        <CTASection
          id="team-section"
          overline={getTranslatableContent(
            teamContent.overline,
            'home.team.overline'
          )}
          title={getTranslatableContent(teamContent.title, 'home.team.title')}
          subtitle={getTranslatableContent(
            teamContent.subtitle,
            'home.team.subtitle'
          )}
          buttonText={getStringContent(
            teamContent.buttonText,
            'home.team.buttonText'
          )}
          onButtonClick={() =>
            navigate(
              createScrollRoute(
                ROUTES.PUBLIC.TEAMDETAILS.path,
                'team-details-section'
              )
            )
          }
        >
          <GridLayout
            items={teamCards}
            itemProps={gridSizes.quarterWidth}
            spacing={4}
          />
        </CTASection>
      </Box>
    </BaseLayout>
  );
};

export default Home;
