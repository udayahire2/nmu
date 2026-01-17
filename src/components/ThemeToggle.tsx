import { Moon, Sun } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { cn } from '../lib/utils';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useUser();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-2 rounded-full transition-all duration-300",
                "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400",
                "active:scale-95"
            )}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
    );
}
