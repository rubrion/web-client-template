import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useContentById } from '../../hooks/useContent';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { spacing } from '../../theme/themeUtils';
import { CommonContent, ContentResource } from '../../types/content';
import MissingTranslation from '../translation/MissingTranslation';
import { Breadcrumbs, CTASection, LoadingIndicator } from '../ui';
import TeamCard, { TeamMemberType } from '../ui/Card/TeamCard';
import { BreadcrumbItem } from './ContentListPage';

export interface CTAButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'inherit';
}

export interface MetaDisplay {
  title: string;
  values: Array<{ label: string; value: React.ReactNode }>;
}

export interface SidebarConfig {
  metaSections?: MetaDisplay[];
  links?: Array<{ label: string; url: string }>;
  newsletter?: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

interface ContentDetailPageProps {
  resource: ContentResource;

  i18nBase: string;
  id: string;
  breadcrumbs?: BreadcrumbItem[];
  linkToList: string;
  sidebar?: SidebarConfig;

  cta?: {
    overline?: string;
    title: string;
    description?: string;
    buttons?: CTAButtonConfig[];
  };

  translationNamespace?: string;

  afterContent?: React.ReactNode;

  participants?: TeamMemberType[];
}

/**
 * Generic content detail page that works with any content type
 */
function ContentDetailPage({
  resource,
  i18nBase,
  id,
  breadcrumbs,
  linkToList,
  sidebar,
  cta,
  translationNamespace,
  afterContent,
  participants,
}: ContentDetailPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use the namespace from props or fallback to resource name
  const namespace = translationNamespace || resource;

  // Get translations specific to this detail page - using proper path resolution
  const { getRequiredContent, getContent } = useLocalizedContent(
    'screens',
    namespace
  );

  const {
    document: item,
    isLoading,
    isError,
    isUsingFallback,
    langUsed,
  } = useContentById<CommonContent>(resource, id);

  // Initialize translations based on the i18n path - fixing path resolution issue
  const translations = useMemo(
    () => ({
      loading: getRequiredContent<string>('loading.title'),
      notFound: {
        title: getContent<string>('notFound.title'),
        message: getContent<string>('notFound.message'),
        button: getContent<string>('notFound.button'),
      },
      details: {
        author: getContent<string>('details.author'),
        date: getContent<string>('details.date'),
        category: getContent<string>('details.category'),
        readTime: getContent<string>('details.readTime'),
        publishedOn: getContent<string>('details.publishedOn'),
        share: getContent<string>('details.share'),
        email: getContent<string>('details.email'),
        participants: getRequiredContent<string>('details.participants'),
      },
      navigation: {
        back: getContent<string>('navigation.back'),
        next: getContent<string>('navigation.next'),
        previous: getContent<string>('navigation.previous'),
      },
      fallback: {
        message: getContent<string>('fallback.message'),
      },
    }),
    [getRequiredContent, getContent]
  );

  // Helper function to render content or MissingTranslation component when null
  const renderContent = (
    content: string | null,
    key: string
  ): React.ReactNode => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ my: spacing.lg }}>
        <LoadingIndicator message={translations.loading} fullHeight />
      </Container>
    );
  }

  if (isError || !item) {
    return (
      <Container maxWidth="lg" sx={{ my: spacing.lg, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {renderContent(
            translations.notFound.title,
            `screens.${namespace}.notFound.title`
          )}
        </Typography>
        <Typography variant="body1" paragraph>
          {renderContent(
            translations.notFound.message,
            `screens.${namespace}.notFound.message`
          ) || 'The requested item could not be found.'}
        </Typography>
        <Button
          component={RouterLink}
          to={linkToList}
          variant="contained"
          color="primary"
          sx={{ mt: spacing.md }}
        >
          {renderContent(
            translations.navigation.back,
            `screens.${namespace}.navigation.back`
          )}
        </Button>
      </Container>
    );
  }

  const isProject = resource === 'projects';
  const isPost = resource === 'blog';

  return (
    <>
      {/* Language fallback notification */}
      {isUsingFallback && (
        <Alert
          severity="warning"
          sx={{
            borderRadius: 0,
            justifyContent: 'center',
            bgcolor: 'warning.light',
            color: 'warning.contrastText',
          }}
        >
          {renderContent(
            translations.fallback.message,
            `screens.${namespace}.fallback.message`
          )}{' '}
          ({langUsed.toUpperCase()})
        </Alert>
      )}

      {/* Hero section with cover image */}
      <Box
        sx={{
          backgroundImage: item.image
            ? `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${item.image})`
            : `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '260px', md: '320px' },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
            pb: { xs: 3, md: 4 },
            color: theme.palette.common.white,
          }}
        >
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 8 }}>
              {item.category && (
                <Typography
                  variant="overline"
                  component="span"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: theme.palette.common.white,
                    px: 2,
                    py: 0.5,
                    borderRadius: theme.shape.borderRadius,
                    mb: 1.5,
                    display: 'inline-block',
                  }}
                >
                  {item.category}
                </Typography>
              )}

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  mb: 1.5,
                  color: theme.palette.common.white,
                }}
              >
                {item.title}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  mt: { xs: 1, md: 0 },
                }}
              >
                {item.meta?.author && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        mr: 1,
                        bgcolor: 'primary.main',
                      }}
                    >
                      {typeof item.meta.author === 'string'
                        ? item.meta.author.charAt(0)
                        : 'A'}
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.common.white }}
                    >
                      {typeof item.meta.author === 'string'
                        ? item.meta.author
                        : 'Author'}
                    </Typography>
                  </Box>
                )}

                {item.date && (
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.common.white }}
                  >
                    {new Date(item.date).toLocaleDateString(langUsed, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                )}

                {/* Language indicator */}
                {langUsed && (
                  <Chip
                    label={langUsed.toUpperCase()}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.6)',
                      color: theme.palette.common.white,
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Breadcrumbs */}
      {breadcrumbs && (
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Breadcrumbs items={breadcrumbs} />
        </Box>
      )}

      {/* Main content */}
      <Box sx={{ bgcolor: theme.palette.background.default, py: spacing.lg }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            sx={{ width: '100%' }}
            direction={isMobile ? 'column-reverse' : 'row'}
          >
            {/* Main content area */}
            <Grid size={{ xs: 12, md: sidebar ? 8 : 12 }}>
              {/* Content body */}
              <Paper
                sx={{
                  p: { xs: 2, sm: 3 },
                  boxShadow: theme.shadows[1],
                  borderRadius: theme.shape.borderRadius,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Box
                  sx={{
                    typography: 'body1',
                    color: 'text.primary',
                    '& a': { color: 'primary.main' },
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                      color: 'text.primary',
                    },
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: item.body }} />
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box>
                    {item.category && (
                      <Chip
                        label={item.category}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Post author email display */}
                {isPost && item.meta?.email && (
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mr: 1 }}
                    >
                      {renderContent(
                        translations.details.email,
                        `screens.${namespace}.details.email`
                      )}
                      :
                    </Typography>
                    <Link href={`mailto:${item.meta.email}`} color="primary">
                      {item.meta.email}
                    </Link>
                  </Box>
                )}
              </Paper>

              {/* Project Participants Section */}
              {isProject && participants && participants.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      mb: 2,
                    }}
                  >
                    {translations.details.participants}
                  </Typography>
                  <Grid container spacing={3} sx={{ width: '100%' }}>
                    {participants.map((member, index) => (
                      <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={`participant-${index}`}
                      >
                        <TeamCard member={member} variant="simple" />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {afterContent && <Box sx={{ mt: 4 }}>{afterContent}</Box>}
            </Grid>

            {/* Sidebar */}
            {sidebar && (
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ mb: { xs: 3, md: 0 } }}>
                  {/* Meta sections */}
                  {sidebar.metaSections &&
                    sidebar.metaSections.map((section, sectionIndex) => (
                      <Paper
                        key={`meta-section-${sectionIndex}`}
                        sx={{
                          mb: 3,
                          p: 2.5,
                          boxShadow: theme.shadows[1],
                          borderRadius: theme.shape.borderRadius,
                          bgcolor: theme.palette.background.paper,
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          color="text.primary"
                          sx={{ fontWeight: 600 }}
                        >
                          {section.title}
                        </Typography>
                        <List dense>
                          {section.values.map((item, index) => (
                            <ListItem key={`meta-item-${index}`} sx={{ px: 0 }}>
                              <Box sx={{ width: '100%' }}>
                                {item.label && (
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    component="div"
                                    color="text.secondary"
                                  >
                                    {item.label}
                                  </Typography>
                                )}
                                <Typography
                                  variant="body2"
                                  component="div"
                                  color="text.primary"
                                >
                                  {item.value}
                                </Typography>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    ))}

                  {/* External links */}
                  {sidebar.links && sidebar.links.length > 0 && (
                    <Paper
                      sx={{
                        mb: 3,
                        p: 2.5,
                        boxShadow: theme.shadows[1],
                        borderRadius: theme.shape.borderRadius,
                        bgcolor: theme.palette.background.paper,
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        color="text.primary"
                        sx={{ fontWeight: 600 }}
                      >
                        Links
                      </Typography>
                      <List dense>
                        {sidebar.links.map((link, index) => (
                          <ListItem key={`link-${index}`} sx={{ px: 0 }}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="primary"
                            >
                              {link.label}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  )}

                  {/* Newsletter signup */}
                  {sidebar.newsletter && (
                    <Paper
                      sx={{
                        p: 2.5,
                        boxShadow: theme.shadows[1],
                        borderRadius: theme.shape.borderRadius,
                        bgcolor: theme.palette.background.paper,
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        color="text.primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {sidebar.newsletter.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        paragraph
                        color="text.secondary"
                      >
                        {sidebar.newsletter.description}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component={RouterLink}
                        to={sidebar.newsletter.buttonLink}
                      >
                        {sidebar.newsletter.buttonText}
                      </Button>
                    </Paper>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      {cta && (
        <CTASection
          overline={cta.overline}
          title={cta.title}
          description={cta.description}
          backgroundColor="primary.main"
          sx={{
            py: { xs: 4, md: 5 },
            color: theme.palette.common.white,
            '& h2': { color: theme.palette.common.white },
            '& h3': { color: theme.palette.common.white },
            '& p': { color: theme.palette.common.white },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              mt: 3,
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
            }}
          >
            {cta.buttons?.map((button, idx) => (
              <Button
                key={`cta-button-${idx}`}
                variant={button.variant || 'outlined'}
                color={button.color || 'inherit'}
                size="large"
                component={button.href ? RouterLink : 'button'}
                to={button.href}
                onClick={button.onClick}
                sx={{
                  color: theme.palette.common.white,
                  borderColor: 'rgba(255,255,255,0.7)',
                }}
              >
                {button.text}
              </Button>
            ))}
            {!cta.buttons && (
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to={linkToList}
                sx={{
                  color: theme.palette.common.white,
                  borderColor: 'rgba(255,255,255,0.7)',
                }}
              >
                {renderContent(
                  translations.navigation.back,
                  `screens.${namespace}.navigation.back`
                )}
              </Button>
            )}
          </Box>
        </CTASection>
      )}
    </>
  );
}

export default ContentDetailPage;
