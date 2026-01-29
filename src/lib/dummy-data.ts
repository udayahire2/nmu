import { BookOpen, Users, Activity, TrendingUp, FileText, File, MonitorPlay } from "lucide-react";

export const DUMMY_STATS = [
    { label: "Total Resources", value: "245", icon: BookOpen, change: 12, changeType: "increase", description: "All time uploads" },
    { label: "Active Students", value: "1,204", icon: Users, change: 4, changeType: "increase", description: "Active this month" },
    { label: "Daily Views", value: "843", icon: Activity, change: 18, changeType: "increase", description: "Page views today" },
    { label: "Engagement", value: "87%", icon: TrendingUp, change: 2, changeType: "decrease", description: "Bounce rate" }
];

export const DUMMY_RESOURCES = [
    {
        id: "1",
        _id: "1",
        title: "Introduction to Data Structures",
        subject: "Data Structures & Algorithms",
        type: "PDF",
        createdAt: "2024-03-10T10:00:00Z",
        author: "Dr. Anjali Sharma",
        views: 1250,
        size: "2.4 MB"
    },
    {
        id: "2",
        _id: "2",
        title: "Advanced React Patterns",
        subject: "Web Development",
        type: "Video",
        createdAt: "2024-03-12T14:30:00Z",
        author: "Prof. Rajesh Kumar",
        views: 980,
        duration: "45:20"
    },
    {
        id: "3",
        _id: "3",
        title: "Operating Systems Fundamentals",
        subject: "Operating Systems",
        type: "Notes",
        createdAt: "2024-03-15T09:15:00Z",
        author: "Dr. K. Iyer",
        views: 1500,
        size: "1.1 MB"
    },
    {
        id: "4",
        _id: "4",
        title: "Database Management Systems",
        subject: "DBMS",
        type: "PDF",
        createdAt: "2024-03-18T11:45:00Z",
        author: "Prof. R. Gupta",
        views: 2100,
        size: "3.5 MB"
    },
    {
        id: "5",
        _id: "5",
        title: "Computer Networks & Security",
        subject: "Networks",
        type: "Video",
        createdAt: "2024-03-20T16:20:00Z",
        author: "Dr. Meera Patel",
        views: 850,
        duration: "1:15:00"
    },
    {
        id: "6",
        _id: "6",
        title: "Machine Learning Basics",
        subject: "AI/ML",
        type: "PDF",
        createdAt: "2024-03-22T13:10:00Z",
        author: "Prof. S. Reddy",
        views: 3200,
        size: "5.2 MB"
    }
];

export const RECENT_ACTIVITY = [
    { id: 1, action: "New resource added", user: "Vikram Malhotra", time: "2 hours ago", type: "Resource" },
    { id: 2, action: "User registration", user: "Priya Singh", time: "4 hours ago", type: "User" },
    { id: 3, action: "Report generated", user: "System", time: "1 day ago", type: "System" },
];

export const TOP_RESOURCES = [
    { id: 1, title: "DSA - Linked Lists", views: "2.4k", downloads: 342, icon: FileText, type: "PDF" },
    { id: 2, title: "React Hooks Guide", views: "1.8k", downloads: 256, icon: MonitorPlay, type: "Video" },
    { id: 3, title: "OS - Process Scheduling", views: "1.5k", downloads: 189, icon: File, type: "Notes" },
];
