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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="search"
                    placeholder="Search materials, courses, topics..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    onFocus={() => setSearchOpen(true)}
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-1 border border-border rounded-md px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
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
                        className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl p-2 z-50"
                    >
                        <div className="text-xs text-muted-foreground px-3 py-2">
                            Quick actions
                        </div>
                        <div className="space-y-1">
                            {MOCK_QUICK_ACTIONS.map((action, index) => (
                                <button
                                    key={index}
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/50 text-sm transition-colors"
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
