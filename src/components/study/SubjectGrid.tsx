import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Subject } from "@/data/study-data";
import { ChevronRight, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubjectGridProps {
    subjects: Subject[];
    branch: string;
    semester: string;
}

export function SubjectGrid({ subjects, branch, semester }: SubjectGridProps) {
    if (subjects.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <div className="bg-muted/30 rounded-2xl p-8 border border-dashed">
                    <Book className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No subjects found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        No subjects available for {branch} - Semester {semester}.
                        This might be a new semester or the data is still being updated.
                    </p>
                    <Link to="/resources">
                        <Button variant="outline">
                            Go Back to Selection
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Subjects</h2>
                <span className="text-sm text-muted-foreground">
                    {subjects.length} subject{subjects.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="grid gap-3">
                {subjects.map((subject, i) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: Math.min(i * 0.03, 0.5) // Cap maximum delay at 0.5s
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.995 }}
                    >
                        <Link
                            to={`${subject.id}`}
                            className="group flex items-center justify-between p-5 sm:p-7 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            aria-label={`View ${subject.name} syllabus and resources`}
                        >
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center text-primary shrink-0 transition-colors duration-300">
                                    <Book className="h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {subject.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <span className="font-mono">{subject.code}</span>
                                        <span className="text-border">•</span>
                                        <span>{subject.units.length} learning unit{subject.units.length !== 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                <span className="text-xs font-medium text-primary">View Syllabus</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 ml-4 shrink-0" />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}