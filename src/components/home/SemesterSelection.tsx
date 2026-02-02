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

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function SemesterSelection({ selectedSemester, onSelect }: SemesterSelectionProps) {
    return (
        <section
            id="semester-selection"
            className="w-full max-w-3xl mx-auto px-4 py-12"
        >
            <div className="text-center mb-8 space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    Choose Your Semester
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">Select your current semester to see relevant subjects</p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            >
                {semesters.map((semester) => (
                    <motion.button
                        key={semester}
                        variants={item}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(semester)}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-20 rounded-xl border-2 transition-all duration-200",
                            selectedSemester === semester
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-muted bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-accent"
                        )}
                        aria-pressed={selectedSemester === semester}
                    >
                        <span className="text-xs uppercase tracking-wider opacity-70">Semester</span>
                        <span className="text-2xl font-bold">{semester}</span>
                    </motion.button>
                ))}
            </motion.div>
        </section>
    );
}

export default SemesterSelection;
