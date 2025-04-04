const ROUTES = {
  PUBLIC: {
    HOME: {
      path: '/',
      label: 'Home',
      description: 'Business Solutions - Transform your business today',
    },
    ABOUT: {
      path: '/about',
      label: 'About Us',
      description: 'Learn more about our company and vision',
    },
    CONTACT: {
      path: '/contact',
      label: 'Contact',
      description: 'Get in touch with our team',
    },
    SERVICES: {
      path: '/services',
      label: 'Services',
      description: 'Explore our business services and solutions',
    },
    PORTFOLIO: {
      path: '/portfolio',
      label: 'Portfolio',
      description: 'View our work and success stories',
    },
    TEAMDETAILS: {
      path: '/team',
      label: 'Our Team',
      description: 'Meet our professional team',
    },
    PARTNERDETAILS: {
      path: '/partners',
      label: 'Our Partners',
      description: 'Learn about our strategic partners',
    },
    TEAMJOIN: {
      path: '/careers',
      label: 'Join Our Team',
      description: 'Explore career opportunities with us',
    },
  },
  BLOG: {
    LIST: {
      path: '/blog',
      label: 'Blog',
      description: 'Industry insights and company news',
    },
    LIST_PAGED_STATIC: '/blog/page/:page',
    POST_DETAIL_STATIC: '/blog/:slug',
  },
};

export default ROUTES;
