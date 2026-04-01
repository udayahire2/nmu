import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const highlights = ["Choose branch", "Open topic fast", "Study on any screen"];

export function Hero() {
  return (
    <section className="py-6 sm:py-8">
      <div className="space-y-6 border-b border-border/70 pb-8">
        <Badge
          variant="outline"
          className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
        >
          Student-first study hub
        </Badge>

        <div className="max-w-4xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Study materials without extra clutter.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Notes, syllabus, and previous papers in one simple flow for NMU students.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/resources">
              Open study materials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/syllabus">Open syllabus</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {highlights.map((item) => (
            <div key={item} className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-muted-foreground">
              {item}
            </div>
          ))}
        </div>

        <div className="max-w-3xl space-y-2">
          {[
            "Choose branch and semester.",
            "Open the subject you want.",
            "Read notes or watch lecture.",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
