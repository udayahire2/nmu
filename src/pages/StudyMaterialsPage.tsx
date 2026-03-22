import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

// shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Icons
import { BookOpen, Layers3, ChevronRight } from "lucide-react";

// Local components & data
import { BranchSemesterSelection } from "@/components/study/BranchSemesterSelection";
import { SubjectGrid } from "@/components/study/SubjectGrid";
import { SubjectDashboard } from "@/components/study/SubjectDashboard";
import { TopicViewer } from "@/components/study/TopicViewer";
import {
  getSubjects,
  getSubject,
} from "@/data/study-data";

// ─────────────────────────────────────────────
// Breadcrumbs component — fully shadcn-based
// ─────────────────────────────────────────────
function StudyMaterialsBreadcrumbs({
  branch,
  semester,
  activeSubject,
  activeTopic,
  onNavigate,
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => onNavigate("/resources")}
            className="cursor-pointer"
          >
            Study Materials
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Branch */}
        {branch && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {semester ? (
                <BreadcrumbLink
                  onClick={() => onNavigate("/resources")}
                  className="cursor-pointer"
                >
                  {branch}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{branch}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Semester */}
        {branch && semester && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {activeSubject ? (
                <BreadcrumbLink
                  onClick={() =>
                    onNavigate(`/resources/${branch}/${semester}`)
                  }
                  className="cursor-pointer"
                >
                  Semester {semester}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>Semester {semester}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Subject */}
        {activeSubject && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {activeTopic ? (
                <BreadcrumbLink
                  onClick={() =>
                    onNavigate(
                      `/resources/${branch}/${semester}/${activeSubject.id}`
                    )
                  }
                  className="cursor-pointer"
                >
                  {activeSubject.code}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{activeSubject.code}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Topic */}
        {activeTopic && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {activeTopic.title.length > 32
                  ? `${activeTopic.title.substring(0, 32)}…`
                  : activeTopic.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// ─────────────────────────────────────────────
// Feature highlight card
// ─────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function StudyMaterialsPage() {
  const { branch, semester, subjectId, topicId } = useParams();
  const navigate = useNavigate();

  const [tempBranch, setTempBranch] = useState(null);

  // Handlers
  const handleBranchSelect = (b) => setTempBranch(b);

  const handleSemesterSelect = (sem) => {
    if (tempBranch) navigate(`/resources/${tempBranch}/${sem}`);
  };

  const handleReset = () => {
    setTempBranch(null);
    navigate("/resources");
  };

  // Derived state from URL
  const isRoot = !branch || !semester;
  const isSubjectList = branch && semester && !subjectId;
  const isSubjectDashboard = subjectId && !topicId;
  const isTopicView = !!topicId;

  const subjects = useMemo(
    () => (branch && semester ? getSubjects(branch, semester) : []),
    [branch, semester]
  );

  const activeSubject = useMemo(
    () => (subjectId ? getSubject(subjectId) : undefined),
    [subjectId]
  );

  const activeTopic = useMemo(() => {
    if (!activeSubject || !topicId) return undefined;
    return activeSubject.units
      .flatMap((u) => u.topics)
      .find((t) => t.id === topicId);
  }, [activeSubject, topicId]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs — hidden on root */}
        {!isRoot && (
          <div className="mb-8">
            <StudyMaterialsBreadcrumbs
              branch={branch}
              semester={semester}
              activeSubject={activeSubject}
              activeTopic={activeTopic}
              onNavigate={navigate}
            />
          </div>
        )}

        {/* ── ROOT: Branch & Semester selection ── */}
        {isRoot && (
          <div className="space-y-8">

            {/* Hero card */}
            <Card>
              <CardHeader className="space-y-4 pb-4">
                <Badge variant="secondary" className="w-fit">
                  Engineering Content
                </Badge>

                <div className="space-y-3">
                  <CardTitle className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    All your study materials
                    <span className="block text-muted-foreground">
                      in one place.
                    </span>
                  </CardTitle>

                  <CardDescription className="max-w-xl text-base leading-relaxed sm:text-lg">
                    Navigate your curriculum instantly. Faculty-approved notes,
                    video tutorials, and past year papers — structured for speed.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Feature cards */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <FeatureCard
                    icon={BookOpen}
                    title="Structured by branch"
                    description="Jump directly into your department-specific resources."
                  />
                  <FeatureCard
                    icon={Layers3}
                    title="Unit-wise flow"
                    description="Open subjects, browse units and study topic by topic."
                  />
                  <FeatureCard
                    icon={ChevronRight}
                    title="Exam-ready access"
                    description="Move quickly from overview to notes, videos and archives."
                  />
                </div>

                <Separator />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    Start by choosing your branch and semester.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Reset Selection
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Branch + Semester selector */}
            <Card>
              <CardContent className="pt-6">
                <BranchSemesterSelection
                  selectedBranch={tempBranch}
                  selectedSemester={null}
                  onBranchSelect={handleBranchSelect}
                  onSemesterSelect={handleSemesterSelect}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── SUBJECT LIST ── */}
        {isSubjectList && (
          <SubjectGrid
            subjects={subjects}
            branch={branch}
            semester={semester}
          />
        )}

        {/* ── SUBJECT DASHBOARD ── */}
        {isSubjectDashboard && activeSubject && (
          <SubjectDashboard subject={activeSubject} />
        )}

        {/* ── TOPIC VIEWER ── */}
        {isTopicView && activeTopic && (
          <TopicViewer topic={activeTopic} />
        )}
      </div>
    </div>
  );
}