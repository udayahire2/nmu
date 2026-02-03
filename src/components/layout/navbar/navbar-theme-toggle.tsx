import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function NavbarThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 rounded-full hover:bg-secondary"
            aria-label="Toggle theme"
        >
            <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )}
            </motion.div>
        </Button>
    )
}
