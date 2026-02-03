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
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-secondary relative">
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                            {notifications}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-border/60 bg-popover/95 backdrop-blur-xl">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Mark all as read
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((notification, index) => (
                        <div key={index} className="px-2 py-3 hover:bg-secondary/50 rounded-md cursor-pointer">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.description}</p>
                        </div>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                    <Link to="/notifications" className="w-full text-center text-sm">
                        View all notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
