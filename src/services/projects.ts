import { COLLECTIONS } from '../config';
import { resolveTenant } from '../core/tenant';
import { MockProject, mockProjects } from '../mocks/mockProjects';
import { createPaginatedService } from './createPaginatedService';
import { ProjectSchema } from './validators';

/**
 * Service for fetching projects - initialized lazily to avoid require issues
 */
let _projectService: ReturnType<typeof createPaginatedService<MockProject>>;

/**
 * Get the project service instance, initializing if necessary
 */
export const getProjectService = async () => {
  if (!_projectService) {
    // Initialize the service directly with createPaginatedService to avoid async issues
    _projectService = createPaginatedService<MockProject>({
      route: '/projects',
      mock: mockProjects,
      collection: COLLECTIONS.PROJECTS,
      schema: ProjectSchema,
    });
  }
  return _projectService;
};

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
  limit = 9,
  tenant?: string,
  language?: string
): Promise<PaginatedProjectResponse> => {
  // Use provided tenant or default from environment
  const currentTenant = tenant || resolveTenant();

  // Get service and use it
  const projectService = await getProjectService();
  const response = await projectService.list(
    currentTenant,
    page,
    limit,
    language
  );

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
export const fetchProjectById = async (
  id: string,
  tenant?: string,
  language?: string
): Promise<MockProject> => {
  // Use provided tenant or default from environment
  const currentTenant = tenant || resolveTenant();

  // Get service and use it
  const projectService = await getProjectService();

  // Use passed language parameter
  return projectService.byId(currentTenant, id, language);
};
