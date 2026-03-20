"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex items-center justify-center px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        
        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Academic resources,
          <br className="hidden sm:block" />
          all in one place.
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Access curated study materials, follow your syllabus, and prepare
          smarter with a focused and organized platform.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button>
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost">View syllabus</Button>
        </div>

      </div>
    </section>
  );
}

export default Hero;