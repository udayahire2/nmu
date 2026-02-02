import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ProfilePage from "./pages/ProfilePage";
import StudyMaterialsPage from "./pages/StudyMaterialsPage";
import SyllabusPage from "./pages/SyllabusPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import StudentsPage from "./pages/admin/StudentsPage";
import ResourceManagerPage from "./pages/admin/ResourceManagerPage";
import SyllabusManagerPage from "./pages/admin/SyllabusManagerPage";
import ContentApprovalPage from "./pages/admin/ContentApprovalPage";
import SettingsPage from "./pages/admin/SettingsPage";

import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/resources",
                children: [
                    {
                        index: true,
                        element: <StudyMaterialsPage />, // Acts as wrapper or redirect
                    },
                    {
                        path: ":branch/:semester",
                        element: <StudyMaterialsPage />, // We will handle state inside
                    },
                    {
                        path: ":branch/:semester/:subjectId",
                        element: <StudyMaterialsPage />, // Shared layout, internal switching
                    },
                    {
                        path: ":branch/:semester/:subjectId/topic/:topicId",
                        element: <StudyMaterialsPage />,
                    },
                ]
            },
            {
                path: "/syllabus",
                element: <SyllabusPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/verify-otp",
        element: <VerifyOtpPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "syllabus",
                element: <SyllabusManagerPage />,
            },
            {
                path: "resources",
                element: <ResourceManagerPage />,
            },
            {
                path: "students",
                element: <StudentsPage />,
            },
            {
                path: "approvals",
                element: <ContentApprovalPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "",
                element: <DashboardPage />, // Default redirect
            }
        ],
    },
]);
