import { BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Subject } from "@/data/study-data";

interface SubjectGridProps {
  subjects: Subject[];
  branch: string;
  semester: string;
}

export function SubjectGrid({ subjects, branch, semester }: SubjectGridProps) {
  if (subjects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/70 bg-background/70 p-10 text-center">
        <BookOpen className="h-10 w-10 text-muted-foreground/40" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">No subjects available yet</h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            We could not find study material for {branch} semester {semester} right now.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/resources">Back to selection</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/70">
        <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Pick a subject</h2>
            <p className="text-sm text-muted-foreground">
              {branch} semester {semester} with {subjects.length} subjects.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/resources">Change</Link>
          </Button>
        </div>

        <div className="divide-y divide-border/70">
          {subjects.map((subject) => {
            const topicCount = subject.units.reduce((count, unit) => count + unit.topics.length, 0);

            return (
              <Link
                key={subject.id}
                to={`${subject.id}`}
                className="group flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-secondary/30 sm:px-5"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-sm font-semibold text-foreground">{subject.name}</h2>
                      <Badge variant="outline" className="rounded-full font-mono text-[10px]">
                        {subject.code}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {subject.units.length} units | {topicCount} topics
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
