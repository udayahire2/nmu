"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
    return (
        <section className="relative flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 bg-background">
            <div className="w-full max-w-3xl flex flex-col items-center gap-5 z-10 text-center">
                {/* Badge */}
                <div className="mb-4">
                    <Badge
                        variant="outline"
                        className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border-primary/20 rounded-full"
                    >
                        Academic Platform · Secure & Verified
                    </Badge>
                </div>

                {/* Main Heading */}
                <div className="space-y-4 mt-1">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                        Your Complete Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Resource Hub</span>
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-muted-foreground leading-[1.2]">
                        Smarter Learning. Organized Curriculum.
                    </p>
                </div>

                {/* Subtitle */}
                <div className="max-w-2xl mt-4">
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                        Access faculty-approved study materials, track your syllabus, and prepare for exams faster. All your branch-specific resources, curated in one centralized platform.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[160px] h-11 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors duration-200"
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto min-w-[160px] h-11 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors duration-200 border-foreground/20 hover:bg-accent hover:text-accent-foreground"
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
