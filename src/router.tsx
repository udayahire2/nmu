import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
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
import ContentApprovalPage from "./pages/admin/ContentApprovalPage";
import SettingsPage from "./pages/admin/SettingsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/resources",
                element: <StudyMaterialsPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
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
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/verify-otp",
        element: <VerifyOtpPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
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
