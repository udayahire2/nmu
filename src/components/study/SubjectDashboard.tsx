import { useState } from "react";
import { ChevronRight, Clock, Download, FileText, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Subject } from "@/data/study-data";

interface SubjectDashboardProps {
  subject: Subject;
}

export function SubjectDashboard({ subject }: SubjectDashboardProps) {
  const { branch, semester, subjectId } = useParams<{
    branch: string;
    semester: string;
    subjectId: string;
  }>();
  const [downloadingPaperId, setDownloadingPaperId] = useState<string | null>(null);

  const totalTopics = subject.units.reduce((count, unit) => count + unit.topics.length, 0);

  const handleDownloadPaper = async (paperId: string) => {
    setDownloadingPaperId(paperId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
    } finally {
      setDownloadingPaperId(null);
    }
  };

  const getTopicUrl = (topicId: string) =>
    `/resources/${branch || "unknown"}/${semester || "unknown"}/${subjectId || "unknown"}/topic/${topicId}`;

  return (
    <section className="space-y-6">
      <div className="space-y-3 border-b border-border/70 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
            {subject.branch}
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
            Sem {subject.semester}
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
            {subject.units.length} units
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
            {totalTopics} topics
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {subject.name}
          </h1>
          <p className="font-mono text-sm text-muted-foreground">{subject.code}</p>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Open a unit below to start with notes, lecture, and revision material.
          </p>
        </div>
      </div>

      <Tabs defaultValue="syllabus" className="w-full">
        <TabsList
          variant="line"
          className="mb-5 grid h-auto w-full grid-cols-2 gap-2 rounded-2xl bg-secondary/50 p-1 sm:w-fit"
        >
          <TabsTrigger value="syllabus" className="rounded-xl px-4 py-2 text-sm data-[state=active]:bg-background">
            Topics
          </TabsTrigger>
          <TabsTrigger value="papers" className="rounded-xl px-4 py-2 text-sm data-[state=active]:bg-background">
            Papers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="syllabus" className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/70">
            <div className="border-b border-border/70 px-4 py-4 sm:px-5">
              <h2 className="text-base font-semibold text-foreground">Topic list</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick one topic and continue reading from there.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {subject.units.map((unit) => (
                <AccordionItem key={unit.id} value={unit.id} className="border-b border-border/60 px-4 last:border-b-0 sm:px-5">
                  <AccordionTrigger className="py-4 text-left hover:no-underline">
                    <div className="flex flex-col gap-1 text-left sm:flex-row sm:items-center sm:gap-4">
                      <span className="text-sm font-semibold text-primary">Unit {unit.number}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground sm:text-base">{unit.title}</p>
                        <p className="text-sm text-muted-foreground">{unit.topics.length} topics inside this unit</p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-2 pb-5">
                    {unit.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        to={getTopicUrl(topic.id)}
                        className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/75 px-3 py-3 transition-colors hover:bg-secondary/30"
                      >
                        <div className="min-w-0 space-y-1">
                          <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>

                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
                            {topic.youtubeVideoId && <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px]">Video</Badge>}
                            <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px]">Notes</Badge>
                            {topic.estimatedTime && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {topic.estimatedTime}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <span className="hidden sm:inline">Open</span>
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="papers" className="space-y-3">
          {subject.papers.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/70">
              <div className="border-b border-border/70 px-4 py-4 sm:px-5">
                <h2 className="text-base font-semibold text-foreground">Previous papers</h2>
                <p className="mt-1 text-sm text-muted-foreground">Use them for revision and exam practice.</p>
              </div>

              <div className="divide-y divide-border/70">
                {subject.papers.map((paper) => {
                  const isDownloading = downloadingPaperId === paper.id;

                  return (
                    <div
                      key={paper.id}
                      className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                            {paper.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{paper.term} {paper.year}</span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {paper.pages || "?"} pages{paper.fileSize ? ` | ${paper.fileSize}` : ""}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full rounded-full sm:w-auto"
                        onClick={() => handleDownloadPaper(paper.id)}
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Preparing
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download paper
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/70 bg-background/70 p-10 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold text-foreground">No papers uploaded yet</h3>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Previous papers for this subject are still being organized.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
