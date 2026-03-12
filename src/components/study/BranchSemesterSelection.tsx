import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Monitor,
    Globe,
    Cog,
    Building2,
    Zap,
    Check,
} from "lucide-react";
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
        icon: React.ElementType;
        label: string;
        desc: string;
    }
> = {
    Computer: {
        icon: Monitor,
        label: "Computer Engg.",
        desc: "Software, DSA, OS & Networking",
    },
    IT: {
        icon: Globe,
        label: "Information Tech.",
        desc: "Web, Databases & Cloud Systems",
    },
    Mechanical: {
        icon: Cog,
        label: "Mechanical Engg.",
        desc: "Thermodynamics, CAD & Mechanics",
    },
    Civil: {
        icon: Building2,
        label: "Civil Engg.",
        desc: "Structures, Surveying & Materials",
    },
    Electrical: {
        icon: Zap,
        label: "Electrical Engg.",
        desc: "Circuits, Machines & Power Systems",
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
        <div className="w-full max-w-4xl mx-auto py-8 lg:py-12 space-y-12">
            {/* ── Branch Selection ─────────────────────────────────────── */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <div className="flex flex-col gap-1.5 px-0.5">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                        Select your branch
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Choose your engineering discipline to access relevant study materials.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                                    "group relative flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 outline-none w-full",
                                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                                    isActive
                                        ? "border-primary/50 bg-primary/[0.03] ring-1 ring-primary/20 shadow-sm"
                                        : "border-border/60 bg-transparent hover:bg-accent/40 hover:border-border"
                                )}
                            >
                                <div
                                    className={cn(
                                        "shrink-0 flex items-center justify-center w-10 h-10 rounded-[10px] border transition-colors duration-200 mt-0.5",
                                        isActive
                                            ? "bg-background border-primary/20 text-primary"
                                            : "bg-background border-border/50 text-muted-foreground group-hover:text-foreground group-hover:border-border"
                                    )}
                                >
                                    <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                                </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className={cn("text-[15px] font-medium truncate transition-colors", isActive ? "text-primary" : "text-foreground")}>
                                                {meta.label}
                                            </p>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="shrink-0"
                                                >
                                                    <Check className="w-[18px] h-[18px] text-primary" />
                                                </motion.div>
                                            )}
                                        </div>
                                        <p className="text-[13px] text-muted-foreground leading-snug mt-1 line-clamp-2">
                                            {meta.desc}
                                        </p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
            </motion.div>

            {/* ── Semester Selection ───────────────────────────────── */}
            <AnimatePresence mode="popLayout">
                {selectedBranch && selectedMeta && (
                    <motion.div
                        key="semester-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 space-y-5">
                            <div className="h-px w-full bg-border/40" />

                            <div className="flex flex-col gap-1.5 px-0.5">
                                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                                    Select semester
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    What semester are you currently studying in?
                                </p>
                            </div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2"
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
                                                "relative flex flex-col items-center justify-center p-3 h-14 rounded-xl border transition-all duration-200 outline-none",
                                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                                                isActive
                                                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                                    : "border-border/60 bg-transparent hover:bg-accent/60 hover:border-border text-foreground"
                                            )}
                                        >
                                            <span className={cn("text-[10px] uppercase tracking-wider font-semibold", isActive ? "text-primary-foreground/90" : "text-muted-foreground")}>
                                                Sem
                                            </span>
                                            <span className="text-[15px] font-bold mt-0.5">
                                                {sem}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
