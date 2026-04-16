import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BranchSemesterSelection } from "@/components/study/BranchSemesterSelection";
import { SubjectDashboard } from "@/components/study/SubjectDashboard";
import { SubjectGrid } from "@/components/study/SubjectGrid";
import { TopicViewer } from "@/components/study/TopicViewer";
import { Badge } from "@/components/ui/badge";
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
    <div className="mx-auto w-full max-w-[1080px] space-y-10 px-4 py-8 sm:px-6 md:py-12">
      
      {/* Minimalistic Header Section */}
      <div className="flex flex-col gap-5">
        
        {/* Notion-style Clean Breadcrumbs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[13px] font-medium text-muted-foreground pb-1">
          <Link 
            to="/resources" 
            className="flex items-center gap-1.5 rounded-[6px] px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5 opacity-80" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          {branch && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
              <button 
                onClick={() => navigate("/resources")}
                className="rounded-[6px] px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {branch}
              </button>
            </>
          )}
          
          {branch && semester && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
              <button
                onClick={() => navigate(`/resources/${branch}/${semester}`)}
                className="rounded-[6px] px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                Sem {semester}
              </button>
            </>
          )}
          
          {activeSubject && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
              <span className="rounded-[6px] px-2 py-1 text-foreground bg-secondary/50">
                {activeSubject.code}
              </span>
            </>
          )}
        </nav>

        {/* Title & Metadata Setup */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {isRoot
              ? "Find Your Materials"
              : activeTopic
                ? activeTopic.title
                : activeSubject
                  ? activeSubject.name
                  : `Semester ${semester} Subjects`}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[14px] leading-relaxed text-muted-foreground max-w-2xl">
              {isRoot 
                ? "Start by selecting your branch and semester. Your customized study material is just a click away." 
                 : "Streamlined and organized to save you time. Dive into your resources below."}
            </p>
            
            {/* Minimal Property Badges */}
            {!isRoot && (
              <div className="flex flex-wrap items-center gap-2">
                {branch && (
                  <Badge variant="secondary" className="rounded-[6px] bg-muted/60 px-2 py-0.5 text-[11px] font-medium tracking-wide text-foreground">
                    {branch}
                  </Badge>
                )}
                {semester && (
                  <Badge variant="secondary" className="rounded-[6px] bg-muted/60 px-2 py-0.5 text-[11px] font-medium tracking-wide text-foreground">
                    Sem {semester}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Structural Divider */}
      <div className="h-px w-full bg-border/40" />

      {/* Routing Views Container */}
      <div className="min-h-[400px] w-full">
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
      
    </div>
  );
}
