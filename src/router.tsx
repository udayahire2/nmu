import { createBrowserRouter, Navigate } from 'react-router-dom';
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

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import SyllabusPage from './pages/admin/SyllabusPage';
import PapersPage from './pages/admin/PapersPage';
import NotesPage from './pages/admin/NotesPage';
import VideosPage from './pages/admin/VideosPage';
import RevisionPage from './pages/admin/RevisionPage';
import StudentsPage from './pages/admin/StudentsPage';

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
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'syllabus',
                element: <SyllabusPage />,
            },
            {
                path: 'papers',
                element: <PapersPage />,
            },
            {
                path: 'notes',
                element: <NotesPage />,
            },
            {
                path: 'videos',
                element: <VideosPage />,
            },
            {
                path: 'revision',
                element: <RevisionPage />,
            },
            {
                path: 'students',
                element: <StudentsPage />,
            },
        ],
    },
]);
