export interface ProjectReference {
  title: string;
  url: string;
  type: 'article' | 'link';
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  body: string;
  image?: string;
  category?: string;
  date?: string;
  technologies?: string[];
  github?: string;
  website?: string;
  references?: ProjectReference[];
  authors?: Author[];
  language?: string;
  meta?: {
    description?: string;
    [key: string]: any;
  };
}

export interface Author {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const mockProjectContent = `
  <div>
    <h2>Project Overview</h2>
    <p>This project was developed to solve real-world problems in the domain of sustainable energy. We used cutting-edge technologies to create an efficient and scalable solution.</p>
    
    <h3>Key Features</h3>
    <ul>
      <li>Real-time data processing</li>
      <li>Scalable cloud architecture</li>
      <li>Interactive dashboards</li>
      <li>Mobile-responsive design</li>
    </ul>
    
    <h3>Technical Challenges</h3>
    <p>One of the main challenges was optimizing performance while handling large datasets. We solved this by implementing:</p>
    <ol>
      <li>Efficient data caching strategies</li>
      <li>Lazy loading of components</li>
      <li>Serverless functions for heavy computations</li>
    </ol>
    
    <h3>Results</h3>
    <p>Our solution achieved a 40% improvement in processing speed and reduced operational costs by 25%.</p>
  </div>
`;

const mockProjectContentEs = `
  <div>
    <h2>Descripción del Proyecto</h2>
    <p>Este proyecto se desarrolló para resolver problemas del mundo real en el ámbito de la energía sostenible. Utilizamos tecnologías de vanguardia para crear una solución eficiente y escalable.</p>
    
    <h3>Características Principales</h3>
    <ul>
      <li>Procesamiento de datos en tiempo real</li>
      <li>Arquitectura cloud escalable</li>
      <li>Dashboards interactivos</li>
      <li>Diseño adaptable para dispositivos móviles</li>
    </ul>
    
    <h3>Desafíos Técnicos</h3>
    <p>Uno de los principales desafíos fue optimizar el rendimiento al manejar grandes conjuntos de datos. Lo resolvimos implementando:</p>
    <ol>
      <li>Estrategias eficientes de almacenamiento en caché</li>
      <li>Carga diferida de componentes</li>
      <li>Funciones serverless para cálculos pesados</li>
    </ol>
    
    <h3>Resultados</h3>
    <p>Nuestra solución logró una mejora del 40% en la velocidad de procesamiento y redujo los costos operativos en un 25%.</p>
  </div>
`;

const mockProjectContentPt = `
  <div>
    <h2>Visão Geral do Projeto</h2>
    <p>Este projeto foi desenvolvido para resolver problemas do mundo real no domínio da energia sustentável. Utilizamos tecnologias de ponta para criar uma solução eficiente e escalável.</p>
    
    <h3>Características Principais</h3>
    <ul>
      <li>Processamento de dados em tempo real</li>
      <li>Arquitetura de nuvem escalável</li>
      <li>Painéis interativos</li>
      <li>Design responsivo para dispositivos móveis</li>
    </ul>
    
    <h3>Desafios Técnicos</h3>
    <p>Um dos principais desafios foi otimizar o desempenho ao lidar com grandes conjuntos de dados. Resolvemos isso implementando:</p>
    <ol>
      <li>Estratégias eficientes de cache de dados</li>
      <li>Carregamento lazy de componentes</li>
      <li>Funções serverless para cálculos pesados</li>
    </ol>
    
    <h3>Resultados</h3>
    <p>Nossa solução alcançou uma melhoria de 40% na velocidade de processamento e reduziu os custos operacionais em 25%.</p>
  </div>
`;

const generatePlaceholderImage = (id: string, language = 'en'): string => {
  const seed = parseInt(id) || 1;
  const hue = (seed * 137) % 360;
  const colorNumber = seed % 2;
  const textColor = colorNumber === 0 ? '#333333' : '#ffffff';
  const bgColor = `hsl(${hue}, 70%, 60%)`;

  // Language-specific category labels
  let category;
  switch (language) {
    case 'es':
      category =
        id === '1'
          ? 'Tecnología'
          : id === '2'
            ? 'Salud'
            : id === '3'
              ? 'Negocios'
              : `Proyecto ${id}`;
      break;
    case 'pt':
      category =
        id === '1'
          ? 'Tecnologia'
          : id === '2'
            ? 'Saúde'
            : id === '3'
              ? 'Negócios'
              : `Projeto ${id}`;
      break;
    default: // 'en'
      category =
        id === '1'
          ? 'Technology'
          : id === '2'
            ? 'Health'
            : id === '3'
              ? 'Business'
              : `Project ${id}`;
  }

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="${bgColor}" />
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle">${category}</text>
    </svg>
  `;

  const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
  return dataUri;
};

export const generateProject = (id: string, language = 'en'): MockProject => {
  // Base project with language-specific content
  let project: MockProject;

  switch (language) {
    case 'es':
      project = {
        id,
        title: `Proyecto ${id}: Sistema de Gestión`,
        description: `Una solución integral para ${id === '1' ? 'gestión de energía' : id === '2' ? 'sistemas de salud' : 'análisis financieros'}`,
        body: mockProjectContentEs,
        category: id === '1' ? 'Energía' : id === '2' ? 'Salud' : 'Finanzas',
        date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        image: generatePlaceholderImage(id, 'es'),
        language: 'es',
      };
      break;
    case 'pt':
      project = {
        id,
        title: `Projeto ${id}: Sistema de Gestão`,
        description: `Uma solução abrangente para ${id === '1' ? 'gestão de energia' : id === '2' ? 'sistemas de saúde' : 'análises financeiras'}`,
        body: mockProjectContentPt,
        category: id === '1' ? 'Energia' : id === '2' ? 'Saúde' : 'Finanças',
        date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        image: generatePlaceholderImage(id, 'pt'),
        language: 'pt',
      };
      break;
    default: // 'en'
      project = {
        id,
        title: `Project ${id}: Management System`,
        description: `A comprehensive solution for ${id === '1' ? 'energy management' : id === '2' ? 'healthcare systems' : 'financial analytics'}`,
        body: mockProjectContent,
        category: id === '1' ? 'Energy' : id === '2' ? 'Healthcare' : 'Finance',
        date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        image: generatePlaceholderImage(id),
        language: 'en',
      };
  }

  // Add specific details based on project ID
  switch (id) {
    case '1':
      project.technologies = ['React', 'TypeScript', 'Node.js', 'AWS Lambda'];
      project.github = 'https://github.com/example/energy-project';
      project.website = 'https://energy-project.example.com';
      project.references = [
        {
          title: 'Energy Management Systems Overview',
          url: 'https://example.com/energy-article',
          type: 'article',
        },
        {
          title: 'Project Documentation',
          url: 'https://docs.example.com/energy-project',
          type: 'link',
        },
      ];
      break;
    case '2':
      project.technologies = ['Vue.js', 'Python', 'TensorFlow', 'Google Cloud'];
      project.github = 'https://github.com/example/healthcare-project';
      project.references = [
        {
          title: 'Healthcare Tech Innovation',
          url: 'https://example.com/healthcare-article',
          type: 'article',
        },
      ];
      break;
    case '3':
      project.technologies = [
        'Angular',
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'Docker',
      ];
      project.website = 'https://finance-project.example.com';
      project.github = 'https://github.com/example/finance-project';
      project.references = [
        {
          title: 'Financial Systems Architecture',
          url: 'https://example.com/finance-article',
          type: 'article',
        },
        {
          title: 'Project Demo',
          url: 'https://demo.example.com/finance',
          type: 'link',
        },
        {
          title: 'Technical Overview',
          url: 'https://tech.example.com/finance-overview',
          type: 'link',
        },
      ];
      break;
    default:
      project.technologies = ['React', 'JavaScript', 'Express', 'MongoDB'];
      if (parseInt(id) % 2 === 0) {
        project.github = `https://github.com/example/project-${id}`;
      }
      if (parseInt(id) % 3 === 0) {
        project.website = `https://project-${id}.example.com`;
      }
  }

  return project;
};

