import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/config/nav-config"
import { useLocalAuth } from "@/hooks/use-local-auth"

export function NavbarLinks() {
    const location = useLocation()
    const { user } = useLocalAuth()
    
    const isActive = (path: string) => location.pathname === path

    const links = [...NAV_LINKS]
    if (user?.role === 'faculty') {
        links.push({ path: '/dashboard/faculty', label: 'Dashboard' })
    } else if (user?.role === 'admin') {
        links.push({ path: '/admin/dashboard', label: 'Admin' })
    }

    return (
        <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                        "text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
                        isActive(link.path)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}
