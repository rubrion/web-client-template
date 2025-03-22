import { generateBlogPost, mockBlogPosts } from './mockBlogPosts';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/posts', () => HttpResponse.json(mockBlogPosts, { status: 200 })),

  http.get('/posts/:id', ({ params }) => {
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
    try {
      const data = await request.json() as { email?: string };
      const { email } = data;

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return HttpResponse.json(
          { success: false, message: 'Invalid email address' },
          { status: 400 }
        );
      }

      return HttpResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to the newsletter!' 
        },
        { status: 200 }
      );
    } catch (error) {
      return HttpResponse.json(
        { success: false, message: 'Error processing request' },
        { status: 500 }
      );
    }
  }),
];