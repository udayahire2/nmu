import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Subject } from "@/data/study-data";
import { ChevronRight, Bookmark } from "lucide-react";
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
                <div className="bg-muted/10 rounded-2xl p-10 border border-dashed border-border/40">
                    <Bookmark className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" strokeWidth={1} />
                    <h3 className="text-lg font-medium tracking-tight mb-2">No subjects found</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 text-balance">
                        We couldn't find any resources for {branch} Semester {semester} right now. 
                        The curriculum may be under maintenance.
                    </p>
                    <Link to="/resources">
                        <Button variant="outline" className="h-9 px-4 rounded-md text-xs font-semibold">
                            Back to Selection
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 lg:py-12">
            <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">Subjects</h2>
                    <p className="text-sm text-muted-foreground">Select a subject to view its curriculum.</p>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 px-2 py-1 rounded-md border border-border/40">
                    {subjects.length} Total
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                {subjects.map((subject, i) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: Math.min(i * 0.05, 0.3),
                            ease: "easeOut"
                        }}
                    >
                        <Link
                            to={`${subject.id}`}
                            className="group flex flex-col justify-between p-5 h-full rounded-2xl border border-border/40 bg-card hover:bg-accent/20 hover:border-border/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                            aria-label={`View ${subject.name} syllabus`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground shrink-0 border border-border/40 shadow-sm group-hover:text-primary transition-colors">
                                    <Bookmark className="h-4 w-4" strokeWidth={1.5} />
                                </div>
                                <span className="font-mono bg-muted/40 px-2 py-1 rounded-md border border-border/30 text-[11px] font-medium text-muted-foreground/90">
                                    {subject.code}
                                </span>
                            </div>
                            
                            <div className="mt-6 flex-1">
                                <h3 className="text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                    {subject.name}
                                </h3>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                                <div className="text-xs font-medium text-muted-foreground">
                                    {subject.units.length} Units available
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
                                    Explore <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}