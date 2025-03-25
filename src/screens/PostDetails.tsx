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
import { Link, useNavigate, useParams } from 'react-router-dom';

import { LoadingIndicator, Navbar } from '../components/ui';
import ROUTES from '../routes';
import { fetchBlogPostById } from '../services/blog';
import { createScrollRoute } from '../utils/navigationUtils';

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
  const navigate = useNavigate();
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

  const handleBackToBlog = () => {
    // Navigate to blog with a scroll target to the articles section
    navigate(createScrollRoute(ROUTES.BLOG.LIST.path, 'articles-section'));
  };

  if (loading && !post) {
    return (
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator message="Loading post details" fullHeight />
        </Container>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Post not found
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleBackToBlog}
            >
              Back to Blog
            </Button>
          </Box>
        </Container>
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
        {loading ? (
          <LoadingIndicator message="Updating post content" />
        ) : (
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
        )}

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToBlog}
          >
            Back to Blog
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PostDetail;
