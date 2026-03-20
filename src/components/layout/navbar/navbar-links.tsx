"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config/nav-config";
import { useLocalAuth } from "@/hooks/use-local-auth";

export function NavbarLinks() {
  const location = useLocation();
  const { user } = useLocalAuth();

  const links = [
    ...NAV_LINKS,
    ...(user?.role === "faculty"
      ? [{ path: "/dashboard/faculty", label: "Dashboard" }]
      : []),
    ...(user?.role === "admin"
      ? [{ path: "/admin/dashboard", label: "Admin" }]
      : []),
  ];

  const normalizePath = (path: string) => {
    if (path === "/") return path;

    return path.replace(/\/+$/, "");
  };

  const isActive = (path: string) => {
    const currentPath = normalizePath(location.pathname);
    const targetPath = normalizePath(path);

    if (targetPath === "/") {
      return currentPath === "/";
    }

    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  return (
    <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
      {links.map((link) => {
        const active = isActive(link.path);

        return (
          <Link
            key={link.path}
            to={link.path}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm transition-colors",
              active
                ? "text-foreground font-medium"
                : "text-muted-foreground/80 hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
