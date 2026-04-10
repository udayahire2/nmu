import { BookOpen, CheckCircle2, FileText } from "lucide-react";

const steps = [
  {
    title: "Choose branch",
    description: "Select your branch and semester.",
    icon: BookOpen,
  },
  {
    title: "Open subject",
    description: "Access only relevant material.",
    icon: FileText,
  },
  {
    title: "Start studying",
    description: "Notes, lectures, and key points in one place.",
    icon: CheckCircle2,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-12">
      {/* HEADER */}
      <div className="mb-10 max-w-xl">
        <p className="text-sm font-medium text-muted-foreground">
          How it works
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">
          Get started in 3 steps
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Simple flow designed for faster studying.
        </p>
      </div>

      {/* STEPS */}
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="relative rounded-2xl border bg-background p-6"
            >
              {/* STEP NUMBER */}
              <span className="absolute right-4 top-4 text-xs text-muted-foreground">
                0{index + 1}
              </span>

              {/* ICON */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-4 w-4" />
              </div>

              {/* CONTENT */}
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}