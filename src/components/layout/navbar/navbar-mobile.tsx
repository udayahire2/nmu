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
                    className="group lg:hidden h-10 w-10 shrink-0 rounded-full hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-colors relative"
                    aria-label="Open mobile menu"
                >
                    <Menu className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={2} />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-l-0 bg-background/95 backdrop-blur-2xl p-0 sm:max-w-sm shadow-2xl">
                <SheetHeader className="px-6 py-6 border-b border-border/50">
                    <SheetTitle className="text-left flex items-center gap-2">
                        <div className="relative hover:opacity-80 transition-opacity">
                            <Logo />
                        </div>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full bg-background/50">
                    <div className="p-5 space-y-8 overflow-y-auto flex-1">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-foreground" strokeWidth={2.5} />
                            </div>
                            <input
                                type="search"
                                placeholder="Search materials..."
                                className="w-full pl-10 pr-4 py-2.5 text-[15px] font-medium bg-muted/50 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-ring/20 focus:bg-muted/80 transition-all placeholder:text-muted-foreground/60"
                            />
                        </div>

                        <nav className="flex flex-col gap-1.5">
                            <div className="text-[11px] font-bold text-muted-foreground/50 tracking-widest uppercase px-3 mb-2">Navigation</div>
                            {[
                                ...NAV_LINKS,
                                ...(user?.role === 'faculty' ? [{ path: '/dashboard/faculty', label: 'Dashboard' }] : []),
                                ...(user?.role === 'admin' ? [{ path: '/admin/dashboard', label: 'Admin' }] : [])
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-200 relative group",
                                        isActive(link.path)
                                            ? "text-foreground bg-muted/60"
                                            : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                                    )}
                                >
                                    <span>{link.label}</span>
                                    {isActive(link.path) ? (
                                        <div className="ml-auto h-2 w-2 rounded-full bg-foreground shadow-sm" />
                                    ) : (
                                        <div className="ml-auto h-2 w-2 rounded-full bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="p-5 border-t border-border/50 mt-auto bg-background/80 backdrop-blur-md">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/40">
                                    <Avatar className="h-12 w-12 ring-1 ring-border/50">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="bg-background text-foreground font-semibold">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="overflow-hidden flex-1 flex flex-col justify-center">
                                        <p className="text-[15px] font-semibold tracking-tight truncate">{user.name}</p>
                                        <p className="text-[13px] font-medium text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link to="/profile" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
                                        <Button variant="outline" className="w-full h-11 rounded-xl border-border/60 hover:bg-secondary transition-colors font-semibold">
                                            <User className="mr-2 h-[18px] w-[18px]" strokeWidth={2} />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full h-11 rounded-xl border-destructive/20 text-destructive font-semibold hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-colors"
                                        onClick={logout}
                                    >
                                        <LogOut className="mr-2 h-[18px] w-[18px]" strokeWidth={2} />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5 py-2">
                                <div className="text-center">
                                    <p className="text-[17px] font-semibold tracking-tight text-foreground">Welcome to the Platform</p>
                                    <p className="text-sm font-medium text-muted-foreground mt-1">Sign in to access your materials</p>
                                </div>

                                <div className="space-y-3">
                                    <Link to="/signup" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                                        <Button className="w-full h-12 rounded-full font-semibold text-[15px] shadow-none hover:ring-4 hover:ring-foreground/10 transition-all">
                                            Get Started
                                        </Button>
                                    </Link>
                                    <Link to="/login" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                                        <Button variant="outline" className="w-full h-12 rounded-full font-semibold text-[15px] border-border/80 hover:bg-secondary transition-colors">
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
