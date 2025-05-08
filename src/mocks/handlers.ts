import { http } from 'msw';

// Import i18n handlers
import { handlers as i18nHandlersAll } from '../i18n/msw/handlers';
import { blogHandlers } from './mockBlogPosts';
// Import existing handlers from mockProjects and mockBlogPosts
import { projectHandlers } from './mockProjects';

/**
 * Determines if a handler is a content handler based on its path
 * Content handlers are those that serve actual content (posts, projects, etc)
 * @param handler - The MSW handler to check
 * @returns boolean - True if the handler is a content handler
 */
const isContentHandler = (handler: any) => {
  const path = handler.info.path;

  const contentPatterns = ['/api/posts/', '/api/projects/'];

  if (typeof path === 'string') {
    return contentPatterns.some((pattern) => path.includes(pattern));
  } else if (path instanceof RegExp) {
    const pathStr = path.toString();
    return contentPatterns.some((pattern) => pathStr.includes(pattern));
  }

  return false;
};

const i18nHandlers = i18nHandlersAll.filter(
  (handler) => !isContentHandler(handler)
);

export const handlers = [
  ...projectHandlers,
  ...blogHandlers,
  ...i18nHandlers,

  http.get('/api/health', () => {
    return new Response(JSON.stringify({ status: 'up', mswActive: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];

console.log('All MSW handlers registered:', handlers.length);
console.log(
  'Handler paths:',
  handlers.map((h) => h.info.method + ' ' + h.info.path)
);
