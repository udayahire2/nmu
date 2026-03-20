import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Subject } from "@/data/study-data";
import { ChevronRight, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubjectGridProps {
    subjects: Subject[];
    branch: string;
    semester: string;
}

export function SubjectGrid({ subjects, branch, semester }: SubjectGridProps) {
    if (subjects.length === 0) {
        return (
            <div className="mx-auto max-w-5xl py-12 text-center">
                <div className="rounded-3xl border border-dashed border-border/40 bg-card/60 p-10 shadow-sm">
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
        <div className="mx-auto max-w-5xl py-8 lg:py-12">
            <Card className="mb-8 border-border/50 bg-card/60 shadow-none">
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl tracking-tight">Subjects</CardTitle>
                        <p className="text-sm text-muted-foreground">Select a subject to view its curriculum.</p>
                    </div>
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {subjects.length} Total
                    </Badge>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
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
                            className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                            aria-label={`View ${subject.name} syllabus`}
                        >
                            <Card className="h-full rounded-2xl border-border/40 bg-card transition-all duration-300 hover:border-border/80 hover:bg-accent/10 hover:shadow-sm">
                                <CardContent className="flex h-full flex-col justify-between p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background text-muted-foreground shadow-sm transition-colors group-hover:text-primary">
                                            <Bookmark className="h-4 w-4" strokeWidth={1.5} />
                                        </div>
                                        <span className="rounded-md border border-border/30 bg-muted/40 px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground/90">
                                            {subject.code}
                                        </span>
                                    </div>

                                    <div className="mt-6 flex-1">
                                        <h3 className="line-clamp-2 text-[17px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                                            {subject.name}
                                        </h3>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4">
                                        <div className="text-xs font-medium text-muted-foreground">
                                            {subject.units.length} Units available
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/80 transition-colors group-hover:text-primary">
                                            Explore <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
