import { Link } from "react-router-dom"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { NavbarLinks } from "./navbar-links"
import { NavbarSearch } from "./navbar-search"
import { NavbarThemeToggle } from "./navbar-theme-toggle"
import { NavbarNotifications } from "./navbar-notifications"
import { UserMenu } from "./user-menu"
import { NavbarMobile } from "./navbar-mobile"

export function Navbar() {
    const scrolled = useScroll(20)

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            scrolled
                ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg"
                : "bg-background/80 backdrop-blur-md border-b border-border/30"
        )}>
            <div className="w-full max-w-screen-2xl mx-auto relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
                {/* Logo & Navigation */}
                <div className="flex items-center gap-8">
                    <Link to="/">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Logo />
                                <div className="absolute -inset-1 bg-primary/10 rounded-full blur-md opacity-0" />
                            </div>
                        </div>
                    </Link>

                    <NavbarLinks />
                </div>

                {/* Search */}
                <NavbarSearch />

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 ml-auto">
                    <NavbarThemeToggle />
                    <NavbarNotifications />
                    <UserMenu />
                    <NavbarMobile />
                </div>
            </div>
        </header>
    )
}
