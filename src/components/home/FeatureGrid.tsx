import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  ArchiveDocumentIcon,
  CollaborationOrbitIcon,
  CurriculumLayersIcon,
  VerifiedStudyIcon,
} from "@/svg/feature-icons";
import { cn } from "@/lib/utils";

import studyMaterialsImg from "@/assets/images/Question paper.png";
import searchSyllabusImg from "@/assets/images/search Syllabus.png";
import previousPaperImg from "@/assets/images/previous year question paper.png";
import cleanerFlowImg from "@/assets/images/clearner student flow.png";

export type FeatureIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: FeatureIcon;
  image: string;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "verified-materials",
    title: "Study materials by semester",
    description: "Open the right subject quickly without browsing through noise.",
    href: "/resources",
    icon: VerifiedStudyIcon,
    image: studyMaterialsImg,
  },
  {
    id: "branch-curriculum",
    title: "Simple syllabus search",
    description: "Search by subject or code. Instantly view required modules.",
    href: "/syllabus",
    icon: CurriculumLayersIcon,
    image: searchSyllabusImg,
  },
  {
    id: "archives",
    title: "Previous paper access",
    description: "Keep revision practical with organized historical papers.",
    href: "/resources",
    icon: ArchiveDocumentIcon,
    image: previousPaperImg,
  },
  {
    id: "collaboration",
    title: "Cleaner student flow",
    description: "Built for speed. Less noise, faster reading, better grades.",
    href: "/resources",
    icon: CollaborationOrbitIcon,
    image: cleanerFlowImg,
  },
];

// Bento Layout mapping for 4 items in a 3-column grid
const bentoStyles = [
  "lg:col-span-1", // top left (small)
  "lg:col-span-2", // top right (wide)
  "lg:col-span-2", // bottom left (wide)
  "lg:col-span-1", // bottom right (small)
];

export function FeatureGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">

        {/* Header */}
        <div className="mb-14 max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3 px-3 py-1 bg-primary/10 w-fit mx-auto rounded-full">
            Start fast
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl mb-4">
            Find your study material <br className="hidden sm:block" /> in seconds
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Skip the clutter. Access syllabus, notes, and papers instantly.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURE_ITEMS.map((feature, index) => {
            return (
              <Link
                key={feature.id}
                to={feature.href}
                className={cn(
                  "group relative flex flex-col justify-between bg-card/20 backdrop-blur-sm border border-border/80 rounded-[28px] p-6 lg:p-8 transition-all hover:bg-card/40 overflow-hidden min-h-[380px] shadow-sm hover:shadow-xl hover:border-border",
                  bentoStyles[index]
                )}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-card/10 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/50 to-transparent z-10" />
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity filter blur-[2px] group-hover:blur-none group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-card/30 z-10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="flex flex-col h-full relative z-20">
                  {/* Icon Notion Style */}
                  <div className="mb-auto">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-border/50 bg-background/90 backdrop-blur-md shadow-sm text-foreground group-hover:scale-110 transition-transform duration-500 ease-out">
                      <feature.icon className="h-6 w-6 opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8 relative mt-auto">
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[85%] font-medium opacity-90">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Top Right Action Arrow */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-out z-20">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border shadow-md backdrop-blur-md">
                    <ArrowUpRight className="h-5 w-5 text-foreground" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}