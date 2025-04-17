import { MockProject, mockProjects } from '../mocks/mockProjects';
import { createPaginatedService } from './createPaginatedService';
import { ProjectSchema } from './validators';

/**
 * Service for fetching projects
 */
export const projectService = createPaginatedService<MockProject>({
  route: '/projects',
  mock: mockProjects,
  collection: 'projects',
  schema: ProjectSchema,
});

// Re-export types
export type { MockProject, ProjectReference } from '../mocks/mockProjects';
export type { Project } from './validators';

// Legacy interface for backwards compatibility
export interface PaginatedProjectResponse {
  projects: MockProject[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use projectService.list() instead
 */
export const fetchProjects = async (
  page = 1,
  limit = 9
): Promise<PaginatedProjectResponse> => {
  const response = await projectService.list(page, limit);
  return {
    projects: response.items,
    totalPages: response.totalPages,
    currentPage: response.currentPage,
    totalItems: response.totalItems,
  };
};

/**
 * Legacy function for backwards compatibility
 * @deprecated Use projectService.byId() instead
 */
export const fetchProjectById = async (id: string): Promise<MockProject> => {
  return projectService.byId(id);
};
