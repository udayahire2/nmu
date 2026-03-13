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
        <section className="container mx-auto py-32 px-4 sm:px-6 lg:px-8 border-t border-border/50">
            <div className="text-center mb-20 space-y-5">
                <h2 className="text-3xl md:text-5xl font-[900] tracking-tight text-foreground text-balance">
                    Start Learning in Minutes
                </h2>
                <p className="text-[15px] md:text-[17px] font-medium text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-balance">
                    Get started instantly and unlock a world of structured educational resources tailored to your syllabus.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12 relative">
                {/* Connecting Line for Desktop */}
                <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[1px] bg-border -z-10" />

                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center md:items-start text-center md:text-left group">
                        <div className="w-14 h-14 rounded-full bg-background border shadow-sm flex items-center justify-center mb-6 shrink-0 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                            <span className="text-[15px] font-[900] text-foreground font-mono">
                                0{index + 1}
                            </span>
                        </div>

                        <h3 className="text-[17px] font-bold text-foreground mb-3 flex items-center gap-2">
                            {step.title}
                        </h3>
                        <p className="text-[14px] font-medium text-muted-foreground/80 leading-relaxed pr-0 md:pr-4">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}