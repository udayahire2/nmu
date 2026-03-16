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
                ? "bg-background/80 backdrop-blur-2xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-background/60"
                : "bg-background/0 backdrop-blur-none border-b border-transparent"
        )}>
            <div className="w-full max-w-screen-2xl mx-auto relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo & Navigation - Left Side */}
                <div className="flex items-center gap-6 md:gap-8">
                    <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
                        <Logo />
                    </Link>

                    <NavbarLinks />
                </div>

                {/* Search - Center/Responsive Flex */}
                <NavbarSearch />

                {/* Right Side Actions */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <NavbarThemeToggle />
                    <NavbarNotifications />
                    <UserMenu />
                    <NavbarMobile />
                </div>
            </div>
        </header>
    )
}
