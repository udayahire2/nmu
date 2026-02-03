import { useState, useRef, useCallback, Suspense, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { SemesterSelection } from "@/components/home/SemesterSelection";
import { SubjectList } from "@/components/home/SubjectList";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SubjectListSkeleton } from "@/components/skeletons/SubjectListSkeleton";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { usePersistentState } from "@/hooks/usePersistentState";

// Error fallback component for SubjectList
function SubjectListError({ semester }: { semester: number }) {
  return (
    <div className="p-8 text-center">
      <p className="text-destructive">
        Failed to load subjects for Semester {semester}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Retry
      </button>
    </div>
  );
}

export default function HomePage() {
  // Use persistent state with SSR-safe hydration
  const [selectedSemester, setSelectedSemester] = usePersistentState<
    number | null
  >("selectedSemester", null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const subjectListRef = useRef<HTMLDivElement>(null);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // SEO: Keep marketing sections mounted but visually hidden when focused
  const isFocusMode = selectedSemester !== null;

  const handleSemesterSelect = useCallback(
    async (semester: number) => {
      setIsTransitioning(true);
      setSelectedSemester(semester);

      // Wait for next tick to ensure DOM update
      requestAnimationFrame(() => {
        subjectListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Focus management for accessibility
        setTimeout(() => {
          subjectListRef.current?.focus();
          setIsTransitioning(false);
        }, 300);
      });
    },
    [setSelectedSemester]
  );

  // Prevent hydration mismatch - render safe defaults during SSR
  if (!isClient) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Hero selectedSemester={null} />
        <SemesterSelection selectedSemester={null} onSelect={() => {}} />
        <StatsSection />
        <FeatureGrid />
        <TestimonialsSection />
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-background text-foreground flex flex-col relative"
      aria-busy={isTransitioning}
    >
      <Hero selectedSemester={selectedSemester} />

      <SemesterSelection
        selectedSemester={selectedSemester}
        onSelect={handleSemesterSelect}
      />

      {/* Subject list with error boundary and suspense */}
      {selectedSemester && (
        <div
          ref={subjectListRef}
          tabIndex={-1}
          id="subject-list"
          className="outline-none scroll-mt-20"
          role="region"
          aria-label={`Semester ${selectedSemester} subjects`}
        >
          <ErrorBoundary
            fallback={<SubjectListError semester={selectedSemester} />}
          >
            <Suspense fallback={<SubjectListSkeleton />}>
              <SubjectList selectedSemester={selectedSemester} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Marketing sections - SEO critical, never unmount */}
      <div
        className={`
          transition-all duration-500 ease-in-out
          ${
            isFocusMode
              ? "opacity-20 pointer-events-none max-h-[200px] overflow-hidden grayscale"
              : "opacity-100"
          }
        `}
        aria-hidden={isFocusMode}
      >
        <StatsSection compact={isFocusMode} />
        <FeatureGrid compact={isFocusMode} />
        <TestimonialsSection compact={isFocusMode} />
      </div>
    </main>
  );
}
