import { ChevronRight, ExternalLink, FileText, Home, Loader2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BranchSemesterSelection } from "@/components/study/BranchSemesterSelection";
import { SubjectDashboard } from "@/components/study/SubjectDashboard";
import { SubjectGrid } from "@/components/study/SubjectGrid";
import { TopicViewer } from "@/components/study/TopicViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSubject, getSubjects } from "@/data/study-data";
import { buildAssetUrl } from "@/services/api";
import { fetchApprovedMaterials, type StudyMaterial } from "@/services/study-service";
import { useLocalAuth } from "@/hooks/use-local-auth";

export default function StudyMaterialsPage() {
  const { branch, semester, subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const [tempBranch, setTempBranch] = useState<string | null>(null);
  const [approvedUploads, setApprovedUploads] = useState<StudyMaterial[]>([]);
  const [loadingUploads, setLoadingUploads] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchApprovedMaterials()
      .then((materials) => {
        if (mounted) {
          setApprovedUploads(materials);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoadingUploads(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

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
          <div className="space-y-10">
            <BranchSemesterSelection
              selectedBranch={tempBranch}
              selectedSemester={null}
              onBranchSelect={handleBranchSelect}
              onSemesterSelect={handleSemesterSelect}
            />
            <ApprovedUploadsSection materials={approvedUploads} loading={loadingUploads} />
          </div>
        )}

        {isSubjectList && <SubjectGrid subjects={subjects} branch={branch!} semester={semester!} />}

        {isSubjectDashboard && activeSubject && <SubjectDashboard subject={activeSubject} />}

        {isTopicView && activeTopic && <TopicViewer topic={activeTopic} />}
      </div>
      
    </div>
  );
}

function ApprovedUploadsSection({
  materials,
  loading,
}: {
  materials: StudyMaterial[];
  loading: boolean;
}) {
  const { user } = useLocalAuth();
  return (
    <section className="space-y-5 border-t border-border/50 pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit rounded-md">
            Community uploads
          </Badge>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Approved study content</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Student submissions reviewed by admins and shared with proper credit.
            </p>
          </div>
        </div>
        {user && (
          <Button asChild variant="outline" className="w-full rounded-md sm:w-auto">
            <Link to="/add-study-content">
              <UploadCloud className="h-4 w-4" />
              Add Your Study Content
            </Link>
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex min-h-36 items-center justify-center rounded-md border border-border/50">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : materials.length === 0 ? (
        <div className="rounded-md border border-dashed border-border/50 p-8 text-center">
          <FileText className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium text-foreground">No approved uploads yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Be the first to submit useful study material.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {materials.map((material) => {
            const href = material.url || (material.filePath ? buildAssetUrl(material.filePath) : "");

            return (
              <article key={material._id} className="rounded-md border border-border/50 bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="truncate text-sm font-semibold text-foreground">{material.title}</h3>
                      <p className="text-xs text-muted-foreground">{material.subject}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-md text-xs">
                    {material.type}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-medium text-muted-foreground">Uploaded by {material.author}</p>
                  {href && (
                    <Button asChild size="sm" className="rounded-md">
                      <a href={href} target="_blank" rel="noreferrer">
                        Open
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
