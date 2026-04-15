import { Button } from "@/components/ui/button";



export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-28 lg:pb-24">
      {/* Subtle background glow – keeps depth without distraction */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto max-w-3xl px-4 text-center">
        <div
          
          className="space-y-6"
        >
          {/* Badge – matches the "How it works" badge style */}
          <div >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
              NMU Study Hub
            </div>
          </div>

          {/* Heading – period moved outside gradient for cleaner reading */}
          <h1
            
            className="text-3xl font-bold tracking-tight sm:text-5xl md:text-5xl lg:text-6xl"
          >
            Find your exact{" "}
            <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
              exam notes in seconds
            </span>
            .
          </h1>

          {/* Subtext */}
          <p
            
            className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-muted-foreground/90 md:text-xl"
          >
            No random PDFs. No endless searching. Just clean, structured study
            material for your branch and semester.
          </p>

          {/* CTA Buttons */}
          <div
            
            className="flex flex-col justify-center gap-4 pt-2 sm:flex-row"
          >
            <Button size="lg" >
              Start studying
            </Button>
            <Button size="lg" variant="outline" >
              Browse subjects
            </Button>
          </div>

          {/* Trust line */}
          <p
            
            className="pt-4 text-xs text-muted-foreground/50 sm:text-sm"
          >
            Used by students to quickly access notes, syllabus, and previous papers.
          </p>
        </div>
      </div>
    </section>
  );
}