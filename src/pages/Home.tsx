import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MissingTranslation from '../components/translation/MissingTranslation';
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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { getContent, getRequiredContent, translationState } =
    useTranslationContext();

  /* Essential data */
  const teamMembers = getRequiredContent<TeamMemberType[]>(
    'screens',
    'home.teamMembers'
  );
  const partners = getRequiredContent<Record<string, string>>(
    'common',
    'partners'
  );

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
    becomePartner: getRequiredContent<string>(
      'screens',
      'home.cta.becomePartner'
    ),
    joinTeam: getRequiredContent<string>('screens', 'home.cta.joinTeam'),
  };
  /* Logo configuration derived from partners */
  const partnerLogos = useMemo(
    () => [
      {
        src: 'google-logo.svg',
        alt: partners.google,
        width: '152.64px',
        height: '50px',
      },
      {
        src: 'microsoft-logo.svg',
        alt: partners.microsoft,
        width: '210.85px',
        height: '45px',
      },
      {
        src: 'airbnb-logo.svg',
        alt: partners.airbnb,
        width: '160.29px',
        height: '50px',
      },
      {
        src: 'facebook-logo.svg',
        alt: partners.facebook,
        width: '196.38px',
        height: '38px',
      },
      {
        src: 'spotify-logo.svg',
        alt: partners.spotify,
        width: '166.82px',
        height: '50px',
      },
    ],
    [partners]
  );

  /* Team cards derived from team members */
  const teamCards = useMemo(
    () =>
      teamMembers.map((member) => {
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
      }),
    [teamMembers]
  );

  // Helper function to render content or MissingTranslation component when null
  const renderContent = (content: string | null, key: string) => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
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
      <Box>
        <HeroSection
          title={renderContent(hero.title, 'home.hero.title')}
          subtitle={renderContent(hero.subtitle, 'home.hero.subtitle')}
          overline={renderContent(hero.overline, 'home.hero.overline')}
          imageSrc="/group.png"
          buttons={[
            {
              text: ctaContent.becomePartner,
              onClick: () => navigate(ROUTES.PUBLIC.CONTACT.path),
            },
            {
              text: ctaContent.joinTeam,
              onClick: () => navigate(ROUTES.PUBLIC.TEAMJOIN.path),
            },
          ]}
          showNavbar={true}
        />

        <CTASection
          id="about-section"
          overline={renderContent(aboutContent.overline, 'home.about.overline')}
          title={renderContent(aboutContent.title, 'home.about.title')}
          subtitle={renderContent(aboutContent.subtitle, 'home.about.subtitle')}
          buttonText={aboutContent.buttonText}
          onButtonClick={() =>
            navigate(
              createScrollRoute(ROUTES.PUBLIC.ABOUT.path, 'our-story-section')
            )
          }
          py={5}
        />

        <CTASection
          id="partners-section"
          overline={renderContent(
            partnersContent.overline,
            'home.partners.overline'
          )}
          title={renderContent(partnersContent.title, 'home.partners.title')}
          subtitle={renderContent(
            partnersContent.subtitle,
            'home.partners.subtitle'
          )}
          buttonText={partnersContent.buttonText}
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
          overline={renderContent(teamContent.overline, 'home.team.overline')}
          title={renderContent(teamContent.title, 'home.team.title')}
          subtitle={renderContent(teamContent.subtitle, 'home.team.subtitle')}
          buttonText={teamContent.buttonText}
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
