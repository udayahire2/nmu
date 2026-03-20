import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clock, ChevronRight, Download, FileText, Loader2 } from "lucide-react";

import type { Subject } from "@/data/study-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            await new Promise((resolve) => setTimeout(resolve, 800));
            console.log(`Downloading ${paperName}`);
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setDownloadingPaperId(null);
        }
    };

    const getTopicUrl = (topicId: string) => {
        return `/resources/${branch || "unknown"}/${semester || "unknown"}/${subjectId || "unknown"}/topic/${topicId}`;
    };

    return (
        <div className="mx-auto max-w-5xl py-4 lg:py-8">
            <Card className="mb-10 border-border/50 bg-card/70 shadow-none">
                <CardContent className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-end">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                {subject.branch}
                            </Badge>
                            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                Sem {subject.semester}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                {subject.name}
                            </h1>
                            <p className="font-mono text-sm font-medium tracking-wide text-muted-foreground/70">
                                {subject.code}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end">
                        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                            Curriculum
                        </div>
                        <div className="flex items-baseline gap-1.5 text-2xl font-bold text-foreground">
                            {subject.units.length}
                            <span className="text-[13px] font-semibold text-muted-foreground/70">Units</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 shadow-none">
                <CardContent className="p-4 sm:p-6">
                    <Tabs defaultValue="syllabus" className="w-full">
                        <div className="mb-8 border-b border-border/40 px-1">
                            <TabsList variant="line" className="h-auto w-full justify-start gap-8 bg-transparent p-0 sm:w-auto">
                                <TabsTrigger
                                    value="syllabus"
                                    className="px-0 pb-3 text-[14px] text-muted-foreground !bg-transparent !shadow-none ring-0 data-[state=active]:text-foreground focus-visible:ring-0"
                                >
                                    Syllabus & Materials
                                </TabsTrigger>
                                <TabsTrigger
                                    value="papers"
                                    className="px-0 pb-3 text-[14px] text-muted-foreground !bg-transparent !shadow-none ring-0 data-[state=active]:text-foreground focus-visible:ring-0"
                                >
                                    Exam Archive
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="syllabus" className="space-y-8 animate-in fade-in-50 duration-500 focus-visible:outline-none">
                            <Accordion type="single" collapsible className="w-full">
                                {subject.units.map((unit) => {
                                    const unitId = `unit-${unit.id}`;

                                    return (
                                        <AccordionItem
                                            key={unit.id}
                                            value={unitId}
                                            className="border-b border-border/20 last:border-0"
                                        >
                                            <AccordionTrigger className="group px-1 py-5 transition-colors hover:bg-transparent hover:no-underline focus-visible:outline-none sm:py-6">
                                                <div className="flex w-full items-baseline gap-4 pr-4 text-left sm:gap-6">
                                                    <span className="w-6 shrink-0 font-mono text-xs font-medium text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100">
                                                        {unit.number.toString().padStart(2, "0")}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="text-[15px] font-medium tracking-tight text-foreground/90 transition-colors group-hover:text-foreground sm:text-[16px]">
                                                            {unit.title}
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-2 text-[12px] font-medium text-muted-foreground/60">
                                                            <span>{unit.topics.length} modules</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent className="px-1 pb-8 pt-2 pr-1 pl-11 sm:pl-12">
                                                <div className="relative flex flex-col gap-1.5 before:absolute before:inset-y-2 before:-left-6 before:w-[1px] before:bg-border/20">
                                                    {unit.topics.map((topic) => {
                                                        const hasVideo = !!topic.youtubeVideoId;
                                                        const hasNotes = true;

                                                        return (
                                                            <Link
                                                                key={topic.id}
                                                                to={getTopicUrl(topic.id)}
                                                                className="group relative flex flex-col justify-between gap-4 rounded-xl border border-transparent p-3.5 transition-all duration-300 hover:border-border/30 hover:bg-muted/5 before:absolute before:top-1/2 before:left-[-24px] before:h-[1px] before:w-[12px] before:-translate-y-1/2 before:bg-border/30 before:opacity-0 hover:before:opacity-100 sm:flex-row sm:items-center sm:p-4"
                                                            >
                                                                <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">
                                                                    <div className="min-w-0 flex-1">
                                                                        <h3 className="line-clamp-2 text-[14px] font-medium text-muted-foreground/90 transition-colors group-hover:text-foreground">
                                                                            {topic.title}
                                                                        </h3>
                                                                    </div>
                                                                </div>

                                                                <div className="mt-1 flex items-center justify-between gap-5 pl-0 sm:mt-0 sm:justify-end">
                                                                    <div className="flex shrink-0 items-center gap-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
                                                                        {hasVideo && (
                                                                            <span className="flex items-center gap-1.5">
                                                                                <div className="h-1 w-1 rounded-full bg-red-500/50" />
                                                                                Video
                                                                            </span>
                                                                        )}
                                                                        {hasNotes && (
                                                                            <span className="flex items-center gap-1.5">
                                                                                <div className="h-1 w-1 rounded-full bg-blue-500/50" />
                                                                                Notes
                                                                            </span>
                                                                        )}
                                                                        {topic.estimatedTime && (
                                                                            <span className="hidden items-center gap-1.5 lowercase tracking-normal sm:flex">
                                                                                <Clock className="h-3 w-3 opacity-40" strokeWidth={2} />
                                                                                {topic.estimatedTime}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-transparent transition-colors group-hover:bg-primary/5">
                                                                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary" strokeWidth={2} />
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

                        <TabsContent value="papers" className="animate-in fade-in-50 duration-500 focus-visible:outline-none">
                            <div className="mb-8 max-w-2xl px-1">
                                <h2 className="text-lg font-medium tracking-tight text-foreground">Past Papers</h2>
                                <p className="mt-1.5 text-[14px] text-muted-foreground">
                                    Download previous years question papers and model solutions.
                                </p>
                            </div>

                            {subject.papers.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {subject.papers.map((paper) => {
                                        const isDownloading = downloadingPaperId === paper.id;

                                        return (
                                            <div
                                                key={paper.id}
                                                className="group flex flex-col justify-between gap-6 rounded-2xl border border-border/30 bg-muted/5 p-6 transition-all duration-300 hover:border-border/60 hover:bg-muted/10"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <span className="rounded-sm border border-primary/10 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary/80">
                                                            {paper.type}
                                                        </span>
                                                    </div>
                                                    <h3 className="truncate text-[17px] font-medium tracking-tight">
                                                        {paper.term} {paper.year}
                                                    </h3>
                                                    <div className="mt-2.5 flex items-center gap-3 text-[12px] font-medium text-muted-foreground/60">
                                                        <span className="flex items-center gap-1.5">
                                                            <FileText className="h-3.5 w-3.5 opacity-70" />
                                                            {paper.pages || "?"} pages
                                                        </span>
                                                        <span className="text-border/40">•</span>
                                                        <span>{paper.fileSize}</span>
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="secondary"
                                                    className="h-9 w-full border border-border/50 bg-background text-[12px] font-semibold shadow-none transition-all hover:bg-primary hover:text-primary-foreground sm:w-auto"
                                                    onClick={() => handleDownloadPaper(paper.id, `${paper.term} ${paper.year}`)}
                                                    disabled={isDownloading}
                                                >
                                                    {isDownloading ? (
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                                                    ) : (
                                                        <>
                                                            <Download className="mr-2 h-3.5 w-3.5 opacity-70" strokeWidth={2} />
                                                            Download PDF
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/30 bg-muted/5 py-20">
                                    <FileText className="mb-4 h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
                                    <h3 className="mb-2 text-sm font-medium tracking-tight">No papers yet</h3>
                                    <p className="mb-6 max-w-[250px] text-center text-[13px] text-muted-foreground">
                                        Archives are currently being organized for this subject.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="h-9 rounded-md bg-transparent px-6 text-[12px] font-semibold shadow-none"
                                        onClick={() => navigate("#syllabus")}
                                    >
                                        Back to Syllabus
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
