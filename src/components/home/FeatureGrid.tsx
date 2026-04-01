import type { ComponentType, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    description: "Open the right subject quickly.",
    href: "/resources",
    icon: VerifiedStudyIcon,
  },
  {
    id: "branch-curriculum",
    title: "Simple syllabus search",
    description: "Search by subject or code.",
    href: "/syllabus",
    icon: CurriculumLayersIcon,
  },
  {
    id: "archives",
    title: "Previous paper access",
    description: "Keep revision practical.",
    href: "/resources",
    icon: ArchiveDocumentIcon,
  },
  {
    id: "collaboration",
    title: "Cleaner student flow",
    description: "Less noise, faster reading.",
    href: "/resources",
    icon: CollaborationOrbitIcon,
  },
];

export function FeatureGrid() {
  return (
    <section className="py-8 sm:py-10">
      <div className="mb-4 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Start here
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Use only the pages you need
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Each section is kept short so students can scan quickly.
        </p>
      </div>

      <div className="divide-y divide-border/70 rounded-2xl border border-border/70 bg-background/70">
        {FEATURE_ITEMS.map((feature) => (
          <Link
            key={feature.id}
            to={feature.href}
            className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-secondary/30 sm:px-5"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <feature.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </section>
  );
}
