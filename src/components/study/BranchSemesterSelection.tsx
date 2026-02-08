import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { BRANCHES, SEMESTERS } from "@/data/study-data";
import { cn } from "@/lib/utils";

interface BranchSemesterSelectionProps {
    selectedBranch: string | null;
    selectedSemester: string | null;
    onBranchSelect: (b: string) => void;
    onSemesterSelect: (s: string) => void;
}

export function BranchSemesterSelection({
    selectedBranch,
    selectedSemester,
    onBranchSelect,
    onSemesterSelect
}: BranchSemesterSelectionProps) {

    return (
        <div className="space-y-12 max-w-4xl mx-auto py-8">
            {/* Branch Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6 px-1">
                    <div className="p-2 rounded-lg bg-muted border border-border">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight">Select Branch</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {BRANCHES.map((branch) => (
                        <button
                            key={branch}
                            onClick={() => onBranchSelect(branch)}
                            aria-pressed={selectedBranch === branch}
                            className={cn(
                                "flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-200 gap-3 text-center h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                selectedBranch === branch
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-border/60 bg-card hover:border-primary/50 hover:bg-accent/30"
                            )}
                        >
                            <span className="text-sm font-medium">{branch}</span>
                            {selectedBranch === branch && (
                                <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                    Selected
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Semester Section - Only show if branch is selected (Progressive Disclosure) */}
            {selectedBranch && (
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-1">
                        <div className="p-2 rounded-lg bg-muted border border-border">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight">Select Semester</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                        {SEMESTERS.map((sem) => (
                            <button
                                key={sem}
                                onClick={() => onSemesterSelect(sem.toString())}
                                aria-pressed={selectedSemester === sem.toString()}
                                className={cn(
                                    "flex flex-col items-center justify-center aspect-square rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    selectedSemester === sem.toString()
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border/60 bg-card hover:border-primary/50 hover:bg-accent/30"
                                )}
                            >
                                <span className={cn(
                                    "text-[10px] uppercase font-bold tracking-wider",
                                    selectedSemester === sem.toString() ? "text-primary-foreground/80" : "text-muted-foreground/70"
                                )}>Sem</span>
                                <span className="text-lg font-bold">{sem}</span>
                            </button>
                        ))}
                    </div>
                </motion.section>
            )}
        </div>
    );
}
