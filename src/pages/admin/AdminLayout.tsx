import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import ThemeToggle from '../../components/ThemeToggle';
import { Bell } from 'lucide-react';

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
            <AdminSidebar />

            <div className="ml-64 min-h-screen flex flex-col transition-all duration-300">
                <header className="h-16 sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 px-8 flex items-center justify-between shadow-sm shadow-zinc-200/20 dark:shadow-none">
                    <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Admin Portal</h2>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                        </button>
                        <ThemeToggle />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-zinc-800">
                            AD
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
