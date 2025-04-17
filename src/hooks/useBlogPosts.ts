import { useQuery } from '@tanstack/react-query';

import { PAGINATION } from '../config';
import { blogService } from '../services/blog';

/**
 * Hook for fetching a paginated list of blog posts
 *
 * @param page Current page number
 * @param limit Items per page
 * @returns Query result with blog posts data
 */
export function useBlogPosts(page = 1, limit = PAGINATION.DEFAULT_PAGE_SIZE) {
  return useQuery({
    queryKey: ['blogPosts', page, limit],
    queryFn: () => blogService.list(page, limit),
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook for fetching a single blog post by ID
 *
 * @param id Blog post ID
 * @returns Query result with blog post data
 */
export function useBlogPost(id: string | undefined) {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => blogService.byId(id as string),
    enabled: !!id,
    staleTime: 300000, // 5 minutes
  });
}
