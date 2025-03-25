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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { CTASection, HeroSection, LoadingIndicator } from '../components/ui';
import NewsletterPopup from '../components/ui/Newsletter';
import { useScrollTo } from '../hooks/useScrollTo';
import ROUTES from '../routes';
import { fetchBlogPosts } from '../services/blog';
import { gridSizes } from '../theme/themeUtils';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
}

interface PaginatedResponse {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

const Blog: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const initialPage = params.page ? parseInt(params.page, 10) : 1;

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(initialPage);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9; // Updated to 9 posts per page

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        console.log(`Fetching posts for page ${page} with limit ${postsPerPage}`);
        const data = await fetchBlogPosts(page, postsPerPage);

        if (typeof data === 'object' && data !== null && 'posts' in data && 'totalPages' in data) {
          console.log(`Received ${data.posts.length} posts from pagination data`);
          console.log(`Total pages: ${data.totalPages}`);

          setPosts(data.posts);
          setTotalPages(data.totalPages);

          // Validate page number
          if (page > data.totalPages && data.totalPages > 0) {
            // Redirect to the last available page if current page is too high
            setPage(data.totalPages);
            if (data.totalPages === 1) {
              navigate(ROUTES.BLOG.LIST.path);
            } else {
              navigate(ROUTES.BLOG.LIST_PAGED({ page: data.totalPages }));
            }
          }
        } else {
          // This branch should not be used if we're using the mock pagination correctly
          console.log("Received non-paginated data, performing client-side pagination");
          const allPosts = Array.isArray(data) ? data : [];
          console.log(`Total posts: ${allPosts.length}`);

          const calculatedTotalPages = Math.ceil(allPosts.length / postsPerPage);
          console.log(`Calculated total pages: ${calculatedTotalPages}`);

          // Perform client-side pagination as fallback
          const startIndex = (page - 1) * postsPerPage;
          const endIndex = startIndex + postsPerPage;
          const paginatedPosts = allPosts.slice(startIndex, endIndex);
          console.log(`Showing posts from index ${startIndex} to ${endIndex - 1}`);
          console.log(`Paginated posts length: ${paginatedPosts.length}`);

          setPosts(paginatedPosts);
          setTotalPages(calculatedTotalPages);
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
    // Check for scroll parameters
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get('scrollTo');

    if (scrollToId) {
      // Slightly delay the scroll to ensure the component is fully rendered
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
    // Update URL when page changes
    if (value === 1) {
      navigate(ROUTES.BLOG.LIST.path);
    } else {
      navigate(ROUTES.BLOG.LIST_PAGED({ page: value }));
    }
  };

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setNewsletterOpen(false);
  };

  // Don't load initially if we have a proper loading state
  if (loading && posts.length === 0) {
    return (
      <Box>
        <HeroSection
          title="Our Blog"
          subtitle="Stay updated with the latest news, insights, and trends in our industry."
          overline="BLOG"
          buttons={[
            {
              text: 'Subscribe to Our Newsletter',
              onClick: handleOpenNewsletter,
            },
          ]}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator message="Loading blog posts" fullHeight />
        </Container>

        <NewsletterPopup
          open={newsletterOpen}
          onClose={handleCloseNewsletter}
        />
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box>
        <HeroSection
          title="Our Blog"
          subtitle="Stay updated with the latest news, insights, and trends in our industry."
          overline="BLOG"
          buttons={[
            {
              text: 'Subscribe to Our Newsletter',
              onClick: handleOpenNewsletter,
            },
          ]}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            No Blog Posts Available
          </Typography>
          <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
            Check back soon for new content!
          </Typography>
        </Container>

        <NewsletterPopup
          open={newsletterOpen}
          onClose={handleCloseNewsletter}
        />
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
            text: 'Subscribe to Our Newsletter',
            onClick: handleOpenNewsletter,
          },
        ]}
      />

      <CTASection
        id="articles-section"  // Add this ID for scrolling
        overline="ARTICLES"
        title="Latest Articles"
        maxWidth="lg"
      >
        {loading ? (
          <LoadingIndicator message="Updating posts" />
        ) : (
          <>
            <Grid2 container spacing={4}>
              {posts.map((post) => (
                <Grid2 size={gridSizes.thirdWidth} key={post.id}>
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
                      <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
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
          </>
        )}
      </CTASection>

      <NewsletterPopup open={newsletterOpen} onClose={handleCloseNewsletter} />
    </Box>
  );
};

export default Blog;
