import { useState } from "react";
import type { Subject } from "@/data/study-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, ChevronRight, Loader2 } from "lucide-react";
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

    const handleDownloadPaper = async (paperId: string, paperName: string) => {
        setDownloadingPaperId(paperId);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log(`Downloading ${paperName}`);
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setDownloadingPaperId(null);
        }
    };

    const getTopicUrl = (topicId: string) => {
        const basePath = `/resources/${branch || 'unknown'}/${semester || 'unknown'}/${subjectId || 'unknown'}/topic/${topicId}`;
        return basePath;
    };

    return (
        <div className="max-w-4xl mx-auto py-4 lg:py-8">
            <header className="mb-14">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 px-2.5 py-1 rounded-[4px] border border-border/40 bg-muted/20">
                                {subject.branch}
                            </span>
                            <span className="text-muted-foreground/30">•</span>
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                                Sem {subject.semester}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                            {subject.name}
                        </h1>
                        <p className="text-sm font-mono text-muted-foreground/60 font-medium tracking-wide">
                            {subject.code}
                        </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end sm:pb-1">
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/50 mb-1.5">
                            Curriculum
                        </div>
                        <div className="flex items-baseline gap-1.5 text-2xl font-bold text-foreground">
                            {subject.units.length}
                            <span className="text-[13px] font-semibold text-muted-foreground/70">Units</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Using variant="line" to trigger the proper aesthetic underline styles from tabs.tsx */}
            <Tabs defaultValue="syllabus" className="w-full">
                <div className="border-b border-border/40 mb-8 px-1">
                    <TabsList variant="line" className="w-full sm:w-auto h-auto p-0 justify-start gap-8 bg-transparent">
                        <TabsTrigger
                            value="syllabus"
                            className="pb-3 text-[14px] data-[state=active]:text-foreground text-muted-foreground !bg-transparent !shadow-none ring-0 focus-visible:ring-0 px-0"
                        >
                            Syllabus & Materials
                        </TabsTrigger>
                        <TabsTrigger
                            value="papers"
                            className="pb-3 text-[14px] data-[state=active]:text-foreground text-muted-foreground !bg-transparent !shadow-none ring-0 focus-visible:ring-0 px-0"
                        >
                            Exam Archive
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="syllabus" className="focus-visible:outline-none space-y-8 animate-in fade-in-50 duration-500">
                    <Accordion type="single" collapsible className="w-full">
                        {subject.units.map((unit) => {
                            const unitId = `unit-${unit.id}`;
                            return (
                                <AccordionItem
                                    key={unit.id}
                                    value={unitId}
                                    className="border-b border-border/20 last:border-0"
                                >
                                    <AccordionTrigger
                                        className="hover:no-underline py-5 sm:py-6 px-1 hover:bg-transparent transition-colors focus-visible:outline-none group"
                                    >
                                        <div className="flex items-baseline gap-4 sm:gap-6 w-full text-left pr-4">
                                            <span className="text-xs font-mono font-medium text-muted-foreground w-6 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                                {unit.number.toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex-1">
                                                <div className="text-[15px] sm:text-[16px] font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                                                    {unit.title}
                                                </div>
                                                <div className="text-[12px] font-medium text-muted-foreground/60 mt-1 flex items-center gap-2">
                                                    <span>{unit.topics.length} modules</span>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-8 pt-2 pl-11 sm:pl-12 pr-1">
                                        <div className="flex flex-col gap-1.5 relative before:absolute before:inset-y-2 before:-left-6 before:w-[1px] before:bg-border/20">
                                            {unit.topics.map((topic) => {
                                                const hasVideo = !!topic.youtubeVideoId;
                                                const hasNotes = true;

                                                return (
                                                    <Link
                                                        key={topic.id}
                                                        to={getTopicUrl(topic.id)}
                                                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl border border-transparent hover:border-border/30 hover:bg-muted/5 transition-all duration-300 gap-4 relative before:absolute before:left-[-24px] before:top-1/2 before:-translate-y-1/2 before:w-[12px] before:h-[1px] before:bg-border/30 before:opacity-0 hover:before:opacity-100"
                                                    >
                                                        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="text-[14px] font-medium text-muted-foreground/90 group-hover:text-foreground transition-colors line-clamp-2">
                                                                    {topic.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-between sm:justify-end gap-5 pl-0 mt-1 sm:mt-0">
                                                            <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground/50 uppercase tracking-widest shrink-0">
                                                                {hasVideo && <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-red-500/50"/> Video</span>}
                                                                {hasNotes && <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-500/50"/> Notes</span>}
                                                                {topic.estimatedTime && (
                                                                    <span className="flex items-center gap-1.5 hidden sm:flex lowercase tracking-normal">
                                                                        <Clock className="h-3 w-3 opacity-40" strokeWidth={2} />
                                                                        {topic.estimatedTime}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="h-6 w-6 rounded-full bg-transparent flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                                                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-0.5" strokeWidth={2}/>
                                                            </div>
                                                        </div>
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

                <TabsContent value="papers" className="focus-visible:outline-none animate-in fade-in-50 duration-500">
                    <div className="mb-8 max-w-2xl px-1">
                        <h2 className="text-lg font-medium tracking-tight text-foreground">Past Papers</h2>
                        <p className="text-[14px] text-muted-foreground mt-1.5">Download previous years question papers and model solutions.</p>
                    </div>

                    {subject.papers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subject.papers.map(paper => {
                                const isDownloading = downloadingPaperId === paper.id;
                                return (
                                    <div
                                        key={paper.id}
                                        className="group flex flex-col justify-between p-6 rounded-2xl border border-border/30 bg-muted/5 hover:bg-muted/10 hover:border-border/60 transition-all duration-300 gap-6"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 bg-primary/5 px-2 py-0.5 rounded-sm border border-primary/10">
                                                    {paper.type}
                                                </span>
                                            </div>
                                            <h3 className="text-[17px] font-medium tracking-tight truncate">{paper.term} {paper.year}</h3>
                                            <div className="flex items-center gap-3 mt-2.5 text-[12px] font-medium text-muted-foreground/60">
                                                <span className="flex items-center gap-1.5">
                                                    <FileText className="h-3.5 w-3.5 opacity-70" />
                                                    {paper.pages || '?'} pages
                                                </span>
                                                <span className="text-border/40">•</span>
                                                <span>{paper.fileSize}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            className="w-full sm:w-auto h-9 text-[12px] font-semibold transition-all hover:bg-primary hover:text-primary-foreground shadow-none bg-background border border-border/50"
                                            onClick={() => handleDownloadPaper(paper.id, `${paper.term} ${paper.year}`)}
                                            disabled={isDownloading}
                                        >
                                            {isDownloading ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                                            ) : (
                                                <>
                                                    <Download className="h-3.5 w-3.5 mr-2 opacity-70" strokeWidth={2} />
                                                    Download PDF
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/30 rounded-2xl bg-muted/5">
                            <FileText className="h-10 w-10 text-muted-foreground/20 mb-4" strokeWidth={1} />
                            <h3 className="text-sm font-medium tracking-tight mb-2">No papers yet</h3>
                            <p className="text-[13px] text-muted-foreground text-center max-w-[250px] mb-6">Archives are currently being organized for this subject.</p>
                            <Button
                                variant="outline"
                                className="h-9 px-6 rounded-md text-[12px] font-semibold bg-transparent shadow-none"
                                onClick={() => navigate('#syllabus')}
                            >
                                Back to Syllabus
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}