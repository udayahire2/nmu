import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ScrollRestoration } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-app flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8">
                <Outlet />
            </main>
            <footer className="py-6 text-center text-slate-400 dark:text-slate-500 text-sm">
                <p>© 2026 NMU Academic Companion</p>
            </footer>
            <ScrollRestoration />
        </div>
    );
}
