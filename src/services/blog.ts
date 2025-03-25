import axiosInstance from './axiosInstance';
import { mockBlogPosts } from '../mocks/mockBlogPosts';

export const fetchBlogPosts = async (page = 1, limit = 9) => {
  try {
    // First try to fetch from API
    const response = await axiosInstance.get('/posts', {
      params: {
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // For debugging
    console.log(`Fetching mock data for page ${page} with limit ${limit}`);
    
    // Fallback to mock data if API fails
    return getMockPaginatedPosts(page, limit);
  }
};

// Helper function for mock pagination
function getMockPaginatedPosts(page = 1, limit = 9) {
  // Ensure page is at least 1
  page = Math.max(1, page);
  
  const totalPosts = mockBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  
  // Calculate start and end indices
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalPosts);
  
  // Get posts for the requested page
  const posts = mockBlogPosts.slice(startIndex, endIndex);
  
  // For debugging
  console.log(`Mock pagination: Page ${page}, Limit ${limit}`);
  console.log(`Total posts: ${totalPosts}, Total pages: ${totalPages}`);
  console.log(`Showing posts from index ${startIndex} to ${endIndex-1}`);
  console.log(`Returning ${posts.length} posts`);
  
  return {
    posts: posts,
    totalPosts: totalPosts,
    totalPages: totalPages,
    currentPage: page
  };
}

export const fetchBlogPostById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    throw error;
  }
};
