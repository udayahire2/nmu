"use client";

import { useState, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, Sun, Moon, LogOut, User, BookOpen } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAV_LINKS } from "@/config/nav-config";
import { useTheme } from "@/components/theme-provider";
import { useLocalAuth } from "@/hooks/use-local-auth";
import { cn } from "@/lib/utils";

// Navbar Search Component
function NavbarSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      navigate("/resources");
      return;
    }

    navigate(`/syllabus?search=${encodeURIComponent(normalizedQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-[240px]">
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="h-9 rounded-md border-border/40 bg-transparent pl-8 pr-2 text-sm focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Search subjects and materials"
      />
    </form>
  );
}

// Desktop Navigation Links Component
function DesktopNavLinks() {
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

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => {
        const active = isActive(link.path);

        return (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-md border border-border/40 bg-transparent hover:bg-muted/50"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}

// User Menu Component (Desktop)
function UserMenuDesktop() {
  const { user, logout, getInitials } = useLocalAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Link to="/login">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-md px-3 text-sm"
          >
            Sign in
          </Button>
        </Link>
        <Link to="/signup">
          <Button size="sm" className="rounded-md px-3 text-sm">
            Get started
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-md px-3 text-sm"
        onClick={() => navigate("/profile")}
      >
        {user.name}
      </Button>
    </div>
  );
}

// Popover Mobile Menu Component
function PopoverMobileMenu() {
  const location = useLocation();
  const { user, logout, getInitials } = useLocalAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const links = [
    ...NAV_LINKS,
    ...(user?.role === "faculty"
      ? [{ path: "/dashboard/faculty", label: "Dashboard" }]
      : []),
    ...(user?.role === "admin"
      ? [{ path: "/admin/dashboard", label: "Admin" }]
      : []),
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md border border-border/40 bg-transparent hover:bg-muted/50 lg:hidden"
          aria-label="Open navigation menu"
        >
          {/* <Menu className="h-4 w-4" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
</svg>

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-md border-border/40 p-2"
      >
        {/* Navigation Links */}
        {links.map((link) => {
          const active = isActive(link.path);

          return (
            <DropdownMenuItem
              key={link.path}
              asChild
              className={cn(
                "rounded-md cursor-pointer",
                active && "bg-muted"
              )}
            >
              <Link
                to={link.path}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 text-sm",
                  active
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="my-2" />

        {/* User Section */}
        {user ? (
          <>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem
              asChild
              className="rounded-md cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <Link to="/profile" className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="rounded-md cursor-pointer"
              onClick={() => navigate("/resources")}
            >
              <Link to="/resources" className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground">
                <BookOpen className="mr-2 h-4 w-4" />
                Study Materials
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={logout}
              className="rounded-md cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild className="rounded-md cursor-pointer">
              <Link to="/login" className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground">
                Sign in
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-md cursor-pointer">
              <Link to="/signup" className="flex items-center rounded-md px-3 py-2 text-sm font-medium">
                Get started
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="my-2" />

        {/* Theme Toggle */}
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-md cursor-pointer"
        >
          {theme === "dark" ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Light mode
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Dark mode
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main Navbar Component
export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo & Desktop Nav */}
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:block">
            <DesktopNavLinks />
          </div>
        </div>

        {/* Right Section: Search, Theme, User */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <NavbarSearch />
          </div>
          <ThemeToggle />
          <UserMenuDesktop />
          <PopoverMobileMenu />
        </div>
      </div>
    </header>
  );
}
