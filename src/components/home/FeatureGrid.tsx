import type { ComponentType, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import {
  ArchiveDocumentIcon,
  CollaborationOrbitIcon,
  CurriculumLayersIcon,
  VerifiedStudyIcon,
} from "@/svg/feature-icons";

export type FeatureIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: FeatureIcon;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "verified-materials",
    title: "Study materials by semester",
    description: "Open the right subject quickly without browsing through noise.",
    href: "/resources",
    icon: VerifiedStudyIcon,
  },
  {
    id: "branch-curriculum",
    title: "Simple syllabus search",
    description: "Search by subject or code. Instantly view required modules.",
    href: "/syllabus",
    icon: CurriculumLayersIcon,
  },
  {
    id: "archives",
    title: "Previous paper access",
    description: "Keep revision practical with organized historical papers.",
    href: "/resources",
    icon: ArchiveDocumentIcon,
  },
  {
    id: "collaboration",
    title: "Cleaner student flow",
    description: "Built for speed. Less noise, faster reading, better grades.",
    href: "/resources",
    icon: CollaborationOrbitIcon,
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function FeatureGrid() {
  return (
    <section className="relative py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-50">
        <div className="h-[300px] w-full max-w-4xl rounded-[100%] bg-secondary/20 blur-[120px] filter" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-full bg-secondary/50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-sm"
          >
            Start here
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Use only the pages you need
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            Each section is designed to be concise and scannable, so you can find your exact study material in seconds.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURE_ITEMS.map((feature) => (
            <motion.div key={feature.id} variants={fadeUp} className="group relative h-full">
              {/* Outer Hover Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/30 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
              
              <Link
                to={feature.href}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
              >
                <div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/60 text-primary ring-1 ring-border/50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
