import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "@/components/ui/Logo"
import { useState } from "react"

export function Navbar() {
    const { setTheme, theme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        // Validate and submit
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
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
