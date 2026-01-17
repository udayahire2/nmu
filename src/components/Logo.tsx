
import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
    className?: string;
    textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, textClassName }) => {
    return (
        <div className={cn("flex items-center gap-3 select-none", className)}>
            <svg
                viewBox="0 0 300 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto"
                aria-label="NMU Academics Logo"
            >
                {/* Icon Container: Blue Vertical Pill */}
                <rect
                    x="0"
                    y="5"
                    width="36"
                    height="50"
                    rx="12"
                    className="fill-indigo-600 dark:fill-indigo-500"
                />

                {/* Stylized 'N' inside the container */}
                <path
                    d="M12 20 V40 L24 20 V40"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Text: NMU */}
                <text
                    x="50"
                    y="42"
                    fontFamily="Inter, sans-serif"
                    fontWeight="800"
                    fontSize="32"
                    className={cn("fill-slate-900 dark:fill-white", textClassName)}
                >
                    NMU
                </text>

                {/* Text: ACADEMICS */}
                <text
                    x="135"
                    y="42"
                    fontFamily="Inter, sans-serif"
                    fontWeight="300"
                    fontSize="32"
                    className={cn("fill-slate-900 dark:fill-white", textClassName)}
                >
                    ACADEMICS
                </text>
            </svg>
        </div>
    );
};
