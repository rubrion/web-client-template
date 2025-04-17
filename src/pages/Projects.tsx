import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CTASection, HeroSection, LoadingIndicator } from '../components/ui';
import ContentCard, { ContentItem } from '../components/ui/Card/ContentCard';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { fetchProjects, Project } from '../services/projects';
import { createScrollRoute } from '../utils/navigationUtils';
import {
  getStringContent,
  getTranslatableContent,
} from '../utils/translationUtils';

const Projects: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'projects');
  const initialPage = params.page ? parseInt(params.page, 10) : 1;

  const projectsData = {
    hero: {
      title: getContent<string>('hero.title'),
      subtitle: getContent<string>('hero.subtitle'),
      overline: getContent<string>('hero.overline'),
      buttonText: getContent<string>('hero.buttonText'),
    },
    showcase: {
      overline: getContent<string>('showcase.overline'),
      title: getContent<string>('showcase.title'),
      viewDetails: getContent<string>('showcase.viewDetails'),
      noProjectsTitle: getContent<string>('showcase.noProjectsTitle'),
      noProjectsMessage: getContent<string>('showcase.noProjectsMessage'),
    },
    loading: {
      projects: getContent<string>('loading.projects'),
      updating: getContent<string>('loading.updating'),
    },
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const projectsPerPage = 9;

  // NOTE: This is a fully functional implementation using React Query.
  // It's kept commented to avoid disrupting the existing implementation.
  // This will be refactored in a separate PR.

  /* 
    // Example of how to use the React Query hook:
    const projectsQuery = useProjects(page, projectsPerPage);
    
    // Check if we're loading or have error
    if (projectsQuery.isLoading) {
        // Show loading state
    }
    
    if (projectsQuery.error) {
        // Handle error
    }
    
    // Access data
    const projects = projectsQuery.data?.items || [];
    const totalPages = projectsQuery.data?.totalPages || 1;
    */

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get('scrollTo');

    if (scrollToId) {
      setTimeout(() => {
        scrollToElement(scrollToId);
      }, 100);
    }
  }, [location.search, scrollToElement]);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects(page, projectsPerPage);

        if (
          typeof data === 'object' &&
          data !== null &&
          'projects' in data &&
          'totalPages' in data
        ) {
          setProjects(data.projects);
          setTotalPages(data.totalPages);

          if (page > data.totalPages && data.totalPages > 0) {
            setPage(data.totalPages);
            navigate(ROUTES.PROJECTS.LIST_PAGED({ page: data.totalPages }));
          }
        } else {
          const allProjects = Array.isArray(data) ? data : [];
          const calculatedTotalPages = Math.ceil(
            allProjects.length / projectsPerPage
          );
          const startIndex = (page - 1) * projectsPerPage;
          const endIndex = startIndex + projectsPerPage;
          const paginatedProjects = allProjects.slice(startIndex, endIndex);

          setProjects(paginatedProjects);
          setTotalPages(calculatedTotalPages);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [page, projectsPerPage, navigate]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    navigate(ROUTES.PROJECTS.LIST_PAGED({ page: value }));
  };

  const mapProjectsToContentItems = (projects: Project[]): ContentItem[] => {
    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      ctaLink: ROUTES.PROJECTS.PROJECT_DETAIL({ id: project.id }),
      ctaText: getStringContent(
        projectsData.showcase.viewDetails,
        'projects.showcase.viewDetails'
      ),
    }));
  };

  if (loading && projects.length === 0) {
    return (
      <BaseLayout>
        <HeroSection
          title={getTranslatableContent(
            projectsData.hero.title,
            'projects.hero.title'
          )}
          subtitle={getTranslatableContent(
            projectsData.hero.subtitle,
            'projects.hero.subtitle'
          )}
          overline={getTranslatableContent(
            projectsData.hero.overline,
            'projects.hero.overline'
          )}
          buttons={[
            {
              text: getStringContent(
                projectsData.hero.buttonText,
                'projects.hero.buttonText'
              ),
              onClick: () =>
                navigate(
                  createScrollRoute(
                    ROUTES.PUBLIC.SERVICES.path,
                    'services-section'
                  )
                ),
            },
          ]}
        />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator
            message={getStringContent(
              projectsData.loading.projects,
              'projects.loading.projects'
            )}
            fullHeight
          />
        </Container>
      </BaseLayout>
    );
  }

  if (projects.length === 0) {
    return (
      <BaseLayout>
        <HeroSection
          title={getTranslatableContent(
            projectsData.hero.title,
            'projects.hero.title'
          )}
          subtitle={getTranslatableContent(
            projectsData.hero.subtitle,
            'projects.hero.subtitle'
          )}
          overline={getTranslatableContent(
            projectsData.hero.overline,
            'projects.hero.overline'
          )}
          buttons={[
            {
              text: getStringContent(
                projectsData.hero.buttonText,
                'projects.hero.buttonText'
              ),
              onClick: () =>
                navigate(
                  createScrollRoute(
                    ROUTES.PUBLIC.SERVICES.path,
                    'services-section'
                  )
                ),
            },
          ]}
        />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            {getTranslatableContent(
              projectsData.showcase.noProjectsTitle,
              'projects.showcase.noProjectsTitle'
            )}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: 'center' }}
          >
            {getTranslatableContent(
              projectsData.showcase.noProjectsMessage,
              'projects.showcase.noProjectsMessage'
            )}
          </Typography>
        </Container>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div id="projects-section">
        <HeroSection
          title={getTranslatableContent(
            projectsData.hero.title,
            'projects.hero.title'
          )}
          subtitle={getTranslatableContent(
            projectsData.hero.subtitle,
            'projects.hero.subtitle'
          )}
          overline={getTranslatableContent(
            projectsData.hero.overline,
            'projects.hero.overline'
          )}
          buttons={[
            {
              text: getStringContent(
                projectsData.hero.buttonText,
                'projects.hero.buttonText'
              ),
              onClick: () =>
                navigate(
                  createScrollRoute(
                    ROUTES.PUBLIC.SERVICES.path,
                    'services-section'
                  )
                ),
            },
          ]}
        />

        <CTASection
          id="projects-content"
          overline={getTranslatableContent(
            projectsData.showcase.overline,
            'projects.showcase.overline'
          )}
          title={getTranslatableContent(
            projectsData.showcase.title,
            'projects.showcase.title'
          )}
          maxWidth="lg"
        >
          {loading ? (
            <LoadingIndicator
              message={getStringContent(
                projectsData.loading.updating,
                'projects.loading.updating'
              )}
            />
          ) : (
            <>
              <Grid container spacing={4}>
                {mapProjectsToContentItems(projects).map(
                  (contentItem, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={contentItem.id}>
                      <ContentCard
                        item={contentItem}
                        variant={index === 0 ? 'featured' : 'default'}
                        imageAspectRatio="56.25%" // 16:9
                      />
                    </Grid>
                  )
                )}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </CTASection>
      </div>
    </BaseLayout>
  );
};

export default Projects;
