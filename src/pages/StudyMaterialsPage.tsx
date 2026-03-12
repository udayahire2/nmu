import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BranchSemesterSelection } from '@/components/study/BranchSemesterSelection';
import { SubjectGrid } from '@/components/study/SubjectGrid';
import { SubjectDashboard } from '@/components/study/SubjectDashboard';
import { TopicViewer } from '@/components/study/TopicViewer';
import { ChevronRight, Home } from "lucide-react";
import { getSubjects, getSubject } from '@/data/study-data';
import { cn } from "@/lib/utils";

export default function StudyMaterialsPage() {
    const { branch, semester, subjectId, topicId } = useParams();
    const navigate = useNavigate();

    // Local state for the two-step selection process at root
    const [tempBranch, setTempBranch] = useState<string | null>(null);

    // HANDLERS
    const handleBranchSelect = (b: string) => {
        setTempBranch(b);
    };

    const handleSemesterSelect = (sem: string) => {
        if (tempBranch) {
            navigate(`/resources/${tempBranch}/${sem}`);
        }
    };

    // Derived State from URL
    const isRoot = !branch || !semester;
    const isSubjectList = branch && semester && !subjectId;
    const isSubjectDashboard = subjectId && !topicId;
    const isTopicView = !!topicId;

    const subjects = useMemo(() => {
        if (branch && semester) return getSubjects(branch, semester);
        return [];
    }, [branch, semester]);

    const activeSubject = useMemo(() => {
        if (subjectId) return getSubject(subjectId);
        return undefined;
    }, [subjectId]);

    const activeTopic = useMemo(() => {
        if (activeSubject && topicId) {
            return activeSubject.units.flatMap(u => u.topics).find(t => t.id === topicId);
        }
        return undefined;
    }, [activeSubject, topicId]);

    // Breadcrumbs Helper
    const Breadcrumbs = () => (
        <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground/80 font-medium mb-12 overflow-x-auto whitespace-nowrap pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full max-w-4xl mx-auto">
            <button 
                onClick={() => navigate('/resources')}
                className="hover:text-foreground transition-colors flex items-center justify-center h-6 w-6 rounded-md hover:bg-muted/50"
                aria-label="Home"
            >
                <Home className="h-3.5 w-3.5" />
            </button>
            {branch && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40 mx-0.5" strokeWidth={2} />
                    <button 
                        onClick={() => navigate('/resources')} 
                        className="hover:text-foreground transition-colors shrink-0 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {branch}
                    </button>
                </>
            )}
            {branch && semester && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40 mx-0.5" strokeWidth={2} />
                    <button 
                        onClick={() => navigate(`/resources/${branch}/${semester}`)} 
                        className="hover:text-foreground transition-colors shrink-0 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        Semester {semester}
                    </button>
                </>
            )}
            {activeSubject && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40 mx-0.5" strokeWidth={2} />
                    <button 
                        onClick={() => navigate(`/resources/${branch}/${semester}/${activeSubject.id}`)} 
                        className="hover:text-foreground transition-colors shrink-0 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {activeSubject.code}
                    </button>
                </>
            )}
            {activeTopic && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40 mx-0.5" strokeWidth={2} />
                    <span className="text-foreground shrink-0 select-none">
                        {activeTopic.title.length > 28 ? activeTopic.title.substring(0, 28) + '...' : activeTopic.title}
                    </span>
                </>
            )}
        </nav>
    );

    return (
        <div className="min-h-screen bg-background pt-24 pb-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hide breadcrumbs on root since the UI speaks for itself */}
                {!isRoot && <Breadcrumbs />}

                {isRoot && (
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Page hero */}
                        <div className="space-y-5 text-center flex flex-col items-center">
                            <span className="inline-flex items-center rounded-full border border-border/50 bg-muted/20 px-3 py-1 text-xs font-semibold tracking-wide text-foreground/80 backdrop-blur-sm shadow-sm ring-1 ring-inset ring-border/10">
                                Engineering Content
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1] text-balance">
                                All your study materials
                                <span className={cn(
                                    "block mt-1 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent"
                                )}>
                                    in one place.
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mt-2 text-balance font-medium">
                                Navigate your curriculum instantly. Faculty-approved notes, video tutorials, and past year papers structured for speed.
                            </p>
                        </div>

                        <div className="w-full h-px bg-border/40" />

                        <BranchSemesterSelection
                            selectedBranch={tempBranch}
                            selectedSemester={null}
                            onBranchSelect={handleBranchSelect}
                            onSemesterSelect={handleSemesterSelect}
                        />
                    </div>
                )}

                {isSubjectList && (
                    <SubjectGrid
                        subjects={subjects}
                        branch={branch!}
                        semester={semester!}
                    />
                )}

                {isSubjectDashboard && activeSubject && (
                    <SubjectDashboard subject={activeSubject} />
                )}

                {isTopicView && activeTopic && (
                    <TopicViewer topic={activeTopic} />
                )}
            </div>
        </div>
    );
}