import { DynamicRoute, RouteObject } from './types';

const BLOG_ROUTES = {
  LIST: {
    path: '/blog',
    label: 'Blog',
    description: 'Read the latest updates and insights from Rubrion.',
  } as RouteObject,
  // Add pagination route
  LIST_PAGED: ((params: { page: number }): string => {
    return `/blog/page/${params.page}`;
  }) as DynamicRoute<{ page: number }>,
  LIST_PAGED_STATIC: '/blog/page/:page',
  // Update post detail routes to use /blog/post/:id pattern
  POST_DETAIL: ((params: { id: string }): string => {
    if (!params.id)
      throw new Error('ID is required to generate the blog post detail route');
    return `/blog/post/${params.id}`;
  }) as DynamicRoute<{ id: string }>,
  POST_DETAIL_STATIC: '/blog/post/:id',
};

export default BLOG_ROUTES;
