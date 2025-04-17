import { RouteObject } from './types';

const PUBLIC_ROUTES: Record<string, RouteObject> = {
  HOME: {
    path: '/',
    label: 'navigation:menu.home',
    description: 'common:meta.home',
  },
  ABOUT: {
    path: '/about',
    label: 'navigation:menu.about',
    description: 'common:meta.about',
  },
  CONTACT: {
    path: '/contact',
    label: 'navigation:menu.contact',
    description: 'common:meta.contact',
  },
  PROJECTS: {
    path: '/projects',
    label: 'navigation:menu.projects',
    description: 'common:meta.projects',
  },
  SERVICES: {
    path: '/services',
    label: 'navigation:menu.services',
    description: 'common:meta.services',
  },
  TEAMDETAILS: {
    path: '/team',
    label: 'navigation:menu.team',
    description: 'common:meta.team',
  },
  PARTNERDETAILS: {
    path: '/partners',
    label: 'navigation:menu.partners',
    description: 'common:meta.partners',
  },
  TEAMJOIN: {
    path: '/join-team',
    label: 'screens:teamJoin.title',
    description: 'screens:teamJoin.description',
  },
};

export default PUBLIC_ROUTES;
