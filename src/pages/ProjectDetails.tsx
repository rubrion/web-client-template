import { Paper, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import { TeamMemberType } from '../components/ui/Card/TeamCard';
import { useContentById } from '../hooks/useContent';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockProject } from '../services/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  // Use the hook directly for project details translations
  const { getRequiredContent: getProjectText } = useLocalizedContent(
    'screens',
    'projectDetail'
  );
  const { getRequiredContent: getNavText } = useLocalizedContent(
    'navigation',
    'menu'
  );

  // Since id comes from URL params, make a safety check
  if (!id) {
    return (
      <BaseLayout>
        <Paper sx={{ p: 3, m: 3, borderRadius: theme.shape.borderRadius }}>
          <Typography variant="h5" color="error">
            Invalid project ID
          </Typography>
        </Paper>
      </BaseLayout>
    );
  }

  // Pre-fetch project to build sidebar sections based on the data
  // Note: The ContentDetailPage will do its own fetching, this is just for sidebar config
  const { document: project } = useContentById<MockProject>('projects', id);

  // Breadcrumb items with safe translation
  const breadcrumbs = [
    {
      label: getNavText<string>('home'),
      href: ROUTES.PUBLIC.HOME.path,
    },
    {
      label: getNavText<string>('projects'),
      href: ROUTES.PROJECTS.ROOT.path,
    },
    {
      label: project?.title || id, // Will use real title if available, otherwise ID
    },
  ];

  // Prepare participants if they exist on the project data
  const participants: TeamMemberType[] = useMemo(() => {
    if (!project?.meta?.team) return [];

    return project.meta.team.map((member: any) => ({
      name: member.name || '',
      role: member.role || '',
      image: member.image || '',
      contact: member.email,
    }));
  }, [project]);

  // Prepare sidebar meta sections based on available project data
  const metaSections: MetaDisplay[] = [];

  // Only add sections if we have the project data
  if (project) {
    // Basic info section
    const basicInfoItems = [];

    if (project.category) {
      basicInfoItems.push({
        label: getProjectText<string>('details.category'),
        value: project.category,
      });
    }

    if (project.date) {
      basicInfoItems.push({
        label: getProjectText<string>('details.date'),
        value: project.date,
      });
    }

    if (basicInfoItems.length > 0) {
      metaSections.push({
        title: getProjectText<string>('sections.basicInfo'),
        values: basicInfoItems,
      });
    }

    // Technologies section
    if (project.meta?.technologies && project.meta.technologies.length > 0) {
      metaSections.push({
        title: getProjectText<string>('details.technologies'),
        values: [
          {
            label: '',
            value: (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                }}
              >
                {project.meta.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.06)',
                      padding: '2px 8px',
                      borderRadius: theme.shape.borderRadius,
                      marginRight: '4px',
                      marginBottom: '4px',
                      fontSize: '0.85rem',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ),
          },
        ],
      });
    }
  }

  // External links based on project data
  const links = [];

  if (project?.meta?.github) {
    links.push({
      label: getProjectText<string>('details.github'),
      url: project.meta.github,
    });
  }

  if (project?.meta?.website) {
    links.push({
      label: getProjectText<string>('details.website'),
      url: project.meta.website,
    });
  }

  // Complete sidebar configuration
  const sidebar: SidebarConfig = {
    metaSections,
    links: links.length > 0 ? links : undefined,
  };

  // CTA configuration
  const cta = {
    overline: getProjectText<string>('cta.overline'),
    title: getProjectText<string>('cta.title'),
    buttons: [
      {
        text: getProjectText<string>('cta.button'),
        href: ROUTES.PUBLIC.CONTACT.path,
        variant: 'outlined' as const,
      },
      {
        text: getProjectText<string>('navigation.back'),
        href: ROUTES.PROJECTS.ROOT.path,
        variant: 'outlined' as const,
      },
    ],
  };

  return (
    <BaseLayout>
      <ContentDetailPage
        resource="projects"
        i18nBase="screens.projectDetail"
        id={id}
        breadcrumbs={breadcrumbs}
        linkToList={ROUTES.PROJECTS.ROOT.path}
        sidebar={sidebar}
        cta={cta}
        participants={participants}
      />
    </BaseLayout>
  );
};

export default ProjectDetails;
