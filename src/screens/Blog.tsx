import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Pagination,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeroSection } from '../components/ui';
import ROUTES from '../routes';
import { fetchBlogPosts } from '../services/blog';
import NewsletterPopup from '../components/ui/Newsletter';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        // Ensure data is an array
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        // Set empty array if error occurs
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setNewsletterOpen(false);
  };

  // Calculate pagination
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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

  // If posts is empty, show a message
  if (posts.length === 0) {
    return (
      <Box>
        <HeroSection
          title="Our Blog"
          subtitle="Stay updated with the latest news, insights, and trends in our industry."
          overline="BLOG"
          imageSrc="blog-hero.png"
          buttons={[{ text: 'Subscribe', onClick: handleOpenNewsletter }]}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            No Blog Posts Available
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Check back soon for new content!
          </Typography>
        </Container>

        <NewsletterPopup open={newsletterOpen} onClose={handleCloseNewsletter} />
      </Box>
    );
  }

  return (
    <Box>
      <HeroSection
        title="Our Blog"
        subtitle="Stay updated with the latest news, insights, and trends in our industry."
        overline="BLOG"
        buttons={[
          {
            text: 'Subscribe',
            onClick: handleOpenNewsletter,
          },
        ]}
      />

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Latest Articles
        </Typography>

        <Grid2 container spacing={4}>
          {currentPosts.map((post) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 0,
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    bgcolor: 'primary.light',
                    backgroundImage: `url(blog-${post.id}.jpg)`,
                    backgroundSize: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.summary}
                  </Typography>
                  <Button
                    component={Link}
                    to={ROUTES.BLOG.POST_DETAIL({ id: post.id })}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenNewsletter}
          >
            Subscribe to Our Newsletter
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          Get the latest articles delivered directly to your inbox
        </Typography>
      </Container>

      <NewsletterPopup open={newsletterOpen} onClose={handleCloseNewsletter} />
    </Box>
  );
};

export default Blog;