"use client";

import { Link, useLocation } from "react-router-dom";

import { NAV_LINKS } from "@/config/nav-config";
import { useLocalAuth } from "@/hooks/use-local-auth";
import { cn } from "@/lib/utils";

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
    <nav className="hidden items-center gap-1 lg:flex">
      {links.map((link) => {
        const active = isActive(link.path);

        return (
          <Link
            key={link.path}
            to={link.path}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
