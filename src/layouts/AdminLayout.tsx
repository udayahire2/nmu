import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Settings,
    LogOut,
    Menu,

    Search,
    Bell,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/Logo";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: BookOpen, label: 'Resources', path: '/admin/resources' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-transparent flex overflow-hidden font-inter selection:bg-primary/20">
            {/* Global Metallic/Mesh Background */}
            <div className="fixed inset-0 -z-50 bg-[#0a0a0a]">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Sidebar (Glass) */}
            <aside className={`
                fixed inset-y-4 left-4 z-50 w-64 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl flex flex-col
                transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                md:relative md:translate-x-0 md:inset-y-0 md:left-0 md:h-screen md:rounded-none md:border-y-0 md:border-l-0 md:border-r md:bg-black/20
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-[110%] md:translate-x-0'}
            `}>
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-8 border-b border-white/5">
                    <div className="scale-90 origin-left">
                        <Logo />
                    </div>
                </div>

                {/* Sidebar Nav */}
                <div className="flex-1 py-8 px-4 space-y-1 overflow-y-auto scrollbar-none">
                    <div className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                        Overview
                    </div>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path} className="block group">
                                <div className={`
                                    relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                                    ${isActive
                                        ? "text-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.15)]"
                                        : "text-muted-foreground/80 hover:text-foreground hover:bg-white/5"
                                    }
                                `}>
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]" />
                                    )}
                                    <item.icon className={`h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-primary" : ""}`} />
                                    <span className="font-medium text-sm tracking-wide">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Sidebar Footer (Profile) */}
                <div className="p-4 mx-4 mb-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white/10 ring-2 ring-black/20">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <p className="text-sm font-semibold truncate text-foreground">Admin User</p>
                            <p className="text-[10px] text-muted-foreground truncate">Premium Plan</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-400/10">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Content Gradient Overlay */}
                <div className="absolute inset-0 bg-background/80 md:bg-background/40 pointer-events-none -z-10" />

                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
                    <div className="absolute inset-0 bg-background/0 backdrop-blur-0 md:bg-background/0" /> {/* Transparent header area, blur comes from content scrolling behind if needed, but here we want clean looks */}

                    <div className="flex items-center gap-4 z-10">
                        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:bg-white/10" onClick={() => setSidebarOpen(true)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="hidden md:flex flex-col">
                            <h2 className="text-lg font-semibold tracking-tight text-foreground">
                                {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                            </h2>
                            <p className="text-xs text-muted-foreground">Welcome back, Admin</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 z-10">
                        <div className="relative hidden md:block group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-64 pl-9 h-10 bg-black/20 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:bg-black/30 rounded-xl transition-all"
                            />
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background" />
                        </Button>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
