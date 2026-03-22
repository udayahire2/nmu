import { UserPlus, BookOpen, CheckCircle2, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Create your account",
    description: "Sign up and verify your email to get access.",
    icon: UserPlus,
  },  
  {
    title: "Set your profile",
    description: "Choose your branch and semester.",
    icon: BookOpen,
  },
  {
    title: "Access resources",
    description: "Browse notes, videos, and past papers.",
    icon: CheckCircle2,
  },
  {
    title: "Learn and improve",
    description: "Study with structured materials and prepare for exams.",
    icon: GraduationCap,
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center ">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-3xl">
          Get started in minutes
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Follow these simple steps to begin your learning journey.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 flex">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Number */}
            <div className="flex h-fit w-fit items-center p-1 justify-center rounded border text-sm font-medium">
              {index + 1}
            </div>

            {/* Content */}
            <div>
              <h3 className="text-sm font-medium">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
