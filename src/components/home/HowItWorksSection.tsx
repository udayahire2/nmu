import { BookOpen, CheckCircle2, FileText } from "lucide-react";

const steps = [
  {
    title: "Choose branch and semester",
    description: "Start from the correct academic path.",
    icon: BookOpen,
  },
  {
    title: "Open the right subject",
    description: "See only the material you need.",
    icon: FileText,
  },
  {
    title: "Study from one topic page",
    description: "Read notes, lecture, and key points together.",
    icon: CheckCircle2,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-8 sm:py-10">
      <div className="mb-4 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Study flow
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Three simple steps
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Shorter flow, less distraction.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-border/70 bg-background/70 px-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-muted-foreground">0{index + 1}</span>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
