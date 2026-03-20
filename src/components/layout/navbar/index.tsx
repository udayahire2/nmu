"use client";

import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { NavbarLinks } from "./navbar-links";
import { NavbarSearch } from "./navbar-search";
import { NavbarThemeToggle } from "./navbar-theme-toggle";
import { UserMenu } from "./user-menu";
import { NavbarMobileCalm } from "./navbar-mobile-calm";

export function Navbar() {
  const scrolled = useScroll(20);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled ? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden md:block">
            <NavbarLinks />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <NavbarSearch />
          </div>

          <NavbarThemeToggle />
          <UserMenu />
          <NavbarMobileCalm />
        </div>

      </div>
    </header>
  );
}