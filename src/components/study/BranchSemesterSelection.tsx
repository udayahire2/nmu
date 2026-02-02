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
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                        <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Select Your Branch</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {BRANCHES.map((branch) => (
                        <motion.button
                            key={branch}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onBranchSelect(branch)}
                            aria-pressed={selectedBranch === branch}
                            className={cn(
                                "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 gap-3 text-center h-40",
                                selectedBranch === branch
                                    ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-lg shadow-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                    : "border-border/40 bg-card hover:border-primary/30 hover:bg-accent/5 hover:shadow-md"
                            )}
                        >
                            <span className="font-semibold">{branch}</span>
                            {selectedBranch === branch && (
                                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                    Selected
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Semester Section - Only show if branch is selected (Progressive Disclosure) */}
            {selectedBranch && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Select Semester</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                        {SEMESTERS.map((sem) => (
                            <motion.button
                                key={sem}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSemesterSelect(sem.toString())}
                                aria-pressed={selectedSemester === sem.toString()}
                                className={cn(
                                    "flex flex-col items-center justify-center aspect-square rounded-xl border-2 transition-all duration-200",
                                    selectedSemester === sem.toString()
                                        ? "border-primary bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-background transform scale-105"
                                        : "border-border/40 bg-card hover:border-primary/30 hover:bg-accent/5 hover:shadow-sm"
                                )}
                            >
                                <span className="text-xs uppercase opacity-70 font-semibold">Sem</span>
                                <span className="text-xl font-bold">{sem}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.section>
            )}
        </div>
    );
}
