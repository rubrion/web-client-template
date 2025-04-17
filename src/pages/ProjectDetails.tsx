import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs, LoadingIndicator } from '../components/ui';
import type { BreadcrumbItem } from '../components/ui/Breadcrumbs';
import PlaceholderImage from '../components/ui/PlaceholderImage';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { fetchProjectById, Project } from '../services/projects';
import { createScrollRoute } from '../utils/navigationUtils';
import {
  getStringContent,
  getTranslatableContent,
} from '../utils/translationUtils';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContent } = useLocalizedContent('screens', 'projectDetail');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Use getContent for translations
  const translations = {
    loading: getContent<string>('loading'),
    updating: getContent<string>('updating'),
    notFound: getContent<string>('notFound'),
    backButton: getContent<string>('backButton'),
    githubRepository: getContent<string>('githubRepository'),
    visitWebsite: getContent<string>('visitWebsite'),
    technologies: getContent<string>('technologies'),
    references: getContent<string>('references'),
    completedOn: getContent<string>('completedOn'),
  };

  // Create simpler breadcrumbs items without icons
  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Projects',
        href: ROUTES.PROJECTS.LIST.path,
      },
      {
        label: project?.title || 'Project Details',
      },
    ],
    [project?.title]
  );

  // Fetch project data only when ID changes
  useEffect(() => {
    let isMounted = true;

    const getProject = async () => {
      if (!id) return;

      try {
        const data = await fetchProjectById(id);

        if (isMounted) {
          setProject(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Failed to fetch project with ID ${id}:`, error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getProject();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBackToProjects = () => {
    navigate(createScrollRoute(ROUTES.PROJECTS.LIST.path, 'projects-section'));
  };

  // Loading state
  if (loading && !project) {
    return (
      <BaseLayout>
        <Breadcrumbs items={breadcrumbs.slice(0, 2)} />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator
            message={getStringContent(
              translations.loading,
              'projectDetail.loading'
            )}
            fullHeight
          />
        </Container>
      </BaseLayout>
    );
  }

  // Not found state
  if (!project) {
    return (
      <BaseLayout>
        <Breadcrumbs items={breadcrumbs.slice(0, 2)} />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            {getTranslatableContent(
              translations.notFound,
              'projectDetail.notFound'
            )}
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleBackToProjects}>
              {getStringContent(
                translations.backButton,
                'projectDetail.backButton'
              )}
            </Button>
          </Box>
        </Container>
      </BaseLayout>
    );
  }

  // Prepare display values
  const projectDate = project.date || 'March 15, 2025';
  const technologies = project.technologies || [];
  const completedText = getStringContent(
    translations.completedOn,
    'projectDetail.completedOn'
  ).replace('{{date}}', projectDate);

  return (
    <BaseLayout>
      <Breadcrumbs items={breadcrumbs} />
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              {project.image ? (
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    // Handle image loading errors
                    e.currentTarget.style.display = 'none';
                    // Display a placeholder instead - this will be handled by the component below
                  }}
                />
              ) : (
                <Box sx={{ maxHeight: 400 }}>
                  <PlaceholderImage
                    type="project"
                    title={project.title}
                    aspectRatio="21/9"
                  />
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {project.title}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                  typography: 'body1',
                  mb: 2,
                }}
              >
                {project.category && (
                  <Chip label={project.category} size="small" sx={{ mr: 1 }} />
                )}
                <span>{completedText}</span>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                {project.description}
              </Typography>

              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {project.github && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    component={Link}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getStringContent(
                      translations.githubRepository,
                      'projectDetail.githubRepository'
                    )}
                  </Button>
                )}

                {project.website && (
                  <Button
                    variant="outlined"
                    startIcon={<LinkIcon />}
                    component={Link}
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getStringContent(
                      translations.visitWebsite,
                      'projectDetail.visitWebsite'
                    )}
                  </Button>
                )}
              </Box>

              <Divider sx={{ my: 4 }} />

              {technologies.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {getTranslatableContent(
                      translations.technologies,
                      'projectDetail.technologies'
                    )}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {technologies.map((tech, index) => (
                      <Chip key={index} label={tech} />
                    ))}
                  </Box>
                </Box>
              )}

              <Box sx={{ '& img': { maxWidth: '100%', height: 'auto' } }}>
                <div
                  dangerouslySetInnerHTML={{ __html: project.content || '' }}
                />
              </Box>

              {project.references && project.references.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {getTranslatableContent(
                      translations.references,
                      'projectDetail.references'
                    )}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {project.references.map((ref, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Link
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          {ref.type === 'article' ? (
                            <ArticleIcon fontSize="small" />
                          ) : (
                            <LinkIcon fontSize="small" />
                          )}
                          {ref.title}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Box
          sx={{
            mt: 6,
            mb: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToProjects}
          >
            {getStringContent(
              translations.backButton,
              'projectDetail.backButton'
            )}
          </Button>
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default ProjectDetails;
