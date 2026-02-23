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
        <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                        isActive(link.path)
                            ? "text-foreground bg-secondary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}
