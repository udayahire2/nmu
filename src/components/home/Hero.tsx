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
        <section className="relative flex flex-col items-center justify-center py-16 px-4 md:px-6 overflow-hidden min-h-[40vh] bg-background">
            <div className="w-full max-w-3xl flex flex-col items-center gap-6 z-10">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background"
                >
                    <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
                        NMU Study Resources
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
                        Study NMU Syllabus
                        <br className="hidden sm:block" />
                        <span className="text-muted-foreground">Topic by Topic</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="max-w-2xl px-4"
                >
                    <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed font-medium">
                        Curated notes, videos, and exam resources. <br className="hidden md:block" /> Organized for Computer Engineering.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="w-full max-w-xs sm:max-w-sm pt-6"
                >
                    <Button
                        size="lg"
                        className="w-full h-12 rounded-lg text-base font-semibold transition-all duration-200 border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
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
