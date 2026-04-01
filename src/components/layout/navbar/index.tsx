"use client";

import { Link } from "react-router-dom";

import { Logo } from "@/components/ui/logo";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

import { NavbarLinks } from "./navbar-links";
import { NavbarMobileCalm } from "./navbar-mobile-calm";
import { NavbarSearch } from "./navbar-search";
import { NavbarThemeToggle } from "./navbar-theme-toggle";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const scrolled = useScroll(20);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:block">
            <NavbarLinks />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <div className="hidden lg:block">
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
