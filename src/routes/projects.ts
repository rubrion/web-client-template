import {
  DynamicRoute,
  OptionalDetailParams,
  PaginationParams,
  RouteObject,
} from './types';

const PROJECTS_ROUTES = {
  // Root path (redirects to page 1)
  ROOT: {
    path: '/projects',
    label: 'navigation:menu.projects',
    description: 'common:meta.projects',
  } as RouteObject,

  // Default list page (page 1)
  LIST: {
    path: '/projects/page/1',
    label: 'navigation:menu.projects',
    description: 'common:meta.projects',
  } as RouteObject,

  // Paginated list
  LIST_PAGED: ((params: PaginationParams): string => {
    return `/projects/page/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/projects/page/:page',

  // Detail page
  PROJECT_DETAIL: ((params: OptionalDetailParams = {}): string => {
    if (!params.id) return '/projects/project/:id';
    return `/projects/project/${params.id}`;
  }) as DynamicRoute<OptionalDetailParams>,

  PROJECT_DETAIL_STATIC: '/projects/project/:id',
};

export default PROJECTS_ROUTES;
