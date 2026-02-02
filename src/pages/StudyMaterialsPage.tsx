import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BranchSemesterSelection } from '@/components/study/BranchSemesterSelection';
import { SubjectGrid } from '@/components/study/SubjectGrid';
import { SubjectDashboard } from '@/components/study/SubjectDashboard';
import { TopicViewer } from '@/components/study/TopicViewer';
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import { getSubjects, getSubject, type Subject } from '@/data/study-data';

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

    const subjects = (branch && semester) ? getSubjects(branch, semester) : [];
    const activeSubject = subjectId ? getSubject(subjectId) : undefined;
    const activeTopic = (activeSubject && topicId)
        ? activeSubject.units.flatMap(u => u.topics).find(t => t.id === topicId)
        : undefined;

    // Breadcrumbs Helper
    const Breadcrumbs = () => (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigate('/resources')}>
                <Home className="h-3.5 w-3.5" />
            </Button>
            {branch && (
                <>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span onClick={() => navigate('/resources')} className="cursor-pointer hover:text-foreground transition-colors shrink-0">
                        {branch}
                    </span>
                </>
            )}
            {branch && semester && (
                <>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span onClick={() => navigate(`/resources/${branch}/${semester}`)} className="cursor-pointer hover:text-foreground transition-colors shrink-0">
                        Sem {semester}
                    </span>
                </>
            )}
            {activeSubject && (
                <>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span onClick={() => navigate(`/resources/${branch}/${semester}/${activeSubject.id}`)} className="cursor-pointer hover:text-foreground transition-colors shrink-0">
                        {activeSubject.code}
                    </span>
                </>
            )}
            {activeTopic && (
                <>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span className="font-medium text-foreground shrink-0">
                        {activeTopic.title.substring(0, 20)}...
                    </span>
                </>
            )}
        </nav>
    );

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="container mx-auto px-4 md:px-6">

                <Breadcrumbs />

                {isRoot && (
                    <BranchSemesterSelection
                        selectedBranch={tempBranch}
                        selectedSemester={null}
                        onBranchSelect={handleBranchSelect}
                        onSemesterSelect={handleSemesterSelect}
                    />
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