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
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      
      {/* Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to succeed
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          A structured platform with the essential tools to manage your academic journey.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
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
      className="flex flex-col gap-3 rounded-xl p-4 transition-colors hover:bg-muted/40"
    >
      {/* Icon */}
      <feature.icon className="h-5 w-5 text-muted-foreground" />

      {/* Content */}
      <div>
        <h3 className="text-base font-medium">
          {feature.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </Link>
  );
}
