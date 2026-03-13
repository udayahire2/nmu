import { ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Verified Study Materials",
    description: "Access high-quality lecture notes and video tutorials, carefully reviewed and approved by faculty members.",
    path: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  },
  {
    title: "Branch-Specific Curriculum",
    description: "Personalized syllabus tracking tailored exactly to your academic year and engineering branch.",
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    title: "Previous Year Archives",
    description: "Comprehensive repository of organized exam papers and PYQs to supercharge your test preparation.",
    path: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z M14 2v6h6",
  },
  {
    title: "Seamless Collaboration",
    description: "A centralized, moderated ecosystem connecting students, faculty, and administrators for better learning.",
    path: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  },
];

interface FeatureGridProps {
  compact?: boolean;
}

export function FeatureGrid({ compact = false }: FeatureGridProps) {
  if (compact) {
    return (
      <section className="container mx-auto py-2 px-4">
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              <svg
                className="h-3.5 w-3.5 opacity-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={feature.path} />
              </svg>
              <span>{feature.title}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="container mx-auto py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div className="text-center mb-20 space-y-5">
        <h2
          id="features-heading"
          className="text-3xl md:text-5xl font-[900] tracking-tight text-foreground text-balance"
        >
          Everything You Need to Succeed
        </h2>
        <p className="text-[15px] md:text-[17px] font-medium text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-balance">
          Our platform provides a structured, moderated environment packed with the essential tools required to master your academic curriculum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col text-left space-y-4 rounded-xl p-6 -m-6 hover:bg-muted/30 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={feature.path} />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center justify-between">
                {feature.title}
                <ArrowUpRight
                  className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground"
                  aria-hidden="true"
                />
              </h3>
              <p className="text-[14px] font-medium leading-relaxed text-muted-foreground/80">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
