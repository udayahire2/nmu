"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


interface SemesterSelectionProps {
    selectedSemester: number | null;
    onSelect: (semester: number) => void;
}

const semesters = [1, 2, 3, 4, 5, 6];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export function SemesterSelection({ selectedSemester, onSelect }: SemesterSelectionProps) {
    return (
        <section
            id="semester-selection"
            className="w-full max-w-4xl mx-auto px-4 py-16"
        >
            <div className="text-center mb-10 space-y-2">
                <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">
                    Select Semester
                </h2>
                <p className="text-muted-foreground text-sm font-medium">Choose your current academic term to browse subjects</p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
            >
                {semesters.map((semester) => (
                    <button
                        key={semester}
                        onClick={() => onSelect(semester)}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-24 rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            selectedSemester === semester
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border/60 bg-card text-muted-foreground hover:border-primary/50 hover:bg-accent/40 hover:text-foreground"
                        )}
                        aria-pressed={selectedSemester === semester}
                    >
                        <span className={cn(
                            "text-[10px] uppercase font-bold tracking-wider",
                            selectedSemester === semester ? "text-primary-foreground/70" : "text-muted-foreground/60"
                        )}>Sem</span>
                        <span className="text-2xl font-bold">{semester}</span>
                    </button>
                ))}
            </motion.div>
        </section>
    );
}

export default SemesterSelection;
