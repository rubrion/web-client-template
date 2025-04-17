import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CTASection, HeroSection, LoadingIndicator } from '../components/ui';
import ContentCard, { ContentItem } from '../components/ui/Card/ContentCard';
import NewsletterPopup from '../components/ui/Newsletter';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { BlogPost, fetchBlogPosts } from '../services/blog';
import {
  getStringContent,
  getTranslatableContent,
} from '../utils/translationUtils';

const Blog: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'blog');
  const initialPage = params.page ? parseInt(params.page, 10) : 1;

  const blogData = {
    hero: {
      title: getContent<string>('hero.title'),
      subtitle: getContent<string>('hero.subtitle'),
      overline: getContent<string>('hero.overline'),
      subscribeButton: getContent<string>('hero.subscribeButton'),
    },
    articles: {
      overline: getContent<string>('articles.overline'),
      title: getContent<string>('articles.title'),
      readMore: getContent<string>('articles.readMore'),
      noPostsTitle: getContent<string>('articles.noPostsTitle'),
      noPostsMessage: getContent<string>('articles.noPostsMessage'),
    },
    loading: {
      posts: getContent<string>('loading.posts'),
      updating: getContent<string>('loading.updating'),
    },
  };

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(initialPage);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogPosts(page, postsPerPage);

        setPosts(data.posts);
        setTotalPages(data.totalPages);

        if (page > data.totalPages && data.totalPages > 0) {
          setPage(data.totalPages);
          navigate(ROUTES.BLOG.LIST_PAGED({ page: data.totalPages }));
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [page, postsPerPage, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get('scrollTo');

    if (scrollToId) {
      setTimeout(() => {
        scrollToElement(scrollToId);
      }, 100);
    }
  }, [location.search]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    navigate(ROUTES.BLOG.LIST_PAGED({ page: value }));
  };

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setNewsletterOpen(false);
  };

  const mapPostsToContentItems = (posts: BlogPost[]): ContentItem[] => {
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      image: post.image || '', // Empty string to use placeholder
      category: post.category,
      ctaLink: ROUTES.BLOG.POST_DETAIL({ id: post.id }),
      ctaText: getStringContent(
        blogData.articles.readMore,
        'blog.articles.readMore'
      ),
      date: post.date,
      author: post.author,
    }));
  };

  const subscribeButtonText = getStringContent(
    blogData.hero.subscribeButton,
    'blog.hero.subscribeButton'
  );

  if (loading && posts.length === 0) {
    return (
      <BaseLayout>
        <HeroSection
          title={getTranslatableContent(blogData.hero.title, 'blog.hero.title')}
          subtitle={getTranslatableContent(
            blogData.hero.subtitle,
            'blog.hero.subtitle'
          )}
          overline={getTranslatableContent(
            blogData.hero.overline,
            'blog.hero.overline'
          )}
          buttons={[
            {
              text: subscribeButtonText,
              onClick: handleOpenNewsletter,
            },
          ]}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator
            message={getStringContent(
              blogData.loading.posts,
              'blog.loading.posts'
            )}
            fullHeight
          />
        </Container>

        <NewsletterPopup
          open={newsletterOpen}
          onClose={handleCloseNewsletter}
        />
      </BaseLayout>
    );
  }

  if (posts.length === 0) {
    return (
      <BaseLayout>
        <HeroSection
          title={getTranslatableContent(blogData.hero.title, 'blog.hero.title')}
          subtitle={getTranslatableContent(
            blogData.hero.subtitle,
            'blog.hero.subtitle'
          )}
          overline={getTranslatableContent(
            blogData.hero.overline,
            'blog.hero.overline'
          )}
          buttons={[
            {
              text: subscribeButtonText,
              onClick: handleOpenNewsletter,
            },
          ]}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            {getTranslatableContent(
              blogData.articles.noPostsTitle,
              'blog.articles.noPostsTitle'
            )}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: 'center' }}
          >
            {getTranslatableContent(
              blogData.articles.noPostsMessage,
              'blog.articles.noPostsMessage'
            )}
          </Typography>
        </Container>

        <NewsletterPopup
          open={newsletterOpen}
          onClose={handleCloseNewsletter}
        />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <HeroSection
        title={getTranslatableContent(blogData.hero.title, 'blog.hero.title')}
        subtitle={getTranslatableContent(
          blogData.hero.subtitle,
          'blog.hero.subtitle'
        )}
        overline={getTranslatableContent(
          blogData.hero.overline,
          'blog.hero.overline'
        )}
        buttons={[
          {
            text: subscribeButtonText,
            onClick: handleOpenNewsletter,
          },
        ]}
      />

      <CTASection
        id="articles-section"
        overline={getTranslatableContent(
          blogData.articles.overline,
          'blog.articles.overline'
        )}
        title={getTranslatableContent(
          blogData.articles.title,
          'blog.articles.title'
        )}
        maxWidth="lg"
      >
        {loading ? (
          <LoadingIndicator
            message={getStringContent(
              blogData.loading.updating,
              'blog.loading.updating'
            )}
          />
        ) : (
          <>
            <Grid container spacing={4}>
              {mapPostsToContentItems(posts).map((contentItem, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={contentItem.id}>
                  <ContentCard
                    item={contentItem}
                    variant={index === 0 ? 'featured' : 'default'}
                    imageAspectRatio="56.25%" // 16:9
                  />
                </Grid>
              ))}
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

      <NewsletterPopup open={newsletterOpen} onClose={handleCloseNewsletter} />
    </BaseLayout>
  );
};

export default Blog;
