import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpenText,
    FileStack,
    ScrollText,
    MonitorPlay,
    Zap,
    GraduationCap,
    LogOut
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Logo } from '../../../components/Logo';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', to: '/admin/dashboard' },
    { icon: BookOpenText, label: 'Manage Syllabus', to: '/admin/syllabus' },
    { icon: FileStack, label: 'Previous Papers', to: '/admin/papers' },
    { icon: ScrollText, label: 'Study Notes', to: '/admin/notes' },
    { icon: MonitorPlay, label: 'YouTube Videos', to: '/admin/videos' },
    { icon: Zap, label: 'Quick Revision', to: '/admin/revision' },
    { icon: GraduationCap, label: 'Manage Students', to: '/admin/students' },
];

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800 h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300">
            <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
                <Logo />
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                            isActive
                                ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-500/15 shadow-sm ring-1 ring-indigo-200/50 dark:ring-indigo-500/20"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn(
                                    "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-indigo-600 dark:text-indigo-300" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                                )} />
                                <span className={cn("transition-all duration-300", isActive && "font-semibold")}>
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
