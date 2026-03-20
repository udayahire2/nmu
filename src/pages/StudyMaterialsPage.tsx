import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BranchSemesterSelection } from '@/components/study/BranchSemesterSelection';
import { SubjectGrid } from '@/components/study/SubjectGrid';
import { SubjectDashboard } from '@/components/study/SubjectDashboard';
import { TopicViewer } from '@/components/study/TopicViewer';
import { BookOpen, ChevronRight, Home, Layers3 } from "lucide-react";
import { getSubjects, getSubject, type Subject, type Topic } from '@/data/study-data';
import { cn } from "@/lib/utils";

interface StudyMaterialsBreadcrumbsProps {
    branch?: string;
    semester?: string;
    activeSubject?: Subject;
    activeTopic?: Topic;
    onNavigate: (path: string) => void;
}

function StudyMaterialsBreadcrumbs({
    branch,
    semester,
    activeSubject,
    activeTopic,
    onNavigate,
}: StudyMaterialsBreadcrumbsProps) {
    return (
        <nav className="mx-auto flex w-full max-w-5xl items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-2xl border border-border/50 bg-card/70 px-3 py-2 text-[13px] font-medium text-muted-foreground/80 shadow-sm backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
                onClick={() => onNavigate('/resources')}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Study materials home"
            >
                <Home className="h-3.5 w-3.5" />
            </button>

            {branch && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" strokeWidth={2} />
                    <button
                        onClick={() => onNavigate('/resources')}
                        className="rounded-md px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {branch}
                    </button>
                </>
            )}

            {branch && semester && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" strokeWidth={2} />
                    <button
                        onClick={() => onNavigate(`/resources/${branch}/${semester}`)}
                        className="rounded-md px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        Semester {semester}
                    </button>
                </>
            )}

            {activeSubject && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" strokeWidth={2} />
                    <button
                        onClick={() => onNavigate(`/resources/${branch}/${semester}/${activeSubject.id}`)}
                        className="rounded-md px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {activeSubject.code}
                    </button>
                </>
            )}

            {activeTopic && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" strokeWidth={2} />
                    <span className="shrink-0 rounded-md bg-muted/50 px-2 py-1 text-foreground">
                        {activeTopic.title.length > 28 ? `${activeTopic.title.substring(0, 28)}...` : activeTopic.title}
                    </span>
                </>
            )}
        </nav>
    );
}

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

    return (
        <div className="min-h-screen bg-background pb-32 pt-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Hide breadcrumbs on root since the UI speaks for itself */}
                {!isRoot && (
                    <div className="mb-10">
                        <StudyMaterialsBreadcrumbs
                            branch={branch}
                            semester={semester}
                            activeSubject={activeSubject}
                            activeTopic={activeTopic}
                            onNavigate={navigate}
                        />
                    </div>
                )}

                {isRoot && (
                    <div className="mx-auto max-w-5xl space-y-10">
                        <Card className="overflow-hidden border-border/50 bg-card/80 shadow-sm backdrop-blur-sm">
                            <CardHeader className="space-y-5 pb-6">
                                <Badge
                                    variant="outline"
                                    className="w-fit rounded-full border-border/60 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                                >
                                    Engineering Content
                                </Badge>

                                <div className="space-y-4">
                                    <CardTitle className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                        All your study materials
                                        <span className={cn(
                                            "mt-1 block bg-gradient-to-br from-foreground to-foreground/55 bg-clip-text text-transparent"
                                        )}>
                                            in one place.
                                        </span>
                                    </CardTitle>

                                    <CardDescription className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                                        Navigate your curriculum instantly. Faculty-approved notes, video tutorials, and past year papers structured for speed.
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                                        <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                                            <BookOpen className="size-4" />
                                        </div>
                                        <p className="text-sm font-medium text-foreground">Structured by branch</p>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">Jump directly into your department-specific resources.</p>
                                    </div>

                                    <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                                        <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                                            <Layers3 className="size-4" />
                                        </div>
                                        <p className="text-sm font-medium text-foreground">Unit-wise flow</p>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">Open subjects, browse units and study topic by topic.</p>
                                    </div>

                                    <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                                        <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                                            <ChevronRight className="size-4" />
                                        </div>
                                        <p className="text-sm font-medium text-foreground">Exam-ready access</p>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">Move quickly from overview to notes, videos and archives.</p>
                                    </div>
                                </div>

                                <Separator className="bg-border/50" />

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="text-sm text-muted-foreground">
                                        Start by choosing your branch and semester.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-border/60"
                                        onClick={() => {
                                            setTempBranch(null);
                                            navigate('/resources');
                                        }}
                                    >
                                        Reset Selection
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="rounded-3xl border border-border/50 bg-card/50 p-1 shadow-sm backdrop-blur-sm">
                            <BranchSemesterSelection
                                selectedBranch={tempBranch}
                                selectedSemester={null}
                                onBranchSelect={handleBranchSelect}
                                onSemesterSelect={handleSemesterSelect}
                            />
                        </div>
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
