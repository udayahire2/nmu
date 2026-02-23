import { Button } from "@/components/ui/button"
import { Menu, Search, User, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Logo } from "@/components/ui/logo"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/config/nav-config"
import { useLocalAuth } from "@/hooks/use-local-auth"

export function NavbarMobile() {
    const location = useLocation()
    const { user, logout, getInitials } = useLocalAuth()

    const isActive = (path: string) => location.pathname === path

    return (
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
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background p-0 sm:max-w-xs">
                <SheetHeader className="px-6 py-6 border-b border-border">
                    <SheetTitle className="text-left flex items-center gap-2">
                        <div className="relative">
                            <Logo />
                        </div>
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
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-border transition-colors placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-1.5">
                            <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-2 mb-1">Navigation</div>
                            {[
                                ...NAV_LINKS,
                                ...(user?.role === 'faculty' ? [{ path: '/dashboard/faculty', label: 'Dashboard' }] : []),
                                ...(user?.role === 'admin' ? [{ path: '/admin/dashboard', label: 'Admin' }] : [])
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 relative",
                                        isActive(link.path)
                                            ? "text-foreground bg-secondary"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    )}
                                >

                                    <span>{link.label}</span>
                                    {isActive(link.path) && (
                                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-border mt-auto space-y-4">
                        {user ? (
                            <>
                                {/* User Info Card */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary border border-border">
                                    <Avatar className="h-11 w-11 ring-2 ring-border">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="bg-muted text-foreground font-semibold">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="overflow-hidden flex-1">
                                        <p className="text-sm font-semibold truncate">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                    <Link to="/profile">
                                        <Button variant="outline" className="w-full h-10 border-border hover:bg-secondary transition-colors">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full h-10 border-destructive/20 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-colors"
                                        onClick={logout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-3">
                                {/* Welcome Message */}
                                <div className="text-center pb-2">
                                    <p className="text-sm font-medium text-foreground">Welcome!</p>
                                    <p className="text-xs text-muted-foreground">Sign in to access your materials</p>
                                </div>

                                {/* Auth Buttons */}
                                <div className="space-y-2">
                                    <Link to="/signup">
                                        <Button className="w-full h-11 transition-colors">
                                            Get Started
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button variant="outline" className="w-full h-11 border-border hover:bg-secondary transition-colors">
                                            Sign In
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
