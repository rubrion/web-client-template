import React from 'react';
import { useParams } from 'react-router-dom';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import { useContentById } from '../hooks/useContent';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockedBlogPost } from '../services/blog';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { getRequiredContent: getPostContent } =
    useLocalizedContent('postDetail');
  const { getRequiredContent: getNavContent } = useLocalizedContent(
    'navigation',
    'menu'
  );

  // Since id comes from URL params, make a safety check
  if (!id) {
    return (
      <BaseLayout>
        <div>Invalid post ID</div>
      </BaseLayout>
    );
  }

  // Pre-fetch post to build sidebar sections based on the data
  const { document: post } = useContentById<MockedBlogPost>('blog', id);

  // Breadcrumb items
  const breadcrumbs = [
    {
      label: getNavContent<string>('home'),
      href: ROUTES.PUBLIC.HOME.path,
    },
    {
      label: getNavContent<string>('blog'),
      href: ROUTES.BLOG.ROOT.path,
    },
    {
      label: post?.title || id,
    },
  ];

  // Prepare sidebar meta sections based on available post data
  const metaSections: MetaDisplay[] = [];

  // Only add sections if we have the post data
  if (post) {
    // Author info
    if (post.meta?.author) {
      const authorItems = [
        {
          label: getPostContent<string>('details.author'),
          value: post.meta.author,
        },
      ];

      // Add author email if available
      if (post.meta?.email) {
        authorItems.push({
          label: getPostContent<string>('details.email'),
          value: (
            <a href={`mailto:${post.meta.email}`} style={{ color: 'inherit' }}>
              {post.meta.email}
            </a>
          ),
        });
      }

      metaSections.push({
        title: getPostContent<string>('sections.author'),
        values: authorItems,
      });
    }

    // Post details section
    const detailItems = [];

    if (post.date) {
      detailItems.push({
        label: getPostContent<string>('details.publishedOn'),
        value: new Date(post.date).toLocaleDateString(),
      });
    }

    if (post.category) {
      detailItems.push({
        label: getPostContent<string>('details.category'),
        value: post.category,
      });
    }

    if (post.meta?.readTime) {
      detailItems.push({
        label: getPostContent<string>('details.readTime'),
        value: `${post.meta.readTime} min`,
      });
    }

    if (detailItems.length > 0) {
      metaSections.push({
        title: getPostContent<string>('sections.details'),
        values: detailItems,
      });
    }

    // Tags section
    if (post.meta?.tags && post.meta.tags.length > 0) {
      metaSections.push({
        title: getPostContent<string>('sections.tags'),
        values: [
          {
            label: '',
            value: (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {post.meta.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      marginRight: '4px',
                      marginBottom: '4px',
                      fontSize: '0.85rem',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ),
          },
        ],
      });
    }
  }

  // Complete sidebar configuration
  const sidebar: SidebarConfig = {
    metaSections,
    newsletter: {
      title: getPostContent<string>('newsletter.title'),
      description: getPostContent<string>('newsletter.description'),
      buttonText: getPostContent<string>('newsletter.button'),
      buttonLink: ROUTES.PUBLIC.CONTACT.path,
    },
  };

  // CTA configuration
  const cta = {
    overline: getPostContent<string>('cta.overline'),
    title: getPostContent<string>('cta.title'),
    buttons: [
      {
        text: getPostContent<string>('cta.button'),
        href: ROUTES.BLOG.ROOT.path,
        variant: 'outlined' as const,
      },
    ],
  };

  return (
    <BaseLayout>
      <ContentDetailPage
        resource="blog"
        i18nBase="screens.postDetail"
        id={id}
        breadcrumbs={breadcrumbs}
        linkToList={ROUTES.BLOG.ROOT.path}
        sidebar={sidebar}
        cta={cta}
        // Post email is handled in sidebar and in ContentDetailPage component
      />
    </BaseLayout>
  );
};

export default PostDetails;
