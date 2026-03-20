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
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b-0 bg-background/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-b-0 bg-background/95"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Left */}
        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:block">
            <NavbarLinks />
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
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
