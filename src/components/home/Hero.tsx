"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

interface HeroProps {
    selectedSemester?: number | null;
}

const Hero = ({ selectedSemester }: HeroProps) => {
    const scrollToTarget = () => {
        const targetId = selectedSemester ? '#subject-list' : '#semester-selection';
        const section = document.querySelector(targetId);
        if (section) {
            const offset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="relative flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 bg-background">
            <div className="w-full max-w-3xl flex flex-col items-center gap-5 z-10 text-center">
                {/* Badge */}
                <div>
                    <Badge
                        variant="outline"
                        className="px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground bg-secondary border-border rounded-full"
                    >
                        SASS · Study Material
                    </Badge>
                </div>

                {/* Main Heading */}
                <div className="space-y-2 mt-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                        Study NMU Syllabus
                    </h1>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-muted-foreground leading-[1.15]">
                        Effectively &amp; Minimalist
                    </p>
                </div>

                {/* Subtitle */}
                <div className="max-w-xl mt-1">
                    <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed">
                        Focused notes, hand-picked videos, and organized exam
                        papers — designed for modern learning.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px] h-11 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors duration-200"
                        onClick={scrollToTarget}
                    >
                        {selectedSemester
                            ? `Continue Sem ${selectedSemester}`
                            : "Start Studying"}
                        <ArrowDown className="ml-1.5 size-3.5 opacity-70" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export { Hero };
export default Hero;
