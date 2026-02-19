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
            <div className="hidden lg:flex items-center gap-2">
                <Link to="/login">
                    <Button variant="ghost" size="sm" className="h-9 px-4">
                        Sign In
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button size="sm" className="h-9 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                        Get Started
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 px-2 rounded-full hover:bg-secondary transition-all">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs text-muted-foreground leading-none capitalize">{user.role}</p>
                        </div>
                        <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-border/60 bg-popover/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-primary mt-1 capitalize">{user.role}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
