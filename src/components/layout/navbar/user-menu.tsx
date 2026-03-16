import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLocalAuth } from "@/hooks/use-local-auth"

export function UserMenu() {
    const { user, logout, getInitials } = useLocalAuth()
    const navigate = useNavigate()

    if (!user) {
        return (
            <div className="hidden lg:flex items-center gap-3 pr-2">
                <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Sign In
                </Link>
                <Link to="/signup" tabIndex={-1}>
                    <Button size="sm" className="h-[36px] rounded-full px-5 text-sm font-semibold shadow-none transition-all hover:ring-4 hover:ring-foreground/10">
                        Get Started
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 shrink-0 rounded-full px-1.5 hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-all group">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 ring-1 ring-border/50 transition-shadow group-hover:ring-border">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden text-left md:block">
                            <p className="text-sm font-semibold leading-none tracking-tight">{user.name}</p>
                            <p className="text-[11px] font-medium leading-none tracking-wide text-muted-foreground capitalize mt-0.5">{user.role}</p>
                        </div>
                        <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-foreground md:block" strokeWidth={2.5} />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] rounded-2xl border-border/60 bg-popover/95 p-1.5 shadow-xl backdrop-blur-xl mt-2">
                <DropdownMenuLabel className="font-normal p-2.5">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-1 ring-border/50">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-muted font-semibold">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-semibold leading-none tracking-tight">{user.name}</p>
                            <p className="text-xs font-medium leading-none text-muted-foreground truncate max-w-[140px]">{user.email}</p>
                            <p className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase mt-1">{user.role}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-1" />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="rounded-xl px-3 py-2.5 cursor-pointer transition-colors focus:bg-muted/50">
                    <User className="mr-2.5 h-[18px] w-[18px] text-muted-foreground" strokeWidth={2} />
                    <span className="font-medium text-sm">My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="rounded-xl px-3 py-2.5 cursor-pointer transition-colors focus:bg-muted/50">
                    <Settings className="mr-2.5 h-[18px] w-[18px] text-muted-foreground" strokeWidth={2} />
                    <span className="font-medium text-sm">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-1" />
                <DropdownMenuItem onClick={logout} className="rounded-xl px-3 py-2.5 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors">
                    <LogOut className="mr-2.5 h-[18px] w-[18px]" strokeWidth={2} />
                    <span className="font-medium text-sm">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
