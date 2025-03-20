import { RouteObject } from './types';

const PUBLIC_ROUTES: Record<string, RouteObject> = {
  HOME: {
    path: '/',
    label: 'Home',
    description: 'Welcome to the Rubrion homepage!',
  },
  ABOUT: {
    path: '/about',
    label: 'About Us',
    description: 'Learn more about Rubrion and our mission.',
  },
  CONTACT: {
    path: '/contact',
    label: 'Contact',
    description: 'Get in touch with Rubrion for inquiries or support.',
  },
  PORTFOLIO: {
    path: '/portfolio',
    label: 'Portfolio',
    description: 'Explore our latest projects and successful case studies.',
  },
  SERVICES: {
    path: '/services',
    label: 'Services',
    description:
      'Discover the solutions Rubrion offers to help your business grow.',
  },
  TEAMDETAILS: {
    path: '/team-details',
    label: 'Team Details',
    description:
      'Meet the experts behind Rubrion and learn about their expertise.',
  },
  PARTNERDETAILS: {
    path: '/partner-details',
    label: 'Partner Details',
    description:
      'Meet the companies we collaborate with to bring you the best solutions.',
  },
};

export default PUBLIC_ROUTES;
