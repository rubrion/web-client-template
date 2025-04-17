import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection } from '../components/ui';
import TeamCard from '../components/ui/Card/TeamCard';
import { TeamMemberType } from '../components/ui/Card/TeamCard';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';

const TeamDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'team');

  const teamData = {
    details: {
      overline: getContent<string>('details.overline'),
      title: getContent<string>('details.title'),
      buttonText: getContent<string>('details.buttonText'),
      footer: getContent<string>('details.footer'),
      members: getContent<TeamMemberType[]>('details.members'),
    },
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search, scrollToElement]);

  // Ensure each member has the required properties
  const normalizedMembers = Array.isArray(teamData.details.members)
    ? teamData.details.members.map((member) => ({
        ...member,
        // Set undefined for missing images to use placeholder
        image: member.image || undefined,
      }))
    : [];

  return (
    <BaseLayout>
      <CTASection
        id="team-details-section"
        overline={teamData.details.overline}
        title={teamData.details.title}
        buttonText={teamData.details.buttonText}
        onButtonClick={() => navigate(ROUTES.PUBLIC.TEAMJOIN.path)}
      >
        <Grid container spacing={4}>
          {Array.isArray(normalizedMembers) &&
            normalizedMembers.map((member) => (
              <Grid size={gridSizes.thirdWidth} key={member.id}>
                <TeamCard member={member} variant="detailed" />
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          {teamData.details.footer}
        </Typography>
      </CTASection>
    </BaseLayout>
  );
};

export default TeamDetails;
