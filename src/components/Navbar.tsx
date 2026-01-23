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

    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

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
            className="group p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-50 relative"
            aria-label="Toggle Menu"
        >
            <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5">
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-4 h-0.5 bg-zinc-950 dark:bg-white rounded-full block origin-center"
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-4 h-0.5 bg-zinc-950 dark:bg-white rounded-full block origin-center"
                />
            </div>
        </button>
    );

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121212]/90 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Logo Section */}
                {!isSearchOpen && (
                    <Link to="/" className="flex items-center gap-2 group shrink-0 relative z-50">
                        <Logo className="h-8 w-auto" />
                    </Link>
                )}

                {/* Desktop Nav & Search Bar */}
                <div className="hidden md:flex items-center flex-1 justify-end gap-4">
                    <AnimatePresence mode="wait">
                        {isSearchOpen ? (
                            <motion.div
                                key="search-bar"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center w-full max-w-lg gap-2"
                            >
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-md py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800 outline-none transition-all placeholder:text-zinc-400"
                                        onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                                    />
                                </div>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="nav-links"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center gap-1">
                                    {navLinks.map((link) => {
                                        const isActive = location.pathname === link.path;
                                        return (
                                            <div key={link.name} className="relative group/menu">
                                                <Link
                                                    to={link.path}
                                                    onMouseEnter={() => setHoveredPath(link.path)}
                                                    onMouseLeave={() => setHoveredPath(null)}
                                                    className={cn(
                                                        "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1.5",
                                                        isActive
                                                            ? "text-zinc-950 dark:text-white"
                                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200"
                                                    )}
                                                >
                                                    {link.name}
                                                    {link.submenu && <ChevronDown className="w-3 h-3 opacity-50 group-hover/menu:rotate-180 transition-transform duration-200" />}
                                                </Link>

                                                {/* Dropdown Menu */}
                                                {link.submenu && (
                                                    <div className="absolute top-full right-0 w-48 pt-2 opacity-0 translate-y-1 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-200 ease-out z-50">
                                                        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg dark:shadow-black/50 p-1 overflow-hidden">
                                                            {link.submenu.map((subItem) => (
                                                                <Link
                                                                    key={subItem.path}
                                                                    to={subItem.path}
                                                                    className="block px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 rounded-md transition-colors"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsSearchOpen(true)}
                                        className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>

                                    <ThemeToggle />

                                    <div className="">
                                        {user ? (
                                            <Link to="/profile" className="flex items-center gap-2 pl-1 pr-3 py-1 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                                                <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                                                    {user.avatar ? <img src={user.avatar} className="h-full w-full rounded-full object-cover" alt="" /> : user.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[80px]">
                                                    {user.name.split(' ')[0]}
                                                </span>
                                            </Link>
                                        ) : (
                                            <Link to="/login">
                                                <Button size="sm" variant="primary">
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
                        className="fixed inset-0 top-16 bg-white dark:bg-zinc-950 z-40 md:hidden border-t border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col"
                    >
                        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                            {navLinks.map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => !link.submenu && setIsOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between p-3 rounded-lg text-base font-medium transition-colors",
                                                location.pathname === link.path
                                                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                                            )}
                                        >
                                            <span className="flex items-center gap-3">
                                                <Icon className="w-4 h-4 opacity-70" />
                                                {link.name}
                                            </span>
                                            {link.submenu && <ChevronDown className="w-4 h-4 opacity-50" />}
                                        </Link>

                                        {/* Mobile Submenu */}
                                        {link.submenu && (
                                            <div className="ml-4 mt-1 pl-4 border-l border-zinc-100 dark:border-zinc-800 space-y-1">
                                                {link.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block py-2.5 px-3 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800"
                            >
                                {user ? (
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-medium">
                                            {user.avatar ? <img src={user.avatar} className="h-full w-full rounded-full object-cover" alt="" /> : user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-900 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">View Profile</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="px-3">
                                        <Link to="/login" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full">
                                                Log in
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
