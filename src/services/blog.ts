import { mockBlogPosts, MockedBlogPost } from '../mocks/mockBlogPosts';
import { createPaginatedService } from './createPaginatedService';
import { BlogPostSchema } from './validators';

/**
 * Service for fetching blog posts
 */
export const blogService = createPaginatedService<MockedBlogPost>({
  route: '/posts',
  mock: mockBlogPosts,
  collection: 'blogs',
  schema: BlogPostSchema,
});

// Re-export the BlogPost interface
export type { MockedBlogPost } from '../mocks/mockBlogPosts';
export type { BlogPost } from './validators';

// Legacy interface for backwards compatibility
export interface PaginatedBlogResponse {
  posts: MockedBlogPost[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use blogService.list() instead
 */
export const fetchBlogPosts = async (
  page = 1,
  limit = 9
): Promise<PaginatedBlogResponse> => {
  const response = await blogService.list(page, limit);
  return {
    posts: response.items,
    totalPages: response.totalPages,
    currentPage: response.currentPage,
    totalItems: response.totalItems,
  };
};

/**
 * Legacy function for backwards compatibility
 * @deprecated Use blogService.byId() instead
 */
export const fetchBlogPostById = async (
  id: string
): Promise<MockedBlogPost> => {
  return blogService.byId(id);
};
