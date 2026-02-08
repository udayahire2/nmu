import { useState } from "react";
import type { Subject } from "@/data/study-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, BookOpen, ChevronRight, Loader2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

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


    // Safe URL construction with fallbacks
    const getTopicUrl = (topicId: string) => {
        const basePath = `/resources/${branch || 'unknown'}/${semester || 'unknown'}/${subjectId || 'unknown'}/topic/${topicId}`;
        return basePath;
    };

    return (
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
            <header className="mb-8 pb-6 border-b border-border/60">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {subject.branch}
                            </span>
                            <span>•</span>
                            <span>Sem {subject.semester}</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{subject.name}</h1>
                        <p className="text-sm font-mono text-muted-foreground mt-1">{subject.code}</p>
                    </div>
                    <div className="flex items-center gap-6 pb-1">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">Units</div>
                            <div className="text-xl font-bold text-foreground">
                                {subject.units.length}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Tabs defaultValue="syllabus" className="w-full">
                <TabsList
                    className="flex w-full mb-8 h-10 p-1 bg-muted/30 border border-border/50 rounded-lg"
                    aria-label="Subject content sections"
                >
                    <TabsTrigger
                        value="syllabus"
                        className="flex-1 rounded-md text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
                    >
                        Topics & Materials
                    </TabsTrigger>
                    <TabsTrigger
                        value="papers"
                        className="flex-1 rounded-md text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
                    >
                        Exam Papers
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="syllabus" className="focus-visible:outline-none">
                    {showTip && (
                        <div className="mb-8 p-4 rounded-lg bg-muted/40 border border-border/60 flex items-start justify-between gap-4">
                            <p className="text-sm text-foreground/80 flex-1">
                                <span className="font-bold text-foreground">Selection:</span> Click on a topic to view its full notes and materials.
                            </p>
                            <button
                                onClick={() => setShowTip(false)}
                                className="text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-tight transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}

                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {subject.units.map((unit) => {
                            const unitId = `unit-${unit.id}`;
                            return (
                                <AccordionItem
                                    key={unit.id}
                                    value={unitId}
                                    className="border border-border/60 rounded-lg bg-card overflow-hidden transition-all duration-200"
                                >
                                    <AccordionTrigger
                                        className="hover:no-underline py-4 px-5 hover:bg-muted/30 transition-colors focus-visible:outline-none"
                                    >
                                        <div className="flex items-center gap-4 w-full text-left">
                                            <span className="text-sm font-bold text-muted-foreground/60 w-6">
                                                {unit.number.toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex-1">
                                                <div className="text-base font-semibold">
                                                    {unit.title}
                                                </div>
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mt-0.5">
                                                    {unit.topics.length} topics
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-3 pt-1 px-4">
                                        <div className="space-y-1">
                                            {unit.topics.map((topic, index) => {
                                                const hasVideo = !!topic.youtubeVideoId;
                                                const hasNotes = true;

                                                return (
                                                    <Link
                                                        key={topic.id}
                                                        to={getTopicUrl(topic.id)}
                                                        className="group flex items-center justify-between p-3 rounded-md border border-transparent hover:border-border/60 hover:bg-accent/30 transition-all duration-200"
                                                    >
                                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                                            <span className="text-[10px] font-bold text-muted-foreground/40 w-4 group-hover:text-primary transition-colors">
                                                                {(index + 1).toString().padStart(2, '0')}
                                                            </span>
                                                            <div className="min-w-0">
                                                                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                                    {topic.title}
                                                                </h3>
                                                                <div className="flex items-center gap-3 mt-1 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-tight">
                                                                    {hasVideo && <span>Video</span>}
                                                                    {hasNotes && <span>Notes</span>}
                                                                    {topic.estimatedTime && (
                                                                        <span className="flex items-center gap-1 lowercase">
                                                                            <Clock className="h-2.5 w-2.5" />
                                                                            {topic.estimatedTime}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
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
                    <div className="mb-6 px-1">
                        <h2 className="text-lg font-semibold tracking-tight">Exam Archive</h2>
                        <p className="text-sm text-muted-foreground">Previous years question papers and model solutions.</p>
                    </div>

                    {subject.papers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {subject.papers.map(paper => {
                                const isDownloading = downloadingPaperId === paper.id;
                                return (
                                    <div
                                        key={paper.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border/60 bg-card hover:bg-accent/10 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold truncate">{paper.term} {paper.year}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{paper.type}</span>
                                                <span className="text-border/40">•</span>
                                                <span className="text-[10px] font-medium text-muted-foreground/60">
                                                    {paper.fileSize}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs font-bold uppercase tracking-tight hover:bg-primary/10 hover:text-primary"
                                            onClick={() => handleDownloadPaper(paper.id, `${paper.term} ${paper.year}`)}
                                            disabled={isDownloading}
                                        >
                                            {isDownloading ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Download className="h-3.5 w-3.5 mr-1.5" />
                                                    Get
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-dashed border-border/60 rounded-lg bg-muted/20">
                            <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                            <h3 className="text-sm font-semibold mb-1">No papers yet</h3>
                            <p className="text-xs text-muted-foreground max-w-[200px] mx-auto mb-4">Archives are being populated for this subject.</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs font-bold uppercase"
                                onClick={() => navigate('#syllabus')}
                            >
                                View Materials
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}