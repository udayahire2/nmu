import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BranchSemesterSelection } from "@/components/study/BranchSemesterSelection";
import { SubjectDashboard } from "@/components/study/SubjectDashboard";
import { SubjectGrid } from "@/components/study/SubjectGrid";
import { TopicViewer } from "@/components/study/TopicViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSubject, getSubjects } from "@/data/study-data";

export default function StudyMaterialsPage() {
  const { branch, semester, subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const [tempBranch, setTempBranch] = useState<string | null>(null);

  const handleBranchSelect = (selectedBranch: string) => {
    setTempBranch(selectedBranch);
  };

  const handleSemesterSelect = (selectedSemester: string) => {
    if (tempBranch) {
      navigate(`/resources/${tempBranch}/${selectedSemester}`);
    }
  };

  const isRoot = !branch || !semester;
  const isSubjectList = branch && semester && !subjectId;
  const isSubjectDashboard = subjectId && !topicId;
  const isTopicView = !!topicId;

  const subjects = branch && semester ? getSubjects(branch, semester) : [];
  const activeSubject = subjectId ? getSubject(subjectId) : undefined;
  const activeTopic =
    activeSubject && topicId
      ? activeSubject.units.flatMap((unit) => unit.topics).find((topic) => topic.id === topicId)
      : undefined;

  return (
    <div className="space-y-6 pb-14 pt-6 sm:space-y-8 sm:pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-background to-secondary/10 px-6 py-8 sm:p-10">
        {/* Background Decorative Blob */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Study Station
            </span>
            {branch && <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs font-medium shadow-sm transition-transform hover:scale-105">{branch}</Badge>}
            {semester && <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs font-medium shadow-sm transition-transform hover:scale-105">Sem {semester}</Badge>}
            {activeSubject && <Badge className="rounded-full px-4 py-1 text-xs font-medium bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105">{activeSubject.code}</Badge>}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {isRoot
                ? "Find Your Materials."
                : activeTopic
                  ? activeTopic.title
                  : activeSubject
                    ? activeSubject.name
                    : `Semester ${semester} Subjects`}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {isRoot ? "Start by selecting your branch and semester. Your customized study material is just a click away." : "Streamlined and organized to save you time. Dive into your resources below."}
            </p>
          </div>

          {/* Premium Breadcrumbs */}
          <nav className="mt-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap rounded-2xl border border-border/50 bg-background/80 p-2 shadow-sm backdrop-blur-md">
            <Link 
              to="/resources" 
              aria-label="Go to study materials home" 
              className="inline-flex h-8 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            {branch && (
              <>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <Button variant="ghost" size="sm" className="h-8 rounded-xl px-3 font-medium text-foreground hover:bg-secondary/60" onClick={() => navigate("/resources")}>
                  {branch}
                </Button>
              </>
            )}
            {branch && semester && (
              <>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-xl px-3 font-medium text-foreground hover:bg-secondary/60"
                  onClick={() => navigate(`/resources/${branch}/${semester}`)}
                >
                  Sem {semester}
                </Button>
              </>
            )}
            {activeSubject && (
              <>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <span className="inline-flex h-8 items-center rounded-xl bg-primary/10 px-4 text-sm font-semibold text-primary">
                  {activeSubject.code}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {isRoot && (
        <BranchSemesterSelection
          selectedBranch={tempBranch}
          selectedSemester={null}
          onBranchSelect={handleBranchSelect}
          onSemesterSelect={handleSemesterSelect}
        />
      )}

      {isSubjectList && <SubjectGrid subjects={subjects} branch={branch!} semester={semester!} />}

      {isSubjectDashboard && activeSubject && <SubjectDashboard subject={activeSubject} />}

      {isTopicView && activeTopic && <TopicViewer topic={activeTopic} />}
    </div>
  );
}
