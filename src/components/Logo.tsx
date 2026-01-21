import React from "react";
import { cn } from "../lib/utils";

interface LogoProps {
    className?: string;
    textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, textClassName }) => {
    return (
        <div className={cn("flex items-center gap-3 select-none", className)}>
            {/* Icon */}
            <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="NMU StudyHub Logo"
                >
                    {/* Outer frame (authority) */}
                    <rect x="4" y="4" width="16" height="16" rx="3" />

                    {/* Compass / Focus diamond */}
                    <path d="M12 7 L15 12 L12 17 L9 12 Z" />

                    {/* Knowledge path */}
                    <path d="M12 4 V7" />
                    <path d="M12 17 V20" />
                </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col leading-none">
                <span
                    className={cn(
                        "font-sans font-extrabold text-xl tracking-tight text-slate-900 dark:text-white",
                        textClassName
                    )}
                >
                    NMU
                </span>
                <span
                    className={cn(
                        "font-sans text-[0.7rem] font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400",
                        textClassName
                    )}
                >
                    StudyHub
                </span>
            </div>
        </div>
    );
};
