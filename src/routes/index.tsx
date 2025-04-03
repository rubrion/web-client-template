import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import ErrorPage from '../pages/ErrorPage';
import Layout from '../layout/Layout';
import Loading from '../components/Loading';

// Lazy loaded pages for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const BlogList = lazy(() => import('../pages/Blog/BlogList'));
const BlogPost = lazy(() => import('../pages/Blog/BlogPost'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Define all application routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                )
            },
            {
                path: 'contact',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Contact />
                    </Suspense>
                )
            },
            {
                path: 'blog',
                element: (
                    <Suspense fallback={<Loading />}>
                        <BlogList />
                    </Suspense>
                )
            },
            {
                path: 'blog/:slug',
                element: (
                    <Suspense fallback={<Loading />}>
                        <BlogPost />
                    </Suspense>
                )
            },
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Profile />
                    </Suspense>
                )
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<Loading />}>
                        <NotFound />
                    </Suspense>
                )
            }
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
