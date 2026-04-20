import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Shield,
  UploadCloud,
  User,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Logo } from "@/components/ui/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS } from "@/config/nav-config";
import { useLocalAuth } from "@/hooks/use-local-auth";
import { cn } from "@/lib/utils";

import Menu from "../../svgs/menu";

export function NavbarMobileCalm() {
  const location = useLocation();
  const { user, logout, getInitials } = useLocalAuth();

  const links = [
    ...NAV_LINKS,
    ...(user?.role === "faculty" ? [{ path: "/dashboard/faculty", label: "Dashboard" }] : []),
    ...(user?.role === "admin" ? [{ path: "/admin/dashboard", label: "Admin" }] : []),
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === path : location.pathname.startsWith(path);

  const getIcon = (path: string) => {
    if (path === "/") return Home;
    if (path === "/resources") return BookOpen;
    if (path === "/syllabus") return FileText;
    if (path === "/add-study-content") return UploadCloud;
    if (path === "/dashboard/faculty") return LayoutDashboard;
    if (path === "/admin/dashboard") return Shield;
    return ChevronRight;
  };

  const getDescription = (path: string) => {
    if (path === "/") return "Overview and latest sections";
    if (path === "/resources") return "Notes, videos, and topic pages";
    if (path === "/syllabus") return "Subjects and semester syllabus";
    if (path === "/add-study-content") return "Share your study material";
    if (path === "/dashboard/faculty") return "Faculty workflow";
    if (path === "/admin/dashboard") return "Admin controls";
    return "Open section";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full border border-border/70 bg-white/70 shadow-sm lg:hidden dark:bg-background/60"
          aria-label="Open mobile navigation"
        >
          <Menu />
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="left-auto right-0 top-0 h-dvh w-full max-w-sm translate-x-0 translate-y-0 gap-0 rounded-none border-y-0 border-r-0 bg-background p-0 sm:max-w-sm"
      >
        <DialogHeader className="px-4 pb-4 pt-4 text-left">
          <div className="flex items-center justify-between gap-3">
            <Logo />
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="size-9 rounded-full" aria-label="Close mobile navigation">
                <X className="size-4" />
              </Button>
            </DialogClose>
          </div>

          <div className="pt-3">
            <p className="text-sm font-medium text-foreground">Simple navigation for study sessions</p>
            <p className="text-sm text-muted-foreground">Open materials, syllabus, or your account in one tap.</p>
          </div>
        </DialogHeader>

        <Separator />

        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-5 px-4 py-4">
            <section className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-3">
              <div className="space-y-1 px-1">
                <p className="text-sm font-medium text-foreground">Browse</p>
                <p className="text-sm text-muted-foreground">Choose the page you want to open.</p>
              </div>

              <div className="space-y-1">
                {links.map((link) => {
                  const Icon = getIcon(link.path);
                  const active = isActive(link.path);

                  return (
                    <DialogClose asChild key={link.path}>
                      <Link
                        to={link.path}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors",
                          active
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                        )}
                      >
                        <div
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                            active
                              ? "border-border bg-background text-foreground"
                              : "border-transparent bg-muted text-muted-foreground",
                          )}
                        >
                          <Icon className="size-4" strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{link.label}</p>
                          <p className="truncate text-xs text-muted-foreground">{getDescription(link.path)}</p>
                        </div>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" strokeWidth={2} />
                      </Link>
                    </DialogClose>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Quick actions</p>
                <p className="text-sm text-muted-foreground">Open the pages you use most.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <DialogClose asChild>
                  <Button asChild variant="outline" className="justify-start rounded-xl">
                    <Link to="/resources">Open materials</Link>
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button asChild variant="outline" className="justify-start rounded-xl">
                    <Link to="/syllabus">View syllabus</Link>
                  </Button>
                </DialogClose>
              </div>
            </section>
          </div>
        </ScrollArea>

        <Separator />

        <div className="px-4 py-4">
          {user ? (
            <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <DialogClose asChild>
                    <Button asChild variant="outline">
                      <Link to="/profile">
                        <User className="size-4" strokeWidth={2} />
                        Profile
                      </Link>
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={logout}>
                      <LogOut className="size-4" strokeWidth={2} />
                      Logout
                    </Button>
                  </DialogClose>
                </div>
            </section>
          ) : (
            <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Access your study space</p>
                  <p className="text-sm text-muted-foreground">
                    Sign in to save time and keep your study journey organized.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <DialogClose asChild>
                    <Button asChild>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button asChild variant="outline">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </DialogClose>
                </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
