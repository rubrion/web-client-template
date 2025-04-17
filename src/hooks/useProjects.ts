import { useQuery } from '@tanstack/react-query';

import { PAGINATION } from '../config';
import { projectService } from '../services/projects';

/**
 * Hook for fetching a paginated list of projects
 *
 * @param page Current page number
 * @param limit Items per page
 * @returns Query result with projects data
 */
export function useProjects(page = 1, limit = PAGINATION.DEFAULT_PAGE_SIZE) {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => projectService.list(page, limit),
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook for fetching a single project by ID
 *
 * @param id Project ID
 * @returns Query result with project data
 */
export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.byId(id as string),
    enabled: !!id,
    staleTime: 300000, // 5 minutes
  });
}
