import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Link } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MOCK_NOTIFICATIONS = [
    {
        title: "New study material added",
        description: "Data Structures notes for Semester 3"
    },
    {
        title: "Assignment due tomorrow",
        description: "Algorithms assignment submission"
    }
]

export function NavbarNotifications() {
    const [notifications] = useState(3) // Mock notification count

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="group relative h-10 w-10 shrink-0 rounded-full hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-colors"
                    aria-label="View notifications"
                >
                    <Bell className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={2} />
                    {notifications > 0 && (
                        <span className="absolute right-[9px] top-[9px] flex h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl border-border/60 bg-popover/95 p-1 shadow-xl backdrop-blur-xl mt-2">
                <DropdownMenuLabel className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-sm font-semibold tracking-tight">Notifications</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-semibold text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground">
                        Mark all as read
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-2" />
                <div className="max-h-60 overflow-y-auto p-1">
                    {MOCK_NOTIFICATIONS.map((notification, index) => (
                        <div key={index} className="mx-1 my-0.5 cursor-pointer space-y-1 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/50">
                            <p className="text-sm font-medium leading-none tracking-tight">{notification.title}</p>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{notification.description}</p>
                        </div>
                    ))}
                </div>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem className="m-1 justify-center rounded-xl p-0 focus:bg-muted/50">
                    <Link to="/notifications" className="w-full px-3 py-2.5 text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                        View all notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
