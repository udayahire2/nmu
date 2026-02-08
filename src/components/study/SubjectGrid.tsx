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
            <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">Subjects</h2>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {subjects.length} total
                </span>
            </div>

            <div className="grid gap-2">
                {subjects.map((subject, i) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.2,
                            delay: Math.min(i * 0.02, 0.4)
                        }}
                    >
                        <Link
                            to={`${subject.id}`}
                            className="group flex items-center justify-between p-4 sm:p-5 rounded-lg border border-border/60 bg-card hover:border-primary/50 hover:bg-accent/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                            aria-label={`View ${subject.name} syllabus and resources`}
                        >
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0 border border-border/50 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                                    <Book className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {subject.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80 mt-1 uppercase tracking-tight font-medium">
                                        <span className="font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border/40 text-[10px]">{subject.code}</span>
                                        <span className="text-border/60">•</span>
                                        <span>{subject.units.length} Units</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline">
                                    View Resources
                                </span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all ml-2 shrink-0" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}