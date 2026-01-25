import { Hero } from "@/components/home/Hero"
import { FeatureGrid } from "@/components/home/FeatureGrid"
import { StatsSection } from "@/components/home/StatsSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Hero />
            <StatsSection />
            <FeatureGrid />
            <TestimonialsSection />
        </div>
    )
}