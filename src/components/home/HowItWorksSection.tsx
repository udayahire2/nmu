import { BookOpen, CheckCircle2, FileText } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    title: "Choose branch",
    description: "Select your branch and semester. See only what matters.",
    icon: BookOpen,
  },
  {
    title: "Open subject",
    description: "Access curated material specifically for your curriculum.",
    icon: FileText,
  },
  {
    title: "Start studying",
    description: "Find notes, lectures, and key points in one unified place.",
    icon: CheckCircle2,
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.p 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            How it works
          </motion.p>
          <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Get started in 3 steps
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            A simple, noise-free flow designed to get you from searching to studying in seconds.
          </motion.p>
        </div>

        {/* STEPS */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid gap-8 md:grid-cols-3 md:gap-12"
        >
          {/* Connector Line (Desktop Only) */}
          <div className="absolute left-[16.6%] top-1/4 hidden h-px w-[66%] border-t-2 border-dashed border-border/60 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="group relative flex flex-col items-center text-center"
              >
                {/* ICON CONTAINER */}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-1 shadow-lg shadow-primary/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-background shadow-inner">
                    <Icon className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                    {index + 1}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 w-full rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-colors group-hover:bg-background/80 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}