import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContentListPage, {
  HeroButton,
} from '../components/content/ContentListPage';
import { ContentItem } from '../components/ui/Card/ContentCard';
import NewsletterPopup from '../components/ui/Newsletter';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockedBlogPost } from '../services/blog';

const Blog: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const initialPage = params.page ? parseInt(params.page, 10) : 1;
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  // Fix: Pass 'screens.blog' as the namespace path instead of using 'screens' and 'blog' separately
  const { getRequiredContent } = useLocalizedContent('screens');

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setNewsletterOpen(false);
  };

  const heroButtons: HeroButton[] = [
    {
      // Fix: Access the complete path to the translation key
      text: getRequiredContent<string>('blog.hero.subscribeButton'),
      onClick: handleOpenNewsletter,
      variant: 'contained',
      color: 'primary',
    },
  ];

  const newsletterComponent = (
    <NewsletterPopup open={newsletterOpen} onClose={handleCloseNewsletter} />
  );

  const mapToContentItems = useMemo(() => {
    return (items: MockedBlogPost[]): ContentItem[] => {
      return items.map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category,
          ctaLink: ROUTES.BLOG.POST_DETAIL({ id: String(item.id) }),
          // Fix: Access the complete path to the translation key
          ctaText: getRequiredContent<string>('blog.content.readMore'),
          date: item.date,
          author: item.meta?.author,
          tags: item.meta?.tags || [],
        };
      });
    };
  }, [getRequiredContent]);

  return (
    <BaseLayout>
      <ContentListPage
        resource="blog"
        i18nBase="screens.blog"
        currentPage={initialPage}
        itemsPerPage={9}
        heroButtons={heroButtons}
        linkToItem={(id) => ROUTES.BLOG.POST_DETAIL({ id })}
        linkToPage={(page) => ROUTES.BLOG.LIST_PAGED({ page })}
        contentSectionId="articles-section"
        newsletter={newsletterComponent}
        mapToContentItems={mapToContentItems}
      />
    </BaseLayout>
  );
};

export default Blog;
