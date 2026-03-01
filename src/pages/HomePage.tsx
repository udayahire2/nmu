import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch - render safe defaults during SSR
  if (!isClient) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <FeatureGrid />
        <HowItWorksSection />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative">
      <Hero />
      {/* Marketing sections - SEO critical, never unmount */}
      <FeatureGrid />
      <HowItWorksSection />
    </main>
  );
}
