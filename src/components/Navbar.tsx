import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, BookOpen, Search, Home, ChevronDown } from 'lucide-react';
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
    const { user } = useUser();
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        {
            name: 'Branches',
            path: '#',
            icon: BookOpen,
            bg: true,
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

    const MenuToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => (
        <button
            onClick={toggle}
            className="group p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors z-50 relative"
            aria-label="Toggle Menu"
        >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-5 h-0.5 bg-slate-900 dark:bg-white rounded-full block origin-center"
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-5 h-0.5 bg-slate-900 dark:bg-white rounded-full block origin-center"
                />
            </div>
        </button>
    );

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-dark-app/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Logo Section */}
                {!isSearchOpen && (
                    <Link to="/" className="flex items-center gap-3 group shrink-0 relative z-50">
                        <Logo className="h-9 w-auto group-hover:scale-105 transition-transform duration-300 ease-out" />
                    </Link>
                )}

                {/* Desktop Nav & Search Bar */}
                <div className="hidden md:flex items-center flex-1 justify-end">
                    <AnimatePresence mode="wait">
                        {isSearchOpen ? (
                            <motion.div
                                key="search-bar"
                                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center w-full max-w-2xl gap-2"
                            >
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search courses, faculty, departments..."
                                        className="w-full bg-slate-100 dark:bg-zinc-800/50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-400"
                                        onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                                    />
                                </div>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-2 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="nav-links"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-1"
                            >
                                <div className="flex items-center gap-1 mr-4">
                                    {navLinks.map((link) => (
                                        <div key={link.name} className="relative group/menu">
                                            <Link
                                                to={link.path}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                                                    location.pathname === link.path
                                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                                                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-white/5"
                                                )}
                                            >
                                                {link.name}
                                                {link.submenu && <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover/menu:rotate-180  transition-transform duration-300" />}
                                            </Link>

                                            {/* Dropdown Menu */}
                                            {link.submenu && (
                                                <div className="absolute top-full right-0 w-52 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300 ease-out z-50">
                                                    <div className="bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 p-2 overflow-hidden backdrop-blur-sm">
                                                        {link.submenu.map((subItem) => (
                                                            <Link
                                                                key={subItem.path}
                                                                to={subItem.path}
                                                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all duration-200 group/item"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover/item:bg-indigo-500 transition-colors" />
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>

                                <div className="flex items-center gap-1.5">
                                    <ThemeToggle />
                                    <button
                                        onClick={() => setIsSearchOpen(true)}
                                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>

                                    <div className="ml-2">
                                        {user ? (
                                            <Link to="/profile" className="flex items-center gap-2 pl-1 pr-4 py-1 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-all group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/30">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-semibold text-sm">
                                                    {user.avatar ? <img src={user.avatar} className="h-full w-full rounded-full object-cover" alt="" /> : user.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate max-w-[80px]">
                                                    {user.name.split(' ')[0]}
                                                </span>
                                            </Link>
                                        ) : (
                                            <Link to="/login">
                                                <Button size="sm" className="font-semibold rounded-full px-6">
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
                    <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 top-16 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl z-40 md:hidden border-t border-slate-100 dark:border-white/5 overflow-hidden flex flex-col"
                    >
                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
                            {navLinks.map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => !link.submenu && setIsOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl text-lg font-medium transition-all duration-200",
                                                location.pathname === link.path
                                                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                                    : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-zinc-200"
                                            )}
                                        >
                                            <span className="flex items-center gap-4">
                                                <Icon className={cn("w-5 h-5", location.pathname === link.path ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                                                {link.name}
                                            </span>
                                            {link.submenu && <ChevronDown className="w-5 h-5 text-slate-400" />}
                                        </Link>

                                        {/* Mobile Submenu */}
                                        {link.submenu && (
                                            <div className="ml-4 mt-2 pl-4 border-l border-slate-100 dark:border-white/10 space-y-1">
                                                {link.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block py-3 px-4 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-base font-normal rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}

                            {user ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5"
                                >
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                                            {user.avatar ? <img src={user.avatar} className="h-full w-full rounded-full object-cover" alt="" /> : user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">View Profile</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="pt-8"
                                >
                                    <Link to="/login" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full text-lg h-12 rounded-xl font-semibold shadow-lg shadow-indigo-500/20">
                                            Log in
                                        </Button>
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
