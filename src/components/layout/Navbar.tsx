import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, User as UserIcon, LogOut, Settings, Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "@/components/ui/logo"
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

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95">
            <div className="w-full max-w-screen-2xl mx-auto relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>

                {/* Desktop Navigation - Centered */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link to="/" className="transition-colors hover:text-primary">Home</Link>
                    <Link to="/resources" className="transition-colors hover:text-primary">Browse Materials</Link>
                    <Link to="/about" className="transition-colors hover:text-primary">About</Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 ml-auto">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0.5">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 border-border/60 bg-popover/95 backdrop-blur-xl" align="end" forceMount>
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
                                <Button variant="outline" size="sm" className="h-9 px-4 min-w-[100px]">
                                    Student Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" className="h-9 px-4 min-w-[110px]">
                                    Student Register
                                </Button>
                            </Link>
                        </>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="h-9 w-9 flex items-center justify-center"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden h-9 w-9"
                        onClick={toggleMobileMenu}
                    >
                        <Menu className={`h-5 w-5 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 border-t-2 border-border/80 bg-background/98 backdrop-blur-xl shadow-2xl lg:hidden"
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
                            <div className="flex flex-col gap-2 p-4 pt-0 border-t border-border/60">
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
                                            <Button variant="outline" size="sm" className="w-full h-9">
                                                Student Login
                                            </Button>
                                        </Link>
                                        <Link to="/signup" onClick={closeMobileMenu}>
                                            <Button size="sm" className="w-full h-9">
                                                Student Register
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </header >
    )
}
