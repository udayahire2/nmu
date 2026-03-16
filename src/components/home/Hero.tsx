"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section 
      className="relative flex flex-col items-center justify-center overflow-hidden bg-background px-4 py-32 sm:px-6 md:py-40"
      aria-label="Introduction"
    >
      <div className="z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <Badge
          variant="secondary"
          className="mb-8 rounded-full border-0 bg-muted/50 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-md transition-colors hover:bg-muted/60"
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          Academic Platform · Secure & Verified
        </Badge>

        {/* Header Group */}
        <div className="space-y-6">
          <h1 className="text-balance text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Your Complete
            <br className="hidden sm:inline" /> Academic Resource Hub.
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">
            Access faculty-approved study materials, track your syllabus, and prepare for exams faster. All your branch-specific resources, curated in one centralized platform.
          </p>
        </div>

        {/* CTA Group */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button
            size="lg"
            className="group h-12 w-full rounded-full bg-foreground px-8 text-base font-semibold text-background transition-all hover:bg-foreground/90 hover:ring-4 hover:ring-foreground/20 sm:w-auto"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-full border-border bg-transparent px-8 text-base font-medium text-foreground transition-all hover:bg-muted sm:w-auto"
          >
            Access Syllabus
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
