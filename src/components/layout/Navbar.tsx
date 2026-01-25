import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Menu, X, User as UserIcon, LogOut, Settings } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Logo } from "@/components/ui/Logo"
import { useState, useEffect } from "react"
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
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 gap-1">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-5">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link to="/" className="transition-colors hover:text-primary">Home</Link>
                    <Link to="/resources" className="transition-colors hover:text-primary">Browse Materials</Link>
                    <Link to="/about" className="transition-colors hover:text-primary">About</Link>
                </div>

                {/* Desktop CTA Buttons */}
                <div className="ml-auto hidden md:flex items-center gap-3">
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
                                <Button variant="outline" size="sm">
                                    Student Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">
                                    Student Register
                                </Button>
                            </Link>
                        </>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
                    <div className="container mx-auto px-4 py-4 space-y-3">
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

                        <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
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
                    </div>
                </div>
            )}
        </nav>
    )
}
