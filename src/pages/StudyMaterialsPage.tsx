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
      <div className="space-y-4 border-b border-border/70 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Study materials
          </Badge>
          {branch && <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">{branch}</Badge>}
          {semester && <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">Sem {semester}</Badge>}
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {isRoot
              ? "Open the right material fast"
              : activeTopic
                ? activeTopic.title
                : activeSubject
                  ? activeSubject.name
                  : `Semester ${semester} subjects`}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {isRoot ? "Select branch and semester. Then open subject and topic." : "Short and simple study flow."}
          </p>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-sm text-muted-foreground">
          <Button asChild variant="ghost" size="icon-xs" className="rounded-full">
            <Link to="/resources" aria-label="Go to study materials home">
              <Home className="h-3.5 w-3.5" />
            </Link>
          </Button>
          {branch && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <Button variant="ghost" size="sm" className="h-7 rounded-full px-2" onClick={() => navigate("/resources")}>
                {branch}
              </Button>
            </>
          )}
          {branch && semester && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <Button
                variant="ghost"
                size="sm"
                className="h-7 rounded-full px-2"
                onClick={() => navigate(`/resources/${branch}/${semester}`)}
              >
                Sem {semester}
              </Button>
            </>
          )}
          {activeSubject && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="rounded-full bg-secondary px-3 py-1 text-foreground">{activeSubject.code}</span>
            </>
          )}
        </nav>
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
