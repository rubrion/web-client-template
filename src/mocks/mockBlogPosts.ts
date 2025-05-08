const mockPostContent = `
    <div>
        <p>Welcome to our latest blog post! In this article, we will explore <strong>the best practices for web development</strong> in 2024.</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" alt="Web Development" style="max-width:100%; height:auto;" />
        <h2>Why Stay Updated?</h2>
        <p>Technology evolves rapidly, and staying informed ensures you're using the most efficient tools and methods.</p>
        <blockquote>
            "Innovation distinguishes between a leader and a follower." - Steve Jobs
        </blockquote>
        <h3>Key Topics Covered</h3>
        <ul>
            <li>React best practices</li>
            <li>Performance optimization</li>
            <li>Accessibility standards</li>
            <li>Emerging tools and frameworks</li>
        </ul>
        <p>We hope you find this post insightful and valuable. Don't forget to leave a comment below!</p>
    </div>
`;

const mockPostContentEs = `
    <div>
        <p>¡Bienvenido a nuestro último artículo del blog! En este artículo, exploraremos <strong>las mejores prácticas para el desarrollo web</strong> en 2024.</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" alt="Desarrollo Web" style="max-width:100%; height:auto;" />
        <h2>¿Por qué mantenerse actualizado?</h2>
        <p>La tecnología evoluciona rápidamente, y mantenerse informado garantiza que estés utilizando las herramientas y métodos más eficientes.</p>
        <blockquote>
            "La innovación distingue entre un líder y un seguidor." - Steve Jobs
        </blockquote>
        <h3>Temas principales cubiertos</h3>
        <ul>
            <li>Mejores prácticas de React</li>
            <li>Optimización del rendimiento</li>
            <li>Estándares de accesibilidad</li>
            <li>Herramientas y frameworks emergentes</li>
        </ul>
        <p>Esperamos que encuentres este artículo perspicaz y valioso. ¡No olvides dejar un comentario abajo!</p>
    </div>
`;

const mockPostContentPt = `
    <div>
        <p>Bem-vindo ao nosso mais recente post do blog! Neste artigo, vamos explorar <strong>as melhores práticas para desenvolvimento web</strong> em 2024.</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" alt="Desenvolvimento Web" style="max-width:100%; height:auto;" />
        <h2>Por que se manter atualizado?</h2>
        <p>A tecnologia evolui rapidamente, e manter-se informado garante que você está usando as ferramentas e métodos mais eficientes.</p>
        <blockquote>
            "A inovação distingue entre um líder e um seguidor." - Steve Jobs
        </blockquote>
        <h3>Principais tópicos abordados</h3>
        <ul>
            <li>Melhores práticas de React</li>
            <li>Otimização de desempenho</li>
            <li>Padrões de acessibilidade</li>
            <li>Ferramentas e frameworks emergentes</li>
        </ul>
        <p>Esperamos que você ache este post perspicaz e valioso. Não se esqueça de deixar um comentário abaixo!</p>
    </div>
`;

export interface MockedBlogPost {
  id: string;
  title: string;
  description: string;
  body: string; // Changed from 'content' to 'body'
  date?: string;
  author?: string;
  categories?: string[];
  image?: string;
  category?: string;
  language?: string;
  meta?: {
    description?: string;
    [key: string]: any;
  };
}

// Create examples in different languages
export const generateBlogPost = (
  id: string,
  language = 'en'
): MockedBlogPost => {
  const postNum = parseInt(id);
  const baseDate = new Date(2023, 0, 1);
  baseDate.setDate(baseDate.getDate() + postNum * 7);

  const dateStr = baseDate.toISOString().split('T')[0];

  // Generate language-specific content
  switch (language) {
    case 'es':
      return {
        id,
        title: `Publicación ${id}: Estrategias de desarrollo web modernas`,
        description: `Este es un artículo en español sobre desarrollo web y mejores prácticas modernas para el año 2024.`,
        body: mockPostContentEs,
        date: dateStr,
        author: 'María González',
        category: 'Desarrollo',
        image: `https://picsum.photos/seed/${id}-es/800/600`,
        language: 'es',
      };
    case 'pt':
      return {
        id,
        title: `Post ${id}: Estratégias modernas de desenvolvimento web`,
        description: `Este é um artigo em português sobre desenvolvimento web e melhores práticas modernas para o ano de 2024.`,
        body: mockPostContentPt,
        date: dateStr,
        author: 'João Silva',
        category: 'Desenvolvimento',
        image: `https://picsum.photos/seed/${id}-pt/800/600`,
        language: 'pt',
      };
    default: // 'en'
      return {
        id,
        title: `Post ${id}: Modern Web Development Strategies`,
        description: `This is an article about web development and modern best practices for the year 2024.`,
        body: mockPostContent,
        date: dateStr,
        author: 'John Smith',
        category: 'Development',
        image: `https://picsum.photos/seed/${id}/800/600`,
        language: 'en',
      };
  }
};

// Expose the generator function globally for dynamic mock generation
if (typeof window !== 'undefined') {
  (window as any).generateMockItem = (window as any).generateMockItem || {};
  (window as any).generateMockItem.blog = generateBlogPost;
}

export const mockBlogPosts: MockedBlogPost[] = [
  // English posts (10)
  ...Array.from({ length: 10 }, (_, i) =>
    generateBlogPost((i + 1).toString(), 'en')
  ),

  // Spanish posts (10)
  ...Array.from({ length: 10 }, (_, i) =>
    generateBlogPost((i + 1).toString(), 'es')
  ),

  // Portuguese posts (10)
  ...Array.from({ length: 10 }, (_, i) =>
    generateBlogPost((i + 1).toString(), 'pt')
  ),
];

// Log the generated mock posts for easier debugging
console.log(
  'Generated mock blog posts:',
  mockBlogPosts.reduce(
    (acc, post) => {
      acc[post.language || 'unknown'] =
        (acc[post.language || 'unknown'] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  )
);

// Export handlers for blog posts for use in the main handlers file
import { http, HttpResponse } from 'msw';

export const blogHandlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'en';

    // Filter posts by language
    const filteredPosts = mockBlogPosts.filter(
      (post) => post.language === lang || (lang === 'en' && !post.language)
    );

    const start = (page - 1) * limit;
    const end = Math.min(start + limit, filteredPosts.length);
    const paginatedPosts = filteredPosts.slice(start, end);

    return HttpResponse.json({
      posts: paginatedPosts,
      totalPages: Math.ceil(filteredPosts.length / limit),
      currentPage: page,
      totalItems: filteredPosts.length,
    });
  }),

  http.get('/api/posts/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'en';

    // Find post with the specified language
    let post = mockBlogPosts.find((p) => p.id === id && p.language === lang);

    // If not found and language is not English, fallback to English
    if (!post && lang !== 'en') {
      post = mockBlogPosts.find(
        (p) => p.id === id && (p.language === 'en' || !p.language)
      );

      if (post) {
        return HttpResponse.json({
          ...post,
          langUsed: 'en',
        });
      }
    }

    if (post) {
      return HttpResponse.json({
        ...post,
        langUsed: post.language || 'en',
      });
    }

    return HttpResponse.json(
      { error: `Blog post not found: ${id}` },
      { status: 404 }
    );
  }),
];
