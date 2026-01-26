import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, User as UserIcon, LogOut, Settings } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "@/components/ui/Logo"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GridLine } from "@/components/ui/grid-line"

export function Navbar() {
    const { setTheme, theme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

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

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        // Switch to sticky to inherit parent's centering/width logic perfectly. 
        <div className="sticky top-0 z-50 w-full pointer-events-none">
            <div className="flex justify-center w-full">
                <motion.nav
                    layout
                    initial={{ width: "100%", y: 0, borderRadius: 0 }}
                    animate={{
                        width: scrolled ? "auto" : "100%",
                        top: scrolled ? 12 : 0,
                        y: 0,
                        borderRadius: scrolled ? "9999px" : "0px",
                        border: scrolled ? "1px solid rgba(var(--border), 0.4)" : "0px solid transparent",
                        backgroundColor: scrolled ? "rgba(var(--background), 0.7)" : "rgba(var(--background), 0.95)",
                        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "blur(8px) saturate(100%)",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        mass: 0.8
                    }}
                    className={`pointer-events-auto relative flex items-center justify-between gap-5 transition-shadow duration-300 ${scrolled
                        ? "shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-5 py-2.5"
                        : "h-16 w-full px-4 border-b-0 container bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                        }`}
                    style={{
                        maxWidth: scrolled ? "fit-content" : "100%",
                    }}
                >
                    {/* 
                  When scrolled, we want the content to be compact.
                  When not scrolled, we want the content to be container-width.
                */}
                    <motion.div
                        layout="position"
                        className={`flex items-center gap-5 w-full`}
                    >
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <Logo />
                        </Link>

                        {/* Desktop Navigation */}
                        <motion.nav layout="position" className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
                            <Link to="/resources" className="transition-colors hover:text-primary">Browse Materials</Link>
                            <Link to="/about" className="transition-colors hover:text-primary">About</Link>
                        </motion.nav>

                        {/* Right Side Actions */}
                        <motion.div layout="position" className="ml-auto flex items-center gap-2 sm:gap-3">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end" forceMount>
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Update Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs sm:h-9 sm:text-sm">
                                            <span className="sm:hidden">Login</span>
                                            <span className="hidden sm:inline">Student Login</span>
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button size="sm" className="h-8 px-3 text-xs sm:h-9 sm:text-sm">
                                            <span className="sm:hidden">Join</span>
                                            <span className="hidden sm:inline">Student Register</span>
                                        </Button>
                                    </Link>
                                </>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="h-8 w-8 sm:h-9 sm:w-9"
                            >
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden h-10 w-10 flex flex-col items-center justify-center gap-1.5 group"
                                onClick={toggleMobileMenu}
                            >
                                <motion.span
                                    initial={false}
                                    animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="w-6 h-0.5 bg-foreground block rounded-full origin-center"
                                />
                                <motion.span
                                    initial={false}
                                    animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="w-6 h-0.5 bg-foreground block rounded-full origin-center"
                                />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 mt-2 border border-border/40 bg-background/95 backdrop-blur rounded-2xl overflow-hidden shadow-xl mx-4 lg:hidden"
                            >
                                <div className="p-4 space-y-3">
                                    <Link
                                        to="/"
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-background/50 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/resources"
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-background/50 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Browse Materials
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-background/50 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        About
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-2 p-4 pt-0 border-t border-border/40">
                                    {user ? (
                                        <>
                                            <div className="px-3 py-2 flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <Link to="/profile" onClick={closeMobileMenu}>
                                                <Button variant="outline" size="sm" className="w-full justify-start">
                                                    <UserIcon className="mr-2 h-4 w-4" /> Profile
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                                                <LogOut className="mr-2 h-4 w-4" /> Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login" onClick={closeMobileMenu}>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Student Login
                                                </Button>
                                            </Link>
                                            <Link to="/signup" onClick={closeMobileMenu}>
                                                <Button size="sm" className="w-full">
                                                    Student Register
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!scrolled && <GridLine className="absolute bottom-0 left-0" />}
                </motion.nav>
            </div>
        </div>
    )
}
