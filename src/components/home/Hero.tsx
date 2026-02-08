"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
    selectedSemester?: number | null;
}

const Hero = ({ selectedSemester }: HeroProps) => {
    const scrollToTarget = () => {
        const targetId = selectedSemester ? '#subject-list' : '#semester-selection';
        const section = document.querySelector(targetId);
        if (section) {
            const offset = 80; // Offset for sticky header
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative flex flex-col items-center justify-center pt-20 pb-16 px-4 md:px-6 bg-background">
            <div className="w-full max-w-4xl flex flex-col items-center gap-6 z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border border-border bg-muted/30"
                >
                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase px-1">
                        SASS • Study Material
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Study NMU Syllabus
                        <br className="hidden sm:block" />
                        <span className="text-muted-foreground/60">Effectively & Minimalist</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="max-w-2xl"
                >
                    <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed font-medium">
                        Focused notes, hand-picked videos, and organized exam papers <br className="hidden md:block" /> designed for modern learning.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="w-full max-w-[280px] pt-4"
                >
                    <Button
                        size="lg"
                        className="w-full h-11 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-200"
                        onClick={scrollToTarget}
                    >
                        {selectedSemester ? `Continue Sem ${selectedSemester}` : "Start Studying"}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export { Hero };
export default Hero;
