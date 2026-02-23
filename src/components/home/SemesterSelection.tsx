"use client";

import { cn } from "@/lib/utils";

interface SemesterSelectionProps {
    selectedSemester: number | null;
    onSelect: (semester: number) => void;
}

const semesters = [1, 2, 3, 4, 5, 6];

export function SemesterSelection({ selectedSemester, onSelect }: SemesterSelectionProps) {
    return (
        <section
            id="semester-selection"
            className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16"
        >
            <div className="text-center mb-10 space-y-2">
                <h2 className="text-lg font-bold text-foreground uppercase tracking-[0.2em]">
                    Select Semester
                </h2>
                <p className="text-muted-foreground text-sm">
                    Choose your current academic term to browse subjects
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {semesters.map((semester) => {
                    const isActive = selectedSemester === semester;

                    return (
                        <button
                            key={semester}
                            onClick={() => onSelect(semester)}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-[88px] sm:h-24 rounded-lg border transition-colors duration-200 cursor-pointer",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                isActive
                                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent/30 hover:text-foreground"
                            )}
                            aria-pressed={isActive}
                        >
                            <span
                                className={cn(
                                    "text-[10px] uppercase font-semibold tracking-widest leading-none mb-1",
                                    isActive
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground/50"
                                )}
                            >
                                Sem
                            </span>
                            <span className="text-2xl font-bold leading-none">
                                {semester}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default SemesterSelection;
