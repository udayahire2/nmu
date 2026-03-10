import { motion, AnimatePresence } from "framer-motion";
import {
    Monitor,
    Globe,
    Cog,
    Building2,
    Zap,
    CheckCircle2,
    ChevronRight,
    Layers,
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
        gradient: string;
        accent: string;
    }
> = {
    Computer: {
        icon: Monitor,
        label: "Computer Engg.",
        desc: "Software, DSA, OS & Networking",
        gradient: "from-blue-500/10 to-violet-500/10",
        accent: "text-blue-500",
    },
    IT: {
        icon: Globe,
        label: "Information Tech.",
        desc: "Web, Databases & Cloud Systems",
        gradient: "from-cyan-500/10 to-teal-500/10",
        accent: "text-cyan-500",
    },
    Mechanical: {
        icon: Cog,
        label: "Mechanical Engg.",
        desc: "Thermodynamics, CAD & Mechanics",
        gradient: "from-orange-500/10 to-amber-500/10",
        accent: "text-orange-500",
    },
    Civil: {
        icon: Building2,
        label: "Civil Engg.",
        desc: "Structures, Surveying & Materials",
        gradient: "from-emerald-500/10 to-green-500/10",
        accent: "text-emerald-500",
    },
    Electrical: {
        icon: Zap,
        label: "Electrical Engg.",
        desc: "Circuits, Machines & Power Systems",
        gradient: "from-yellow-500/10 to-rose-500/10",
        accent: "text-yellow-500",
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const semPanelVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.04 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const semItemVariants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export function BranchSemesterSelection({
    selectedBranch,
    selectedSemester,
    onBranchSelect,
    onSemesterSelect,
}: BranchSemesterSelectionProps) {
    const selectedMeta = selectedBranch ? BRANCH_META[selectedBranch] : null;

    return (
        <div className="space-y-14 max-w-5xl mx-auto py-6">
            {/* ── Step header ─────────────────────────────────────── */}
            <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    1
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                        Step 1 of 2
                    </p>
                    <h2 className="text-xl font-bold tracking-tight text-foreground leading-tight">
                        Choose Your Branch
                    </h2>
                </div>
            </div>

            {/* ── Branch Cards ─────────────────────────────────────── */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {BRANCHES.map((branch) => {
                    const meta = BRANCH_META[branch];
                    const Icon = meta.icon;
                    const isActive = selectedBranch === branch;

                    return (
                        <motion.button
                            key={branch}
                            variants={cardVariants}
                            onClick={() => onBranchSelect(branch)}
                            aria-pressed={isActive}

                            className={cn(
                                "group relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-shadow duration-300 w-full",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                isActive
                                    ? "border-primary bg-muted/50 shadow-sm"
                                    : "border-border/60 bg-card hover:border-border hover:shadow-md"
                            )}
                        >
                            {/* Icon bubble */}
                            <div
                                className={cn(
                                    "shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border transition-colors duration-200",
                                    isActive
                                        ? "bg-primary/10 border-primary/30 " + meta.accent
                                        : "bg-muted border-border/60 text-muted-foreground group-hover:border-border group-hover:text-foreground"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-foreground truncate">{meta.label}</p>
                                <p className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                                    {meta.desc}
                                </p>
                            </div>

                            {/* Check badge */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                                        className="absolute top-3 right-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* ── Semester Selection ───────────────────────────────── */}
            <AnimatePresence>
                {selectedBranch && selectedMeta && (
                    <motion.div
                        key="semester-section"
                        variants={semPanelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-8"
                    >
                        {/* Divider with connector */}
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-border" />
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground">
                                <ChevronRight className="w-3 h-3" />
                                {selectedMeta.label}
                            </div>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        {/* Step header */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                                2
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                                    Step 2 of 2
                                </p>
                                <h2 className="text-xl font-bold tracking-tight text-foreground leading-tight">
                                    Pick Your Semester
                                </h2>
                            </div>
                        </div>

                        {/* Semester grid */}
                        <motion.div
                            variants={semPanelVariants}
                            className="grid grid-cols-4 sm:grid-cols-8 gap-3"
                        >
                            {SEMESTERS.map((sem) => {
                                const isActive = selectedSemester === sem.toString();
                                return (
                                    <motion.button
                                        key={sem}
                                        variants={semItemVariants}
                                        onClick={() => onSemesterSelect(sem.toString())}
                                        aria-pressed={isActive}

                                        className={cn(
                                            "group relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            isActive
                                                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                : "border-border/60 bg-card hover:border-primary/50 hover:bg-accent/40 hover:shadow-md"
                                        )}
                                    >

                                        <span
                                            className={cn(
                                                "text-[9px] uppercase font-bold tracking-widest",
                                                isActive ? "text-primary-foreground/60" : "text-muted-foreground/60"
                                            )}
                                        >
                                            Sem
                                        </span>
                                        <span className="text-xl font-extrabold leading-tight">{sem}</span>
                                        {isActive && (
                                            <div className="absolute bottom-1.5">
                                                <div className="w-4 h-0.5 rounded-full bg-primary-foreground/40" />
                                            </div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>

                        {/* Helper tip */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                            <Layers className="w-3.5 h-3.5 shrink-0" />
                            <span>Selecting a semester will instantly load subjects for <span className="font-semibold text-foreground">{selectedMeta.label}</span>.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
