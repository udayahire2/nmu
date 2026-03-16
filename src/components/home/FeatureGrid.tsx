import type { ComponentType, SVGProps } from "react";
import Link from "fumadocs-core/link";

import {
  ArchiveDocumentIcon,
  ArrowUpRightIcon,
  CollaborationOrbitIcon,
  CurriculumLayersIcon,
  VerifiedStudyIcon,
} from "@/svg/feature-icons";

export type FeatureIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: FeatureIcon;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "verified-materials",
    title: "Verified Study Materials",
    description: "Access high-quality lecture notes and video tutorials, carefully reviewed and approved by faculty members.",
    href: "/materials",
    icon: VerifiedStudyIcon,
  },
  {
    id: "branch-curriculum",
    title: "Branch-Specific Curriculum",
    description: "Personalized syllabus tracking tailored exactly to your academic year and engineering branch.",
    href: "/curriculum",
    icon: CurriculumLayersIcon,
  },
  {
    id: "archives",
    title: "Previous Year Archives",
    description: "Comprehensive repository of organized exam papers and PYQs to supercharge your test preparation.",
    href: "/archives",
    icon: ArchiveDocumentIcon,
  },
  {
    id: "collaboration",
    title: "Seamless Collaboration",
    description: "A centralized, moderated ecosystem connecting students, faculty, and administrators for better learning.",
    href: "/collaboration",
    icon: CollaborationOrbitIcon,
  },
];

interface FeatureGridProps {
  compact?: boolean;
}

export function FeatureGrid({ compact = false }: FeatureGridProps) {
  if (compact) {
    return <CompactFeatureList />;
  }
  return <StandardFeatureGrid />;
}

function CompactFeatureList() {
  return (
    <section
      className="container mx-auto px-4 py-4"
      aria-label="Key Platform Features"
    >
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {FEATURE_ITEMS.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition-colors hover:text-foreground"
          >
            <feature.icon
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
            />
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StandardFeatureGrid() {
  return (
    <section
      className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 xl:py-32"
      aria-labelledby="features-heading"
    >
      {/* Header Group */}
      <div className="mx-auto mb-20 max-w-3xl space-y-6 text-center md:mb-24">
        <h2
          id="features-heading"
          className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Everything You Need to Succeed
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
          Our platform provides a structured, moderated environment packed with the essential tools required to master your academic curriculum.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-y-20">
        {FEATURE_ITEMS.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <Link
      href={feature.href}
      className="group relative flex flex-col gap-5 rounded-3xl p-6 -m-6 transition-all duration-500 ease-out hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {/* Icon Container */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground/5 text-foreground transition-all duration-500 ease-out group-hover:bg-foreground group-hover:text-background group-hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)] dark:group-hover:shadow-[0_4px_20px_rgb(255,255,255,0.05)]">
        <feature.icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          {feature.title}
          <ArrowUpRightIcon
            className="h-4 w-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-foreground group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="text-pretty text-sm font-medium leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </Link>
  );
}
