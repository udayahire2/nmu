"use client";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";

interface Subject {
    id: string;
    name: string;
    branch?: string;
    semester: number;
}

const mockSubjects: Subject[] = [
    { id: "math-1", name: "Engineering Mathematics I", branch: "Common", semester: 1 },
    { id: "phy", name: "Engineering Physics", branch: "Common", semester: 1 },
    { id: "math-2", name: "Engineering Mathematics II", branch: "Common", semester: 2 },
    { id: "chem", name: "Engineering Chemistry", branch: "Common", semester: 2 },
    { id: "dsa", name: "Data Structures & Algorithms", branch: "Computer Engineering", semester: 3 },
    { id: "oop", name: "Object Oriented Programming", branch: "Computer Engineering", semester: 3 },
    { id: "os", name: "Operating Systems", branch: "Computer Engineering", semester: 4 },
    { id: "cn", name: "Computer Networks", branch: "Computer Engineering", semester: 4 },
    { id: "dbms", name: "Database Management Systems", branch: "Computer Engineering", semester: 5 },
    { id: "toc", name: "Theory of Computation", branch: "Computer Engineering", semester: 5 },
    { id: "ai", name: "Artificial Intelligence", branch: "Computer Engineering", semester: 6 },
    { id: "wt", name: "Web Technology", branch: "Computer Engineering", semester: 6 },
];

interface SubjectListProps {
    selectedSemester: number;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export function SubjectList({ selectedSemester }: SubjectListProps) {
    const subjects = mockSubjects.filter((s) => s.semester === selectedSemester);

    return (
        <section
            id="subject-list"
            className="w-full max-w-3xl mx-auto px-4 my-12"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Subjects – Semester {selectedSemester}
                </h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-3"
            >
                {subjects.map((subject) => (
                    <motion.div key={subject.id} variants={item}>
                        <Link
                            to={`/subject/${subject.id}`}
                            className={cn(
                                "group block p-5 rounded-lg border border-border/60 bg-card",
                                "transition-all duration-200 ease-in-out",
                                "hover:border-primary/50 hover:bg-accent/50 hover:-translate-y-0.5",
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-base font-semibold leading-tight text-foreground group-hover:text-foreground">
                                        {subject.name}
                                    </h3>
                                    {subject.branch && (
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                                            <span>{subject.branch}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-muted-foreground/30 group-hover:text-primary transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {subjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 text-center rounded-xl border border-dashed bg-muted/30"
                    >
                        <BookOpen className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">
                            No subjects found for this semester yet.
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}

export default SubjectList;
