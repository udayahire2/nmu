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
        <div className="hidden md:flex flex-1 max-w-md mx-6 lg:mx-10 relative" ref={searchRef}>
            <div className="relative w-full group">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-[15px] w-[15px] text-muted-foreground/60 transition-colors group-focus-within:text-foreground" strokeWidth={2.5} aria-hidden="true" />
                <input
                    type="search"
                    placeholder="Search materials, courses, topics..."
                    className="w-full pl-10 pr-12 py-2 text-[14px] font-medium placeholder:text-muted-foreground/50 bg-muted/40 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-ring/20 focus:bg-muted/60 transition-all shadow-none"
                    onFocus={() => setSearchOpen(true)}
                    aria-label="Search site content"
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center text-[10px] uppercase font-bold text-muted-foreground/40 bg-background/50 px-1.5 py-0.5 rounded pointer-events-none">
                    ⌘K
                </kbd>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-3 bg-popover/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-2 z-50 overflow-hidden"
                    >
                        <div className="text-xs font-semibold text-muted-foreground/70 px-4 pt-2 pb-1 uppercase tracking-wider">
                            Quick Actions
                        </div>
                        <div className="space-y-0.5 p-1">
                            {MOCK_QUICK_ACTIONS.map((action, index) => (
                                <button
                                    key={index}
                                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-muted/50 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:bg-muted/50"
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
