import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageHelmet from '../components/translation/PageHelmet';
import LoadingIndicator from '../components/ui/LoadingIndicator';

const componentCache = new Map();

const cachedLazy = (importFunc: () => Promise<any>) => {
  const cachedImport = () => {
    const cacheKey = importFunc.toString();

    if (!componentCache.has(cacheKey)) {
      componentCache.set(cacheKey, importFunc());
    }

    return componentCache.get(cacheKey);
  };

  return React.lazy(cachedImport);
};

const Home = cachedLazy(() => import('../pages/Home'));
const About = cachedLazy(() => import('../pages/About'));
const Blog = cachedLazy(() => import('../pages/Blog'));
const PostDetail = cachedLazy(() => import('../pages/PostDetails'));
const Contact = cachedLazy(() => import('../pages/Contact'));
const NotFound = cachedLazy(() => import('../pages/NotFound'));
const Projects = cachedLazy(() => import('../pages/Projects'));
const ProjectDetails = cachedLazy(() => import('../pages/ProjectDetails'));
const Services = cachedLazy(() => import('../pages/Services'));
const TeamDetails = cachedLazy(() => import('../pages/TeamDetails'));
const PartnerDetails = cachedLazy(() => import('../pages/PartnerDetails'));
const TeamJoin = cachedLazy(() => import('../pages/TeamJoin'));

const PersistentSuspense: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense
      fallback={
        isClient ? (
          <div style={{ minHeight: '100vh', position: 'relative' }}>
            {children}
          </div>
        ) : (
          <LoadingIndicator message="Loading page..." />
        )
      }
    >
      {children}
    </Suspense>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <PersistentSuspense>
      <Routes>
        {/* Regular routes without language prefixes */}
        <Route
          path="/"
          element={
            <PageHelmet
              title="Home"
              description="Welcome to Start - Empowering your digital journey"
              translationNamespace="navigation"
              translationKey="menu.home"
            >
              <Home />
            </PageHelmet>
          }
        />

        <Route
          path="/about"
          element={
            <PageHelmet
              title="About"
              description="Learn more about our company, mission, and values"
              translationNamespace="navigation"
              translationKey="menu.about"
            >
              <About />
            </PageHelmet>
          }
        />

        {/* Blog routes with consistent structure */}
        <Route path="/blog">
          {/* Root redirects to page 1 */}
          <Route index element={<Navigate to="/blog/page/1" replace />} />

          {/* Paginated list */}
          <Route
            path="page/:page"
            element={
              <PageHelmet
                title="Blog"
                description="Read the latest updates and insights"
                translationNamespace="navigation"
                translationKey="menu.blog"
              >
                <Blog />
              </PageHelmet>
            }
          />

          <Route
            path="post/:id"
            element={
              <PageHelmet
                title="Blog Post"
                description="Detailed blog post"
                translationNamespace="screens"
                translationKey="post"
              >
                <PostDetail />
              </PageHelmet>
            }
          />
        </Route>

        <Route
          path="/contact"
          element={
            <PageHelmet
              title="Contact Us"
              description="Get in touch with our team"
              translationNamespace="navigation"
              translationKey="menu.contact"
            >
              <Contact />
            </PageHelmet>
          }
        />

        <Route path="/projects">
          <Route index element={<Navigate to="/projects/page/1" replace />} />

          <Route
            path="page/:page"
            element={
              <PageHelmet
                title="Projects"
                description="Explore our projects"
                translationNamespace="navigation"
                translationKey="menu.projects"
              >
                <Projects />
              </PageHelmet>
            }
          />

          <Route
            path="project/:id"
            element={
              <PageHelmet
                title="Project Details"
                description="Detailed project information"
                translationNamespace="screens"
                translationKey="projectDetail"
              >
                <ProjectDetails />
              </PageHelmet>
            }
          />
        </Route>

        <Route
          path="/services"
          element={
            <PageHelmet
              title="Services"
              description="Our services"
              translationNamespace="navigation"
              translationKey="menu.services"
            >
              <Services />
            </PageHelmet>
          }
        />
        <Route
          path="/team"
          element={
            <PageHelmet
              title="Our Team"
              description="Meet our team"
              translationNamespace="navigation"
              translationKey="menu.team"
            >
              <TeamDetails />
            </PageHelmet>
          }
        />
        <Route
          path="/partners"
          element={
            <PageHelmet
              title="Partners"
              description="Our partners"
              translationNamespace="navigation"
              translationKey="menu.partners"
            >
              <PartnerDetails />
            </PageHelmet>
          }
        />
        <Route
          path="/join-team"
          element={
            <PageHelmet
              title="Join Our Team"
              description="Career opportunities"
              translationNamespace="screens"
              translationKey="teamJoin"
            >
              <TeamJoin />
            </PageHelmet>
          }
        />

        {/* Catch-all for unknown routes */}
        <Route
          path="*"
          element={
            <PageHelmet
              title="404 - Not Found"
              description="Page not found"
              translationNamespace="screens"
              translationKey="notFound"
            >
              <NotFound />
            </PageHelmet>
          }
        />
      </Routes>
    </PersistentSuspense>
  );
};

export default AppRoutes;
