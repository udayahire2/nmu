import { ArrowRight, CheckCircle2, FileText, BookOpen, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const features = [
  { name: "Notes", icon: FileText },
  { name: "Syllabus", icon: BookOpen },
  { name: "Previous Papers", icon: FileQuestion },
];

const steps = [
  "Select your branch & semester",
  "Choose subject",
  "Start learning instantly",
];

export function Hero() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Minimal badge */}
            <div className="inline-block rounded-md border border-border/50 px-3 py-1 text-sm text-muted-foreground">
              NMU Study Hub
            </div>

            {/* Headline – clean, no gradient */}
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-5xl">
                Stop searching.
                <br />
                Start studying.
              </h1>
              <p className="max-w-md text-base text-muted-foreground">
                Notes, syllabus, and previous papers — all organized by branch and semester.
              </p>
            </div>

            {/* CTA Buttons – minimal outline style */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="default" className="rounded-md px-4">
                <Link to="/resources">
                  Explore resources
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="default" className="rounded-md px-5">
                <Link to="/syllabus">View syllabus</Link>
              </Button>
            </div>

            {/* Feature chips – simple border, no background */}
            <div className="flex flex-wrap gap-2">
              {features.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-1.5 text-sm text-foreground/80"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {name}
                </div>
              ))}
            </div>

            {/* Steps list – minimal card */}
            <div className="space-y-3 rounded-lg border border-border/40 p-5">
              {steps.map((step) => (
                <div key={step} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL – Notion‑style resource preview */}
          <div className="hidden lg:block">
            <div className="rounded-lg border border-border/40 p-1">
              <div className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Computer Engineering
                  </span>
                  <span className="rounded border border-border/40 px-2 py-0.5 text-xs text-muted-foreground">
                    Semester 4
                  </span>
                </div>

                {/* Subject items */}
                <div className="space-y-2">
                  {["Data Structures", "DBMS", "Computer Networks"].map((subject, idx) => (
                    <div
                      key={subject}
                      className="flex items-center gap-3 rounded-md border border-border/30 p-3 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded border border-border/30 text-xs font-medium text-muted-foreground">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-normal">{subject}</p>
                        <p className="text-xs text-muted-foreground">4 modules • 12 resources</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Button variant="ghost" size="sm" className="h-auto px-0 text-xs font-normal">
                    View all subjects →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}