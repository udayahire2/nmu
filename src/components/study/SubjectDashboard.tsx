import { useState } from "react";
import type { Subject } from "@/data/study-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, PlayCircle, Download, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SubjectDashboardProps {
    subject: Subject;
}

export function SubjectDashboard({ subject }: SubjectDashboardProps) {
    const { branch, semester, subjectId } = useParams<{
        branch: string;
        semester: string;
        subjectId: string;
    }>();
    const navigate = useNavigate();
    const [downloadingPaperId, setDownloadingPaperId] = useState<string | null>(null);
    const [showTip, setShowTip] = useState(true);

    const handleDownloadPaper = async (paperId: string, paperName: string) => {
        setDownloadingPaperId(paperId);
        try {
            // Simulate download delay
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log(`Downloading ${paperName}`);
            // Actual download logic here
        } catch (error) {
            console.error("Download failed:", error);
            // Show error toast here in production
        } finally {
            setDownloadingPaperId(null);
        }
    };

    const getPaperTypeConfig = (type: string) => {
        const configs: Record<string, { bg: string; text: string }> = {
            "Solved": { bg: "bg-green-500/15", text: "text-green-600" },
            "Unsolved": { bg: "bg-orange-500/15", text: "text-orange-600" },
            "Model": { bg: "bg-blue-500/15", text: "text-blue-600" },
            "Previous": { bg: "bg-purple-500/15", text: "text-purple-600" },
        };
        return configs[type] || { bg: "bg-muted", text: "text-muted-foreground" };
    };

    // Safe URL construction with fallbacks
    const getTopicUrl = (topicId: string) => {
        const basePath = `/resources/${branch || 'unknown'}/${semester || 'unknown'}/${subjectId || 'unknown'}/topic/${topicId}`;
        return basePath;
    };

    return (
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
            <header className="mb-8 pb-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{subject.name}</h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-3.5 w-3.5" />
                                {subject.branch}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>Semester {subject.semester}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="font-mono bg-muted px-2 py-1 rounded-md">{subject.code}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Total Units</div>
                            <div className="text-xl font-bold text-primary">
                                {subject.units.length}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* FIXED: Removed duplicate Tabs wrapper */}
            <Tabs defaultValue="syllabus" className="w-full">
                <TabsList
                    className="flex w-full mb-8 h-14 rounded-full bg-muted/20 border border-border/40"
                    aria-label="Subject content sections"
                >
                    <TabsTrigger
                        value="syllabus"
                        className="rounded-full text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                    >
                        Topics & Resources
                    </TabsTrigger>
                    <TabsTrigger
                        value="papers"
                        className="rounded-full text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                    >
                        Question Papers
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="syllabus" className="focus-visible:outline-none">
                    {showTip && (
                        <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start justify-between gap-4">
                            <p className="text-sm text-primary/80 flex-1">
                                <strong className="font-semibold">Tip:</strong> Click on any topic to access detailed notes, videos, and practice questions.
                            </p>
                            <button
                                onClick={() => setShowTip(false)}
                                className="text-primary/60 hover:text-primary text-sm px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                                aria-label="Dismiss tip"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {subject.units.map((unit) => {
                            const unitId = `unit-${unit.id}`;
                            return (
                                <AccordionItem
                                    key={unit.id}
                                    value={unitId}
                                    className="border border-border rounded-xl bg-card overflow-hidden transition-all duration-200 hover:border-border/80"
                                >
                                    <AccordionTrigger
                                        className="hover:no-underline py-4 px-5 data-[state=open]:bg-accent/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                                    >
                                        <div className="flex items-center gap-4 w-full text-left">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold shrink-0">
                                                {unit.number}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-lg font-semibold">
                                                    {unit.title}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {unit.topics.length} topics
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-4 pt-2 px-5">
                                        <div className="space-y-3 pl-2 sm:pl-4">
                                            {unit.topics.map((topic, index) => {
                                                const hasVideo = !!topic.youtubeVideoId;
                                                const hasNotes = true;

                                                return (
                                                    <Link
                                                        key={topic.id}
                                                        to={getTopicUrl(topic.id)}
                                                        className="group flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background hover:border-primary/30 hover:bg-accent/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1"
                                                        aria-label={`Open resources for topic: ${topic.title}`}
                                                    >
                                                        <div className="flex items-start gap-4 min-w-0 flex-1">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-semibold text-foreground shrink-0">
                                                                {index + 1}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                                    {topic.title}
                                                                </h3>
                                                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                                                    {hasVideo && (
                                                                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-rose-500/10 text-rose-700">
                                                                            <PlayCircle className="h-3 w-3" />
                                                                            Video
                                                                        </span>
                                                                    )}
                                                                    {hasNotes && (
                                                                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-700">
                                                                            <FileText className="h-3 w-3" />
                                                                            Notes
                                                                        </span>
                                                                    )}
                                                                    {topic.estimatedTime && (
                                                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                            <Clock className="h-3 w-3" />
                                                                            {topic.estimatedTime}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all ml-4 shrink-0" />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </TabsContent>

                <TabsContent value="papers" className="focus-visible:outline-none">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Previous Exams & Practice Papers</h2>
                        <p className="text-sm text-muted-foreground">
                            Download question papers to practice for exams
                        </p>
                    </div>

                    {subject.papers.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {subject.papers.map(paper => {
                                const typeConfig = getPaperTypeConfig(paper.type);
                                const isDownloading = downloadingPaperId === paper.id;

                                return (
                                    <div
                                        key={paper.id}
                                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/10 transition-colors"
                                    >
                                        <div className="flex-1 mb-3 sm:mb-0">
                                            <h3 className="font-semibold">{paper.term} {paper.year}</h3>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className={cn(
                                                    "text-xs font-medium px-2.5 py-1 rounded-full",
                                                    typeConfig.bg,
                                                    typeConfig.text
                                                )}>
                                                    {paper.type}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {paper.pages} pages • {paper.fileSize}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 w-full sm:w-auto min-w-[100px]"
                                            onClick={() => handleDownloadPaper(paper.id, `${paper.term} ${paper.year}`)}
                                            disabled={isDownloading}
                                            aria-label={`Download ${paper.type} paper for ${paper.term} ${paper.year}`}
                                        >
                                            {isDownloading ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    <span className="sr-only">Downloading...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4 border-2 border-dashed border-border rounded-xl bg-muted/20">
                            <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No question papers available yet</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                Question papers for this subject will be added soon. Check back later or explore other resources.
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate('#syllabus')}
                            >
                                Browse Topics Instead
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}