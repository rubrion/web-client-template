import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Navbar } from '../components/ui';
import ROUTES from '../routes';
import { fetchBlogPostById } from '../services/blogService';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date?: string;
  author?: string;
  categories?: string[];
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Typography variant="h5">Post not found</Typography>
      </Box>
    );
  }

  // Default values for missing properties
  const postDate = post.date || 'March 15, 2025';
  const author = post.author || 'Admin';
  const categories = post.categories || ['General'];

  return (
    <Box>
      <Navbar />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to={ROUTES.PUBLIC.HOME.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Home
            </Link>
            <Link
              to={ROUTES.BLOG.LIST.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Blog
            </Link>
            <Typography color="text.primary">{post.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Published on {postDate} by {author}
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
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Box>
        </Paper>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={ROUTES.BLOG.LIST.path}
          >
            Back to Blog
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PostDetail;
