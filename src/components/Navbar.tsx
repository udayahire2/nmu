import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Search, Home, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useUser } from '../context/UserContext';
import { Logo } from './Logo';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/Button';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    const { bookmarks, user } = useUser();
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        {
            name: 'Branches',
            path: '#',
            icon: BookOpen,
            bg: true, // Marker for dropdown behavior
            submenu: [
                { name: 'Computer', path: '/branch/computer' },
                { name: 'Civil', path: '/branch/civil' },
                { name: 'Mechanical', path: '/branch/mechanical' },
                { name: 'Electrical', path: '/branch/electrical' },
                { name: 'E&TC', path: '/branch/etc' },
            ]
        },
        { name: 'Courses', path: '/courses', icon: BookOpen },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-dark-app/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Logo Section */}
                {!isSearchOpen && (
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <Logo className="h-10 w-auto group-hover:scale-105 transition-transform duration-200" />
                    </Link>
                )}

                {/* Desktop Nav & Search Bar */}
                <div className="hidden md:flex items-center flex-1 justify-end">
                    <AnimatePresence mode="wait">
                        {isSearchOpen ? (
                            <motion.div
                                key="search-bar"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center w-full max-w-2xl gap-2"
                            >
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search courses, faculty, departments..."
                                        className="w-full bg-slate-100 dark:bg-zinc-800/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                        onBlur={() => {
                                            // Small delay to allow clicking the close button or other interactions
                                            setTimeout(() => setIsSearchOpen(false), 200);
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="nav-links"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-8"
                            >
                                {navLinks.map((link) => (
                                    <div key={link.name} className="relative group/menu">
                                        <Link
                                            to={link.path}
                                            className={cn(
                                                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 py-4",
                                                location.pathname === link.path ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-zinc-400"
                                            )}
                                        >
                                            {link.name}
                                            {link.submenu && <ChevronDown className="w-3.5 h-3.5 mt-0.5 opacity-50 group-hover/menu:rotate-180 transition-transform" />}
                                            {location.pathname === link.path && !link.submenu && (
                                                <span className="absolute bottom-3 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                                            )}
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {link.submenu && (
                                            <div className="absolute top-full right-0 w-48 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-200 ease-out">
                                                <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 overflow-hidden">
                                                    {link.submenu.map((subItem) => (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>

                                <div className="flex items-center gap-2">
                                    <ThemeToggle />
                                    <button
                                        onClick={() => setIsSearchOpen(true)}
                                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>

                                    <div className="ml-2">
                                        {user ? (
                                            <Link to="/profile" className="flex items-center gap-2 pl-1 pr-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-semibold text-sm">
                                                    {user.avatar ? <img src={user.avatar} className="h-full w-full rounded-full object-cover" alt="" /> : user.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate max-w-[80px]">
                                                    {user.name.split(' ')[0]}
                                                </span>
                                            </Link>
                                        ) : (
                                            <Link to="/login">
                                                <Button size="sm" className="font-semibold">
                                                    Log in
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    {!isSearchOpen && <ThemeToggle />}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-dark-app border-b border-slate-200 dark:border-white/5">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <div key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => !link.submenu && setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium",
                                            location.pathname === link.path
                                                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {link.name}
                                    </Link>
                                    {/* Mobile Submenu - Simple indented list for now */}
                                    {link.submenu && (
                                        <div className="pl-10 pr-4 pb-2 space-y-1">
                                            {link.submenu.map(sub => (
                                                <Link
                                                    key={sub.name}
                                                    to={sub.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block py-2 text-sm text-slate-500 dark:text-slate-500"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {bookmarks.length > 0 && (
                        <div className="px-7 py-3 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Recent Bookmarks</p>
                            {bookmarks.slice(0, 3).map(b => (
                                <Link key={b.id} to={b.path} onClick={() => setIsOpen(false)} className="block py-2 text-sm text-slate-600 dark:text-slate-400 truncate hover:text-indigo-600 dark:hover:text-indigo-400">
                                    {b.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
