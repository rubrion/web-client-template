import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PageHelmet from '../components/PageHelmet';
import ROUTES from './index';

const Home = React.lazy(() => import('../screens/Home'));
const About = React.lazy(() => import('../screens/About'));
const Blog = React.lazy(() => import('../screens/Blog'));
const PostDetail = React.lazy(() => import('../screens/PostDetails'));
const Contact = React.lazy(() => import('../screens/Contact'));
const NotFound = React.lazy(() => import('../screens/NotFound'));
const Portfolio = React.lazy(() => import('../screens/Portfolio'));
const Services = React.lazy(() => import('../screens/Services'));
const TeamDetails = React.lazy(() => import('../screens/TeamDetails'));
const PartnerDetails = React.lazy(() => import('../screens/PartnerDetails'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path={ROUTES.PUBLIC.HOME.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.HOME.label}
              description={ROUTES.PUBLIC.HOME.description}
            >
              <Home />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.PUBLIC.ABOUT.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.ABOUT.label}
              description={ROUTES.PUBLIC.ABOUT.description}
            >
              <About />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.BLOG.LIST.path}
          element={
            <PageHelmet
              title={ROUTES.BLOG.LIST.label}
              description={ROUTES.BLOG.LIST.description}
            >
              <Blog />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.BLOG.POST_DETAIL_STATIC}
          element={
            <PageHelmet
              title="Blog Post Details"
              description="Detailed view of the selected blog post."
            >
              <PostDetail />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.PUBLIC.CONTACT.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.CONTACT.label}
              description={ROUTES.PUBLIC.CONTACT.description}
            >
              <Contact />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.PUBLIC.PORTFOLIO.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.PORTFOLIO.label}
              description={ROUTES.PUBLIC.PORTFOLIO.description}
            >
              <Portfolio />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.PUBLIC.SERVICES.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.SERVICES.label}
              description={ROUTES.PUBLIC.SERVICES.description}
            >
              <Services />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.PUBLIC.TEAMDETAILS.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.TEAMDETAILS.label}
              description={ROUTES.PUBLIC.TEAMDETAILS.description}
            >
              <TeamDetails />
            </PageHelmet>
          }
        />
        <Route
          path={ROUTES.PUBLIC.PARTNERDETAILS.path}
          element={
            <PageHelmet
              title={ROUTES.PUBLIC.PARTNERDETAILS.label}
              description={ROUTES.PUBLIC.PARTNERDETAILS.description}
            >
              <PartnerDetails />
            </PageHelmet>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
