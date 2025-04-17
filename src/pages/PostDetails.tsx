import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs, LoadingIndicator } from '../components/ui';
import type { BreadcrumbItem } from '../components/ui/Breadcrumbs';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { BlogPost, fetchBlogPostById } from '../services/blog';
import { createScrollRoute } from '../utils/navigationUtils';
import {
  getStringContent,
  getTranslatableContent,
} from '../utils/translationUtils';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContent } = useLocalizedContent('screens', 'post');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const postData = {
    loading: getContent<string>('loading'),
    updating: getContent<string>('updating'),
    notFound: getContent<string>('notFound'),
    backButton: getContent<string>('backButton'),
    publishedOn: getContent<string>('publishedOn'),
  };

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Blog',
        href: ROUTES.BLOG.LIST.path,
      },
      {
        label: post?.title || 'Blog Post',
      },
    ],
    [post?.title]
  );

  useEffect(() => {
    const getPost = async () => {
      try {
        if (id) {
          const data = await fetchBlogPostById(id);
          setPost(data);
        }
      } catch (error) {
        console.error(`Failed to fetch post with ID ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  const handleBackToBlog = () => {
    navigate(createScrollRoute(ROUTES.BLOG.LIST.path, 'articles-section'));
  };

  if (loading && !post) {
    return (
      <BaseLayout>
        <Breadcrumbs items={breadcrumbs.slice(0, 2)} />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator
            message={getStringContent(postData.loading, 'post.loading')}
            fullHeight
          />
        </Container>
      </BaseLayout>
    );
  }

  if (!post) {
    return (
      <BaseLayout>
        <Breadcrumbs items={breadcrumbs.slice(0, 2)} />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            {getTranslatableContent(postData.notFound, 'post.notFound')}
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleBackToBlog}>
              {getStringContent(postData.backButton, 'post.backButton')}
            </Button>
          </Box>
        </Container>
      </BaseLayout>
    );
  }

  const postDate = post.date || 'March 15, 2025';
  const author = post.author || 'Admin';
  const categories = post.categories || ['General'];

  const publishedText = getStringContent(
    postData.publishedOn,
    'post.publishedOn'
  )
    .replace('{{date}}', postDate)
    .replace('{{author}}', author);

  return (
    <BaseLayout>
      <Breadcrumbs items={breadcrumbs} />
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>

        <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {publishedText}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ '& img': { maxWidth: '100%', height: 'auto' } }}>
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </Box>
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
            onClick={handleBackToBlog}
          >
            {getStringContent(postData.backButton, 'post.backButton')}
          </Button>
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default PostDetail;
