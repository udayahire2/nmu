"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
    return (
        <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 bg-background">
            <div className="w-full max-w-4xl flex flex-col items-center gap-6 z-10 text-center">
                {/* Badge */}
                <div className="mb-2">
                    <Badge
                        variant="secondary"
                        className="px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground bg-muted/60 border-0 rounded-md"
                    >
                        Academic Platform · Secure & Verified
                    </Badge>
                </div>

                {/* Main Heading */}
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-[64px] font-[900] tracking-tight text-foreground leading-[1] text-balance">
                        Your Complete Academic Resource Hub
                    </h1>
                    <p className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground leading-snug">
                        Smarter Learning. Organized Curriculum.
                    </p>
                </div>

                {/* Subtitle */}
                <div className="max-w-2xl mt-2">
                    <p className="text-[15px] sm:text-[17px] text-muted-foreground/80 leading-relaxed font-medium text-balance">
                        Access faculty-approved study materials, track your syllabus, and prepare for exams faster. All your branch-specific resources, curated in one centralized platform.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[160px] h-11 rounded-md text-[13px] font-bold uppercase tracking-wide transition-colors duration-200 bg-foreground text-background hover:bg-foreground/90 shadow-none border-0"
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto min-w-[160px] h-11 rounded-md text-[13px] font-bold uppercase tracking-wide transition-colors duration-200 border-border bg-transparent hover:bg-muted text-foreground"
                    >
                        Access Syllabus
                    </Button>
                </div>
            </div>
        </section>
    );
};

export { Hero };
export default Hero;
