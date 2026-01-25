import { Hero } from "@/components/home/Hero"
import { FeatureGrid } from "@/components/home/FeatureGrid"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <FeatureGrid />
        </div>
    )
}
