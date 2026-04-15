import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Subtle background glow for depth — minimal and dark-theme friendly */}

      <div className="container mx-auto max-w-3xl px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-1 text-sm font-medium"
            >
              NMU Study Hub
            </Badge>
          </motion.div>

          {/* Heading with gradient highlight */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find your exact{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              exam notes in seconds
            </span>
            .
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            No random PDFs. No endless searching. Just clean, structured study
            material for your branch and semester.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
          >
            <Button size="lg" className="rounded-full px-8">
              Start studying
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Browse subjects
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={fadeUp}
            className="pt-6 text-sm text-muted-foreground/70"
          >
            Used by students to quickly access notes, syllabus, and previous
            papers.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}