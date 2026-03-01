import { CheckCircle2, UserPlus, BookOpen, GraduationCap } from "lucide-react";

const steps = [
    {
        title: "Create Your Account",
        description: "Sign up quickly and verify your email to get secure access to the platform.",
        icon: UserPlus,
    },
    {
        title: "Set Your Academic Profile",
        description: "Select your engineering branch and current semester to personalize your dashboard.",
        icon: BookOpen,
    },
    {
        title: "Access Verified Resources",
        description: "Browse lecture notes, video tutorials, and past exam papers approved by faculty.",
        icon: CheckCircle2,
    },
    {
        title: "Learn & Excel",
        description: "Prepare effectively with structured materials designed to help you ace your exams.",
        icon: GraduationCap,
    },
];

export function HowItWorksSection() {
    return (
        <section className="container mx-auto py-24 px-4 md:px-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" aria-hidden="true" />

            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                    How It Works
                </h2>
                <p className="text-base md:text-lg font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Get started in minutes and unlock a world of structured educational resources tailored to your syllabus.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Connecting Line for Desktop */}
                <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-border -z-10" />

                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-2xl bg-background border-2 border-border flex items-center justify-center mb-6 shrink-0 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-sm relative z-10">
                            <step.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
                                {index + 1}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
