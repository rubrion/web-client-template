import { COLLECTIONS } from '../config';
import { resolveTenant } from '../core/tenant';
import { mockBlogPosts, MockedBlogPost } from '../mocks/mockBlogPosts';
import { createPaginatedService } from './createPaginatedService';
import { BlogPostSchema } from './validators';

/**
 * Service for fetching blog posts - initialized lazily to avoid require issues
 */
let _blogService: ReturnType<typeof createPaginatedService<MockedBlogPost>>;

/**
 * Get the blog service instance, initializing if necessary
 */
export const getBlogService = async () => {
  if (!_blogService) {
    // Initialize the service directly with createPaginatedService to avoid async issues
    _blogService = createPaginatedService<MockedBlogPost>({
      route: '/posts',
      mock: mockBlogPosts,
      collection: COLLECTIONS.BLOGS,
      schema: BlogPostSchema,
    });
  }
  return _blogService;
};

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
  limit = 9,
  tenant?: string,
  language?: string
): Promise<PaginatedBlogResponse> => {
  // Use provided tenant or default from environment
  const currentTenant = tenant || resolveTenant();

  // Get service and use it
  const blogService = await getBlogService();
  const response = await blogService.list(currentTenant, page, limit, language);

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
  id: string,
  tenant?: string,
  language?: string
): Promise<MockedBlogPost> => {
  // Use provided tenant or default from environment
  const currentTenant = tenant || resolveTenant();

  // Get service and use it
  const blogService = await getBlogService();

  // Use passed language parameter
  return blogService.byId(currentTenant, id, language);
};
