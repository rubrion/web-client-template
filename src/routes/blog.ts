import {
  DynamicRoute,
  OptionalDetailParams,
  PaginationParams,
  RouteObject,
} from './types';

const BLOG_ROUTES = {
  ROOT: {
    path: '/blog',
    label: 'navigation:menu.blog',
    description: 'common:meta.blog',
  } as RouteObject,

  LIST: {
    path: '/blog/page/1',
    label: 'navigation:menu.blog',
    description: 'common:meta.blog',
  } as RouteObject,

  // Paginated list
  LIST_PAGED: ((params: PaginationParams): string => {
    return `/blog/page/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/blog/page/:page',

  // Detail page
  POST_DETAIL: ((params: OptionalDetailParams = {}): string => {
    if (!params.id) return '/blog/post/:id';
    return `/blog/post/${params.id}`;
  }) as DynamicRoute<OptionalDetailParams>,

  POST_DETAIL_STATIC: '/blog/post/:id',
};

export default BLOG_ROUTES;
