import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

interface AdminStatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: string; // Expecting base color class like "indigo" (not full class)
    delay?: number;
}

export default function AdminStatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    color = "indigo",
    delay = 0
}: AdminStatsCardProps) {
    // Map base colors to their specific shade classes
    const colorStyles = {
        indigo: {
            bg: "bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-500/20 dark:to-indigo-500/10",
            text: "text-indigo-700 dark:text-indigo-300",
            border: "group-hover:border-indigo-200 dark:group-hover:border-indigo-800"
        },
        emerald: {
            bg: "bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-500/10",
            text: "text-emerald-700 dark:text-emerald-300",
            border: "group-hover:border-emerald-200 dark:group-hover:border-emerald-800"
        },
        blue: {
            bg: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-500/10",
            text: "text-blue-700 dark:text-blue-300",
            border: "group-hover:border-blue-200 dark:group-hover:border-blue-800"
        },
        red: {
            bg: "bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-500/20 dark:to-rose-500/10",
            text: "text-rose-700 dark:text-rose-300",
            border: "group-hover:border-rose-200 dark:group-hover:border-rose-800"
        },
        violet: {
            bg: "bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-500/20 dark:to-violet-500/10",
            text: "text-violet-700 dark:text-violet-300",
            border: "group-hover:border-violet-200 dark:group-hover:border-violet-800"
        },
        amber: {
            bg: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-500/10",
            text: "text-amber-700 dark:text-amber-300",
            border: "group-hover:border-amber-200 dark:group-hover:border-amber-800"
        },
    };

    // Fallback for custom colors passed as full Tailwind classes (legacy support if needed, but simplified)
    // Ideally we migrate usages to just pass "indigo" instead of "text-indigo-500"
    const isLegacyColor = color.includes('text-');
    const baseColor = isLegacyColor ? color.split('-')[1] : color;
    const styles = colorStyles[baseColor as keyof typeof colorStyles] || colorStyles.indigo;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={cn(
                "group relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-lg dark:hover:shadow-zinc-900/50 transition-all duration-300 h-full",
                styles.border
            )}
        >
            <div className="flex items-start justify-between mb-5">
                <div className={cn(
                    "p-3.5 rounded-xl transition-all duration-300 shadow-sm",
                    styles.bg
                )}>
                    <Icon className={cn("w-6 h-6", styles.text)} strokeWidth={2.5} />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm",
                        trendUp
                            ? "text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/30"
                            : "text-rose-700 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900/30"
                    )}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
                    {title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {value}
                </h3>
            </div>
        </motion.div>
    );
}
