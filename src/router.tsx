import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import SemesterPage from './pages/SemesterPage';
import SubjectPage from './pages/SubjectPage';
import UnitViewerPage from './pages/UnitViewerPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
            {
                path: '/course/:courseId',
                element: <CoursePage />,
            },
            {
                path: '/course/:courseId/sem/:semesterId',
                element: <SemesterPage />,
            },
            {
                path: '/course/:courseId/sem/:semesterId/subject/:subjectId',
                element: <SubjectPage />,
            },
            {
                path: '/course/:courseId/sem/:semesterId/subject/:subjectId/unit/:unitId',
                element: <UnitViewerPage />,
            },
        ],
    },
]);
