import { Hero } from "@/components/home/Hero"
import { FeatureGrid } from "@/components/home/FeatureGrid"
import { StatsSection } from "@/components/home/StatsSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col gap-0 relative">
            {/* 
              QA Note: 'overflow-x-hidden' removed from here. 
              Ideally this should be on 'body' to prevent scrollbar shifts.
              If horizontal scroll appears, check Marquee or Hero animations.
            */}
            <Hero />
            <StatsSection />
            <FeatureGrid />
            <TestimonialsSection />
        </main>
    )
}