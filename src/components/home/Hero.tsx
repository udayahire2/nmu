"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
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
        <section className="relative flex flex-col items-center justify-center py-16 px-4 md:px-6 overflow-hidden min-h-[40vh] bg-background">
            <div className="w-full max-w-3xl flex flex-col items-center gap-6 z-10">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50"
                >
                    <Sparkles className="h-3.5 w-3.5 text-foreground/70" />
                    <span className="text-xs font-medium text-foreground/70 tracking-wide">
                        NMU Study Resources
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-center space-y-3"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
                        Study NMU Syllabus,
                        <br className="hidden sm:block" />
                        <span className="text-foreground/80"> Topic by Topic</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="max-w-2xl px-4"
                >
                    <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed text-balance">
                        Notes, videos, and exam-focused resources organized by semester and subject.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="w-full max-w-xs sm:max-w-sm pt-4"
                >
                    <Button
                        size="lg"
                        className="w-full h-12 sm:h-14 rounded-full text-base sm:text-lg font-medium shadow-none hover:bg-primary/90 transition-all duration-200"
                        onClick={scrollToTarget}
                    >
                        {selectedSemester ? `Continue to Semester ${selectedSemester}` : "Select Your Semester"}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export { Hero };
export default Hero;
