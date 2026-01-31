import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, User, LogOut, Settings, Menu, X, Search, Bell, ChevronDown, Home, BookOpen, GraduationCap, Sparkles } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Logo } from "@/components/ui/logo"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function Navbar() {
    const { setTheme, theme } = useTheme()
    const [user, setUser] = useState<any>(null)
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [notifications] = useState(3) // Mock notification count
    const navigate = useNavigate()
    const location = useLocation()
    const searchRef = useRef<HTMLDivElement>(null)

    // Check user authentication
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error("Failed to parse user", e)
            }
        }
    }, [])

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    const getInitials = (name: string) => {
        if (!name) return "U"
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    }

    const navLinks = [
        { path: "/", label: "Dashboard", icon: Home },
        { path: "/resources", label: "Study Materials", icon: BookOpen },
        { path: "/syllabus", label: "Syllabus", icon: GraduationCap },
        { path: "/progress", label: "Progress", icon: Sparkles },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <>
            <header className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg"
                    : "bg-background/80 backdrop-blur-md border-b border-border/30"
            )}>
                <div className="w-full max-w-screen-2xl mx-auto relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Logo />
                                    <div className="absolute -inset-1 bg-primary/10 rounded-full blur-md opacity-0 " />
                                </div>

                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                            isActive(link.path)
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex mx-4 flex-1 max-w-md relative" ref={searchRef}>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search materials, courses, topics..."
                                className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                                onFocus={() => setSearchOpen(true)}
                            />
                            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-1 border border-border rounded-md px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                                ⌘K
                            </kbd>
                        </div>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {searchOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl p-2 z-50"
                                >
                                    <div className="text-xs text-muted-foreground px-3 py-2">
                                        Quick actions
                                    </div>
                                    <div className="space-y-1">
                                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/50 text-sm transition-colors">
                                            Search "Algorithms" in Study Materials
                                        </button>
                                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/50 text-sm transition-colors">
                                            Browse Computer Science notes
                                        </button>
                                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/50 text-sm transition-colors">
                                            Find video lectures
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="h-9 w-9 rounded-full hover:bg-secondary"
                            aria-label="Toggle theme"
                        >
                            <motion.div
                                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </motion.div>
                        </Button>

                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-secondary relative">
                                    <Bell className="h-4 w-4" />
                                    {notifications > 0 && (
                                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                                            {notifications}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 border-border/60 bg-popover/95 backdrop-blur-xl">
                                <DropdownMenuLabel className="flex items-center justify-between">
                                    <span>Notifications</span>
                                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                                        Mark all as read
                                    </Button>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="max-h-60 overflow-y-auto">
                                    <div className="px-2 py-3 hover:bg-secondary/50 rounded-md cursor-pointer">
                                        <p className="text-sm font-medium">New study material added</p>
                                        <p className="text-xs text-muted-foreground">Data Structures notes for Semester 3</p>
                                    </div>
                                    <div className="px-2 py-3 hover:bg-secondary/50 rounded-md cursor-pointer">
                                        <p className="text-sm font-medium">Assignment due tomorrow</p>
                                        <p className="text-xs text-muted-foreground">Algorithms assignment submission</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="justify-center">
                                    <Link to="/notifications" className="w-full text-center text-sm">
                                        View all notifications
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User Menu */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-10 px-2 rounded-full hover:bg-secondary transition-all">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden md:block text-left">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs text-muted-foreground leading-none">Student</p>
                                            </div>
                                            <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 border-border/60 bg-popover/95 backdrop-blur-xl">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                                <p className="text-xs text-primary mt-1">Premium Student</p>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>My Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="h-9 px-4">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm" className="h-9 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button (Sheet) */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden h-9 w-9 rounded-full"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] border-l border-border/40 backdrop-blur-3xl bg-background/80 p-0 sm:max-w-xs">
                                <SheetHeader className="px-6 py-6 border-b border-border/10">
                                    <SheetTitle className="text-left flex items-center gap-2">
                                        <div className="relative">
                                            <Logo />
                                            <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-50" />
                                        </div>
                                        <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">EduHub</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col h-full pb-6">
                                    <div className="p-4 space-y-6 overflow-y-auto flex-1">
                                        {/* Mobile Search */}
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <input
                                                type="search"
                                                placeholder="Search materials..."
                                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-secondary/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/70"
                                            />
                                        </div>

                                        {/* Mobile Navigation Links */}
                                        <nav className="flex flex-col gap-1">
                                            <div className="text-xs font-semibold text-muted-foreground/70 tracking-wider uppercase px-2 mb-2">Menu</div>
                                            {navLinks.map((link) => {
                                                const Icon = link.icon
                                                return (
                                                    <Link
                                                        key={link.path}
                                                        to={link.path}
                                                        className={cn(
                                                            "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                                            isActive(link.path)
                                                                ? "text-primary bg-primary/10"
                                                                : "text-foreground hover:bg-secondary/60 hover:text-primary"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "absolute inset-0 bg-primary/5 translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0 rounded-lg",
                                                            isActive(link.path) && "hidden"
                                                        )} />
                                                        <Icon className="h-5 w-5 relative z-10" />
                                                        <span className="relative z-10">{link.label}</span>
                                                    </Link>
                                                )
                                            })}
                                        </nav>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-4 border-t border-border/40 mt-auto bg-gradient-to-t from-background to-transparent relative">
                                        {user ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-secondary/30">
                                                    <Avatar className="h-10 w-10 ring-2 ring-background">
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="overflow-hidden">
                                                        <p className="text-sm font-semibold truncate">{user.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Link to="/profile">
                                                        <Button variant="outline" className="w-full h-10 border-border/60 hover:bg-secondary/50">
                                                            <User className="mr-2 h-4 w-4" />
                                                            Profile
                                                        </Button>
                                                    </Link>
                                                    <Button variant="outline" className="w-full h-10 border-border/60 text-red-500 hover:text-red-600 hover:bg-red-500/10 hover:border-red-500/20" onClick={handleLogout}>
                                                        <LogOut className="mr-2 h-4 w-4" />
                                                        Logout
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3">
                                                <Link to="/login">
                                                    <Button variant="outline" className="w-full h-11 border-primary/20 hover:bg-primary/5">
                                                        Sign In
                                                    </Button>
                                                </Link>
                                                <Link to="/signup">
                                                    <Button className="w-full h-11 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                                        Get Started
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </>
    )
}