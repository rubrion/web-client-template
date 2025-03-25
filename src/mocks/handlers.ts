// Complete handlers.ts file with all endpoints
import { http, HttpResponse } from 'msw';

import { generateBlogPost, mockBlogPosts } from './mockBlogPosts';

export const handlers = [
  http.get('/posts', () => {
    console.log('MSW intercepted GET /posts request');
    return HttpResponse.json(mockBlogPosts, { status: 200 });
  }),

  http.get('/posts/:id', ({ params }) => {
    console.log(`MSW intercepted GET /posts/${params.id} request`);
    const { id } = params;
    if (!id) {
      return HttpResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }
    const post = generateBlogPost(id as string);
    return HttpResponse.json(post, { status: 200 });
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
      // For FormData requests
      const formData = await request.formData();

      // Extract form fields
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

      // Validate required fields
      if (!name || !email || !position) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Please fill all required fields',
          },
          { status: 400 }
        );
      }

      // Validate email format
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Please provide a valid email address',
          },
          { status: 400 }
        );
      }

      // Success response
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
