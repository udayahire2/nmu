import React from "react";
import { cn } from "../lib/utils";

interface LogoProps {
    className?: string;
    textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, textClassName }) => {
    return (
        <div className={cn("flex items-center gap-3 select-none", className)}>
            {/* Icon: Abstract 'Study Material' / Stacked Docs */}
            <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-500">
                <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 shrink-0"
                    fill="currentColor"
                    aria-label="NMU StudyHub Logo"
                >
                    {/* Base Document/Book */}
                    <path
                        fillOpacity="0.4"
                        d="M4 6C4 4.34315 5.34315 3 7 3H15C15.5523 3 16 3.44772 16 4V18C16 19.6569 14.6569 21 13 21H5C4.44772 21 4 20.5523 4 20V6Z"
                    />
                    {/* Top Active Document/Page (Offset) */}
                    <path
                        d="M10 6C10 4.34315 11.3431 3 13 3H18.5C19.3284 3 20 3.67157 20 4.5V17.5C20 19.433 18.433 21 16.5 21H13C11.3431 21 10 19.6569 10 18V6Z"
                    />
                </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center -space-y-0.5">
                <span
                    className={cn(
                        "font-sans font-bold text-[1.15rem] tracking-tight text-slate-900 dark:text-white leading-none",
                        textClassName
                    )}
                >
                    NMU
                </span>
                <span
                    className={cn(
                        "font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-slate-500 dark:text-slate-400 leading-none",
                        textClassName
                    )}
                >
                    StudyHub
                </span>
            </div>
        </div>
    );
};
