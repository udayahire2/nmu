import { useState } from "react"
import { Hero } from "@/components/home/Hero"
import { SemesterSelection } from "@/components/home/SemesterSelection"
import { SubjectList } from "@/components/home/SubjectList"
import { FeatureGrid } from "@/components/home/FeatureGrid"
import { StatsSection } from "@/components/home/StatsSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function HomePage() {
    // Lazy initialization to prevent hydration mismatch/flash and ensure instant state
    const [selectedSemester, setSelectedSemester] = useState<number | null>(() => {
        const saved = localStorage.getItem('selectedSemester');
        return saved ? parseInt(saved, 10) : null;
    });

    const handleSemesterSelect = (semester: number) => {
        setSelectedSemester(semester);
        localStorage.setItem('selectedSemester', semester.toString());

        // Use setTimeout to allow the component to mount before scrolling
        setTimeout(() => {
            const subjectList = document.querySelector('#subject-list');
            if (subjectList) {
                subjectList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col gap-0 relative">
            {/* 
              QA Note: 'overflow-x-hidden' removed from here. 
              Ideally this should be on 'body' to prevent scrollbar shifts.
              If horizontal scroll appears, check Marquee or Hero animations.
            */}
            <Hero selectedSemester={selectedSemester} />
            <SemesterSelection
                selectedSemester={selectedSemester}
                onSelect={handleSemesterSelect}
            />

            {selectedSemester && <SubjectList selectedSemester={selectedSemester} />}

            {/* 
                UX Improvement: "Focus Mode"
                If a student has selected a semester (is in "Task Mode"), hide the general marketing 
                sections to reduce noise and keep them focused on their study materials.
            */}
            {!selectedSemester && (
                <>
                    <StatsSection />
                    <FeatureGrid />
                    <TestimonialsSection />
                </>
            )}
        </main>
    )
}