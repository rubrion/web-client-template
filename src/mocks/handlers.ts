// Complete handlers.ts file with all endpoints
import { http, HttpResponse } from 'msw';

import { generateBlogPost, mockBlogPosts } from './mockBlogPosts';
import { generateProject, mockProjects } from './mockProjects';

export const handlers = [
  // Add ping endpoint to verify MSW is working
  http.get('/ping', () => {
    return HttpResponse.json(
      { status: 'ok', mswActive: true },
      { status: 200 }
    );
  }),

  http.get('/posts', ({ request }) => {
    console.log('MSW intercepted GET /posts request');
    try {
      // Parse pagination parameters from URL
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '9');

      // Calculate start and end indices for the current page
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // Get only the posts for the requested page
      const paginatedPosts = mockBlogPosts.slice(startIndex, endIndex);
      const totalPages = Math.ceil(mockBlogPosts.length / limit);

      return HttpResponse.json(
        {
          posts: paginatedPosts,
          totalPages: totalPages,
          currentPage: page,
          totalItems: mockBlogPosts.length,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error in /posts handler:', error);
      return HttpResponse.json(
        {
          posts: mockBlogPosts.slice(0, 9),
          totalPages: Math.ceil(mockBlogPosts.length / 9),
          currentPage: 1,
          totalItems: mockBlogPosts.length,
        },
        { status: 200 }
      );
    }
  }),

  http.get('/posts/:id', ({ params }) => {
    console.log(`MSW intercepted GET /posts/${params.id} request`);
    try {
      const { id } = params;
      if (!id) {
        return HttpResponse.json(
          { error: 'Post ID is required' },
          { status: 400 }
        );
      }
      const post = generateBlogPost(id as string);
      return HttpResponse.json(post, { status: 200 });
    } catch (error) {
      console.error(`Error in /posts/:id handler:`, error);
      return HttpResponse.json(generateBlogPost('1'), { status: 200 });
    }
  }),

  http.get('/projects', ({ request }) => {
    console.log('MSW intercepted GET /projects request');
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '9');

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProjects = mockProjects.slice(startIndex, endIndex);
      const totalPages = Math.ceil(mockProjects.length / limit);

      return HttpResponse.json(
        {
          projects: paginatedProjects,
          totalPages,
          currentPage: page,
          totalItems: mockProjects.length,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error in /projects handler:', error);
      return HttpResponse.json(
        {
          projects: mockProjects.slice(0, 9),
          totalPages: 1,
          currentPage: 1,
          totalItems: 9,
        },
        { status: 200 }
      );
    }
  }),

  http.get('/projects/:id', ({ params }) => {
    console.log(`MSW intercepted GET /projects/${params.id} request`);
    try {
      const { id } = params;
      if (!id) {
        return HttpResponse.json(
          { error: 'Project ID is required' },
          { status: 400 }
        );
      }
      const project = generateProject(id as string);
      return HttpResponse.json(project, { status: 200 });
    } catch (error) {
      console.error(`Error in /projects/:id handler:`, error);
      return HttpResponse.json(generateProject('1'), { status: 200 });
    }
  }),

  http.post('/newsletter/subscribe', async ({ request }) => {
    console.log('MSW intercepted POST /newsletter/subscribe request');
    try {
      const data = (await request.json()) as { email?: string };
      const { email } = data;

      console.log('Newsletter subscription request for email:', email);

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return HttpResponse.json(
          { success: false, message: 'Invalid email address' },
          { status: 400 }
        );
      }

      return HttpResponse.json(
        {
          success: true,
          message: 'Successfully subscribed to the newsletter!',
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error in newsletter handler:', error);
      return HttpResponse.json(
        { success: false, message: 'Error processing request' },
        { status: 500 }
      );
    }
  }),

  http.post('/team/join', async ({ request }) => {
    console.log('MSW intercepted POST /team/join request');
    try {
      const formData = await request.formData();

      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const position = formData.get('position') as string;
      const cvFile = formData.get('cv') as File;

      console.log('Team join request received:', {
        name,
        email,
        position,
        hasCV: !!cvFile,
        cvFileName: cvFile?.name,
      });

      if (!name || !email || !position) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Please fill all required fields',
          },
          { status: 400 }
        );
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Please provide a valid email address',
          },
          { status: 400 }
        );
      }

      return HttpResponse.json(
        {
          success: true,
          message:
            'Your application has been submitted successfully! Our team will review it and get back to you soon.',
          applicationId: `APP-${Date.now()}`,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error in team join handler:', error);
      return HttpResponse.json(
        {
          success: false,
          message: 'Error processing your application. Please try again later.',
        },
        { status: 500 }
      );
    }
  }),
];

console.log(
  'MSW handlers registered:',
  handlers.map((h) => h.info.method + ' ' + h.info.path)
);