// Expose the generator function globally for dynamic mock generation
if (typeof window !== 'undefined') {
  (window as any).generateMockItem = (window as any).generateMockItem || {};
  (window as any).generateMockItem.project = generateProject;
}

// Generate multilingual projects
export const mockProjects: MockProject[] = [
  // English projects (6)
  ...Array.from({ length: 6 }, (_, i) =>
    generateProject((i + 1).toString(), 'en')
  ),

  // Spanish projects (6)
  ...Array.from({ length: 6 }, (_, i) =>
    generateProject((i + 1).toString(), 'es')
  ),

  // Portuguese projects (6)
  ...Array.from({ length: 6 }, (_, i) =>
    generateProject((i + 1).toString(), 'pt')
  ),
];

// Log the generated mock projects for easier debugging
console.log(
  'Generated mock projects:',
  mockProjects.reduce(
    (acc, project) => {
      acc[project.language || 'unknown'] =
        (acc[project.language || 'unknown'] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  )
);

// Keep the custom projects array
export const fodaseProjects: MockProject[] = [
  {
    id: '1',
    title: 'Chat Diáro Oficial',
    description:
      'O Chat Diário Oficial é uma solução end-to-end desenvolvida para otimizar a busca de informações em longas bases de dados textuais, como o Diário Oficial do Município de Belo Horizonte (MG). Utilizando conceitos de Retrieval Augmented Generation (RAG), este projeto visa auxiliar servidores públicos e profissionais que precisam navegar diariamente por extensos documentos, proporcionando uma experiência de busca eficiente e economia de tempo.',
    body: ' ',
    image: generatePlaceholderImage('1'),
    category: 'Geração 0',
    date: '2nd Semester 2024',
    technologies: ['RAG'],
    authors: [
      {
        name: 'Alvaro Jose Lopes',
        role: 'Auxiliou na etapa de ingestao de dados',
        image: 'https://example.com/lucas.jpg',
        linkedin: 'https://www.linkedin.com/in/lucas-silva/',
      },
    ],
  },
  {
    id: '2',
    title: 'BEMU',
    description:
      '	Nosso objetivo é fornecer um benchmark mais preciso e culturalmente relevante para a avaliação de modelos multimodais em português. Esse esforço contribui para o avanço da pesquisa em IA no Brasil e estabelece um precedente para a inclusão de outras línguas não-inglesas na avaliação de modelos de IA.',
    body: `O avanço dos modelos generativos multimodais tem sido notável, mas a diversidade linguística e cultural ainda é um desafio, especialmente para o português. A maioria dos benchmarks usados para avaliar esses modelos é predominantemente em inglês, comprometendo a captura das nuances e particularidades da língua portuguesa. Para enfrentar essa limitação, desenvolvemos o BEMU (Benchmarks Educacionais Multimodais Universitárias), focado na criação de um conjunto de dados multimodal baseado em questões de vestibulares brasileiros (Unesp, Unicamp, USP, ENEM, FAMERP e Santa Casa). Coletamos mais de 5 mil questões cobrindo diversas áreas do conhecimento, preservando o contexto cultural e linguístico original, sem depender de traduções. O dataset inclui textos autênticos (como trechos literários e jornalísticos) e imagens representativas da cultura brasileira (como charges e artes nacionais).`,
    image: generatePlaceholderImage('2'),
    category: 'Geração 0',
    date: '2nd Semester 2024',
    technologies: ['NLP'],
  },
];

// Export handlers for projects for use in the main handlers file
import { http, HttpResponse } from 'msw';

export const projectHandlers = [
  http.get('/api/projects', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'en';

    // Filter projects by language
    const filteredProjects = mockProjects.filter(
      (project) =>
        project.language === lang || (lang === 'en' && !project.language)
    );

    const start = (page - 1) * limit;
    const end = Math.min(start + limit, filteredProjects.length);
    const paginatedProjects = filteredProjects.slice(start, end);

    return HttpResponse.json({
      projects: paginatedProjects,
      totalPages: Math.ceil(filteredProjects.length / limit),
      currentPage: page,
      totalItems: filteredProjects.length,
    });
  }),

  http.get('/api/projects/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'en';

    // Find project with the specified language
    let project = mockProjects.find((p) => p.id === id && p.language === lang);

    // If not found and language is not English, fallback to English
    if (!project && lang !== 'en') {
      project = mockProjects.find(
        (p) => p.id === id && (p.language === 'en' || !p.language)
      );

      if (project) {
        return HttpResponse.json({
          ...project,
          langUsed: 'en',
        });
      }
    }

    if (project) {
      return HttpResponse.json({
        ...project,
        langUsed: project.language || 'en',
      });
    }

    return HttpResponse.json(
      { error: `Project not found: ${id}` },
      { status: 404 }
    );
  }),
];
