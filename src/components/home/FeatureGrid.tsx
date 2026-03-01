import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="flex gap-6 justify-center">
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
      className="container mx-auto py-20 px-4 md:px-6"
      aria-labelledby="features-heading"
    >
      <div className="text-center mb-16 space-y-4">
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
        >
          Everything You Need to Succeed
        </h2>
        <p className="text-base md:text-lg font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Our platform provides a structured, moderated environment packed with the essential tools required to master your academic curriculum.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group h-full"
          >
            <Card className="h-full border-border bg-card hover:bg-accent/50 hover:border-border transition-all duration-200 rounded-lg">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mb-4 border border-border group-hover:text-primary group-hover:border-primary/40 transition-colors">
                  <svg
                    className="h-5 w-5 opacity-70"
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
                <CardTitle className="flex items-center justify-between text-lg font-bold tracking-tight">
                  {feature.title}
                  <ArrowUpRight
                    className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity text-foreground"
                    aria-hidden="true"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm font-medium leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
