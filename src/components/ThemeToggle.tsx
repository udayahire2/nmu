import { Moon, Sun } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { cn } from '../lib/utils';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useUser();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "group p-2 rounded-md transition-all duration-300",
                "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
                "active:scale-95"
            )}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
        </button>
    );
}
