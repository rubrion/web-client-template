import { http, HttpResponse } from 'msw';

import { Lang } from '../lang';
import { getDocument } from './db';

/**
 * MSW handlers for mocking the remote document API endpoints
 */
export const handlers = [
  // Handler for project details
  http.get('/api/projects/:id', ({ params, request }) => {
    console.log(`MSW intercepted GET /api/projects/${params.id} request`);

    try {
      const { id } = params;
      const url = new URL(request.url);
      // Get language parameter, defaulting to 'en'
      const lang = (url.searchParams.get('lang') || 'en') as Lang;

      if (!id) {
        return HttpResponse.json(
          { error: 'Project ID is required' },
          { status: 400 }
        );
      }

      // Get document with language fallback
      const { data, langUsed } = getDocument('projects', id as string, lang);

      if (!data) {
        return HttpResponse.json(
          { error: `Project not found: ${id}` },
          { status: 404 }
        );
      }

      // Return the document with the language that was actually used
      return HttpResponse.json({ data, langUsed }, { status: 200 });
    } catch (error) {
      console.error(`Error in /api/projects/:id handler:`, error);
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  // Handler for blog post details
  http.get('/api/posts/:id', ({ params, request }) => {
    console.log(`MSW intercepted GET /api/posts/${params.id} request`);

    try {
      const { id } = params;
      const url = new URL(request.url);
      // Get language parameter, defaulting to 'en'
      const lang = (url.searchParams.get('lang') || 'en') as Lang;

      if (!id) {
        return HttpResponse.json(
          { error: 'Post ID is required' },
          { status: 400 }
        );
      }

      // Get document with language fallback
      const { data, langUsed } = getDocument('blogPosts', id as string, lang);

      if (!data) {
        return HttpResponse.json(
          { error: `Blog post not found: ${id}` },
          { status: 404 }
        );
      }

      // Return the document with the language that was actually used
      return HttpResponse.json({ data, langUsed }, { status: 200 });
    } catch (error) {
      console.error(`Error in /api/posts/:id handler:`, error);
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  // Ping endpoint to verify MSW is working
  http.get('/api/ping', () => {
    return HttpResponse.json(
      { status: 'ok', mswActive: true },
      { status: 200 }
    );
  }),
];

console.log(
  'MSW i18n handlers registered:',
  handlers.map((h) => h.info.method + ' ' + h.info.path)
);
