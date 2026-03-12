import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_QUICK_ACTIONS = [
    'Search "Algorithms" in Study Materials',
    'Browse Computer Science notes',
    'Find video lectures'
]

export function NavbarSearch() {
    const [searchOpen, setSearchOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="hidden md:flex mx-4 flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" strokeWidth={2.5} />
                <input
                    type="search"
                    placeholder="Search materials, courses, topics..."
                    className="w-full pl-9 pr-12 py-2 text-[13px] font-medium placeholder:text-muted-foreground/50 bg-muted/40 border border-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-ring/30 focus:bg-muted/60 transition-all"
                    onFocus={() => setSearchOpen(true)}
                />
                <kbd className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase font-bold text-muted-foreground/50 bg-background/50 rounded-md">
                    ⌘K
                </kbd>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg p-2 z-50"
                    >
                        <div className="text-xs text-muted-foreground px-3 py-2">
                            Quick actions
                        </div>
                        <div className="space-y-1">
                            {MOCK_QUICK_ACTIONS.map((action, index) => (
                                <button
                                    key={index}
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
