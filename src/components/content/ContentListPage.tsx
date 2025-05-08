import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';
import { usePaginatedContent } from '../../hooks/useContent';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { useScrollTo } from '../../hooks/useScrollTo';
import { CommonContent, ContentResource } from '../../types/content';
import { createLanguageAwareRoute } from '../../utils/languageUtils';
import MissingTranslation from '../translation/MissingTranslation';
import { CTASection, HeroSection, LoadingIndicator } from '../ui';
import ContentCard, { ContentItem } from '../ui/Card/ContentCard';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroButton {
  text: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'inherit';
  href?: string;
}

interface ContentListPageProps<T extends CommonContent> {
  /** The resource type identifier ('blogPosts', 'projects') */
  resource: ContentResource;

  /** Base i18n path for accessing translations (e.g. 'screens.blog') */
  i18nBase: string;

  /** Current page from route params */
  currentPage?: number;

  /** Number of items to show per page */
  itemsPerPage?: number;

  /** Buttons to display in the hero section */
  heroButtons?: HeroButton[];

  /** Function to create a link to a detail page for an item */
  linkToItem: (id: string) => string;

  /** Function to create a link to a specific page of the list */
  linkToPage?: (page: number) => string;

  /** Breadcrumb items to display */
  breadcrumbs?: BreadcrumbItem[];

  /** Custom translation namespace (defaults to resource name) */
  translationNamespace?: string;

  /** Custom ID for the content section */
  contentSectionId?: string;

  /** Custom newsletter component to render */
  newsletter?: React.ReactNode;

  /** Map function to convert content items to ContentItem format */
  mapToContentItems?: (items: T[]) => ContentItem[];
}

/**
 * Generic content list page that works with any content type
 */
function ContentListPage<T extends CommonContent>({
  resource,
  i18nBase,
  currentPage = 1,
  itemsPerPage = 9,
  heroButtons = [],
  linkToItem,
  linkToPage,
  translationNamespace,
  contentSectionId = 'content-section',
  newsletter,
  mapToContentItems,
}: ContentListPageProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { language } = useLanguage();
  const [page, setPage] = useState(currentPage);

  // Use the namespace from props or fallback to resource name
  const namespace = translationNamespace || resource;

  // Get translations specific to this list - using proper path resolution
  const { getRequiredContent, getContent } = useLocalizedContent(
    'screens',
    namespace
  );

  // Fetch content using the unified hook
  const {
    data: contentData,
    isLoading,
    error,
  } = usePaginatedContent<T>(resource, page, itemsPerPage, undefined, language);

  // Initialize translations based on the i18n path - fixing path resolution issue
  const translations = useMemo(
    () => ({
      hero: {
        title: getRequiredContent<string>('hero.title'),
        subtitle: getRequiredContent<string>('hero.subtitle'),
        overline: getRequiredContent<string>('hero.overline'),
      },
      content: {
        overline: getRequiredContent<string>('content.overline'),
        title: getRequiredContent<string>('content.title'),
        readMore: getRequiredContent<string>('content.readMore'),
        viewDetails: getRequiredContent<string>('content.viewDetails'),
        noItemsTitle: getRequiredContent<string>('content.noItemsTitle'),
        noItemsMessage: getRequiredContent<string>('content.noItemsMessage'),
      },
      loading: {
        items: getRequiredContent<string>('loading.items'),
        updating: getRequiredContent<string>('loading.updating'),
      },
    }),
    [getRequiredContent]
  );

  // Check if URL has a scroll target
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get('scrollTo');

    if (scrollToId) {
      setTimeout(() => {
        scrollToElement(scrollToId);
      }, 100);
    }
  }, [location.search, scrollToElement]);

  // Handle page change
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);

    // Navigate to the page route if a link generator is provided
    if (linkToPage) {
      navigate(linkToPage(value));
    }
  };

  // Helper function to render content or MissingTranslation component when null
  const renderContent = (
    content: string | null,
    key: string
  ): React.ReactNode => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  // Default mapper function if none is provided
  const defaultMapToContentItems = (items: T[]): ContentItem[] => {
    return items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      ctaLink: createLanguageAwareRoute(linkToItem(item.id), language),
      ctaText:
        resource === 'blog'
          ? translations.content.readMore
          : translations.content.viewDetails,
      date: item.date,
      author: item.meta?.author,
      tags: item.meta?.tags || [],
    }));
  };

  // Use provided mapper or default one
  const finalMapToContentItems = mapToContentItems || defaultMapToContentItems;

  // Display loading state when first loading
  if (isLoading && !contentData) {
    return (
      <>
        <HeroSection
          title={translations.hero.title}
          subtitle={translations.hero.subtitle}
          overline={translations.hero.overline}
          buttons={heroButtons}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator message={translations.loading.items} fullHeight />
        </Container>

        {newsletter}
      </>
    );
  }

  // Display error or empty state
  const hasEmptyItems = contentData?.items?.length === 0;
  if (error || !contentData || hasEmptyItems) {
    return (
      <>
        <HeroSection
          title={renderContent(
            translations.hero.title,
            `screens.${namespace}.hero.title`
          )}
          subtitle={renderContent(
            translations.hero.subtitle,
            `screens.${namespace}.hero.subtitle`
          )}
          overline={renderContent(
            translations.hero.overline,
            `screens.${namespace}.hero.overline`
          )}
          buttons={heroButtons}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            {renderContent(
              translations.content.noItemsTitle,
              `screens.${namespace}.content.noItemsTitle`
            )}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: 'center' }}
          >
            {renderContent(
              translations.content.noItemsMessage,
              `screens.${namespace}.content.noItemsMessage`
            )}
          </Typography>
        </Container>

        {newsletter}
      </>
    );
  }

  // Main content display
  return (
    <>
      <HeroSection
        title={renderContent(
          translations.hero.title,
          `screens.${namespace}.hero.title`
        )}
        subtitle={renderContent(
          translations.hero.subtitle,
          `screens.${namespace}.hero.subtitle`
        )}
        overline={renderContent(
          translations.hero.overline,
          `screens.${namespace}.hero.overline`
        )}
        buttons={heroButtons}
      />

      <CTASection
        id={contentSectionId}
        overline={renderContent(
          translations.content.overline,
          `screens.${namespace}.content.overline`
        )}
        title={renderContent(
          translations.content.title,
          `screens.${namespace}.content.title`
        )}
        maxWidth="lg"
      >
        {isLoading ? (
          <LoadingIndicator message={translations.loading.updating} />
        ) : (
          <>
            <Grid container spacing={4}>
              {finalMapToContentItems(contentData.items).map(
                (contentItem, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={contentItem.id}>
                    <ContentCard
                      item={contentItem}
                      variant={
                        index === 0 && page === 1 ? 'featured' : 'default'
                      }
                      imageAspectRatio={
                        resource === 'projects' ? '75%' : '56.25%'
                      } // 4:3 for projects, 16:9 for blogs
                      showCategory={true}
                    />
                  </Grid>
                )
              )}
            </Grid>

            {contentData.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={contentData.totalPages}
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

      {newsletter}
    </>
  );
}

export default ContentListPage;
