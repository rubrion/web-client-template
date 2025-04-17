export interface ProjectReference {
  title: string;
  url: string;
  type: 'article' | 'link';
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  category?: string;
  date?: string;
  technologies?: string[];
  github?: string;
  website?: string;
  references?: ProjectReference[];
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

const generatePlaceholderImage = (id: string): string => {
  const seed = parseInt(id) || 1;
  const hue = (seed * 137) % 360;
  const colorNumber = seed % 2;
  const textColor = colorNumber === 0 ? '#333333' : '#ffffff';
  const bgColor = `hsl(${hue}, 70%, 60%)`;

  const category =
    id === '1'
      ? 'Technology'
      : id === '2'
        ? 'Health'
        : id === '3'
          ? 'Business'
          : `Project ${id}`;

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="${bgColor}" />
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle">${category}</text>
    </svg>
  `;

  const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
  return dataUri;
};

export const generateProject = (id: string): MockProject => {
  const project: MockProject = {
    id,
    title: `Project ${id}`,
    description: `A comprehensive solution for ${id === '1' ? 'energy management' : id === '2' ? 'healthcare systems' : 'financial analytics'}`,
    content: mockProjectContent,
    category: id === '1' ? 'Energy' : id === '2' ? 'Healthcare' : 'Finance',
    date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    image: generatePlaceholderImage(id),
  };

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

export const mockProjects: MockProject[] = Array.from(
  { length: 18 },
  (_, i) => {
    const id = (i + 1).toString();
    return generateProject(id);
  }
);
