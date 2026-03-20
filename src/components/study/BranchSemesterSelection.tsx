import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { ElementType } from "react";
import {
    Building2,
    Check,
    Cog,
    Globe,
    Monitor,
    Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BRANCHES, SEMESTERS } from "@/data/study-data";
import { cn } from "@/lib/utils";

interface BranchSemesterSelectionProps {
    selectedBranch: string | null;
    selectedSemester: string | null;
    onBranchSelect: (b: string) => void;
    onSemesterSelect: (s: string) => void;
}

const BRANCH_META: Record<
    string,
    {
        icon: ElementType;
        label: string;
        desc: string;
    }
> = {
    Computer: {
        icon: Monitor,
        label: "Computer Engg.",
        desc: "Software, DSA, OS and networking fundamentals.",
    },
    IT: {
        icon: Globe,
        label: "Information Tech.",
        desc: "Web, databases, security and cloud systems.",
    },
    Mechanical: {
        icon: Cog,
        label: "Mechanical Engg.",
        desc: "Thermodynamics, CAD and machine design topics.",
    },
    Civil: {
        icon: Building2,
        label: "Civil Engg.",
        desc: "Structures, surveying and construction materials.",
    },
    Electrical: {
        icon: Zap,
        label: "Electrical Engg.",
        desc: "Circuits, machines and power system studies.",
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function BranchSemesterSelection({
    selectedBranch,
    selectedSemester,
    onBranchSelect,
    onSemesterSelect,
}: BranchSemesterSelectionProps) {
    const selectedMeta = selectedBranch ? BRANCH_META[selectedBranch] : null;

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 px-5 py-6 lg:px-6 lg:py-8">
            <Card className="border-border/50 bg-background/80 shadow-none">
                <CardHeader className="space-y-3">
                    <Badge variant="outline" className="w-fit rounded-full border-border/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Step 1
                    </Badge>
                    <div className="space-y-1.5">
                        <CardTitle className="text-lg tracking-tight">Select your branch</CardTitle>
                        <CardDescription className="text-sm leading-6">
                            Choose your engineering discipline to access relevant study materials.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {BRANCHES.map((branch) => {
                            const meta = BRANCH_META[branch];
                            if (!meta) return null;

                            const Icon = meta.icon;
                            const isActive = selectedBranch === branch;

                            return (
                                <motion.button
                                    key={branch}
                                    variants={fadeUpVariants}
                                    onClick={() => onBranchSelect(branch)}
                                    aria-pressed={isActive}
                                    className={cn(
                                        "group relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left outline-none transition-all duration-200",
                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                                        isActive
                                            ? "border-primary/50 bg-primary/[0.03] ring-1 ring-primary/20 shadow-sm"
                                            : "border-border/60 bg-background hover:border-border hover:bg-accent/30"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-200",
                                            isActive
                                                ? "border-primary/20 bg-background text-primary"
                                                : "border-border/50 bg-background text-muted-foreground group-hover:border-border group-hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className={cn("truncate text-[15px] font-medium transition-colors", isActive ? "text-primary" : "text-foreground")}>
                                                {meta.label}
                                            </p>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="shrink-0"
                                                >
                                                    <Check className="h-[18px] w-[18px] text-primary" />
                                                </motion.div>
                                            )}
                                        </div>
                                        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
                                            {meta.desc}
                                        </p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </CardContent>
            </Card>

            <AnimatePresence mode="popLayout">
                {selectedBranch && selectedMeta && (
                    <motion.div
                        key="semester-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                        className="overflow-hidden"
                    >
                        <Card className="border-border/50 bg-background/80 shadow-none">
                            <CardHeader className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline" className="rounded-full border-border/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        Step 2
                                    </Badge>
                                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                        {selectedMeta.label}
                                    </Badge>
                                </div>
                                <div className="space-y-1.5">
                                    <CardTitle className="text-lg tracking-tight">Select semester</CardTitle>
                                    <CardDescription className="text-sm leading-6">
                                        What semester are you currently studying in?
                                    </CardDescription>
                                </div>
                                <Separator className="bg-border/50" />
                            </CardHeader>

                            <CardContent>
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-8"
                                >
                                    {SEMESTERS.map((sem) => {
                                        const isActive = selectedSemester === sem.toString();
                                        return (
                                            <motion.button
                                                variants={fadeUpVariants}
                                                key={sem}
                                                onClick={() => onSemesterSelect(sem.toString())}
                                                aria-pressed={isActive}
                                                className={cn(
                                                    "relative flex h-14 flex-col items-center justify-center rounded-xl border p-3 outline-none transition-all duration-200",
                                                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                                                    isActive
                                                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                                        : "border-border/60 bg-background text-foreground hover:border-border hover:bg-accent/60"
                                                )}
                                            >
                                                <span className={cn("text-[10px] font-semibold uppercase tracking-wider", isActive ? "text-primary-foreground/90" : "text-muted-foreground")}>
                                                    Sem
                                                </span>
                                                <span className="mt-0.5 text-[15px] font-bold">
                                                    {sem}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
