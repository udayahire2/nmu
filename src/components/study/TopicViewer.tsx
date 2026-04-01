import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, ListFilter, Loader2, Maximize2, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MarkdownPreview from "@/components/ui/markdown-preview";
import { cn } from "@/lib/utils";
import type { Topic } from "@/data/study-data";

interface TopicViewerProps {
  topic: Topic;
  onComplete?: () => void;
}

export function TopicViewer({ topic, onComplete }: TopicViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const primaryActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      primaryActionRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  const handleMarkComplete = async () => {
    if (isCompleted || isMarkingComplete) return;

    setIsMarkingComplete(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsCompleted(true);
      onComplete?.();
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const hasVideo = Boolean(topic.youtubeVideoId);
  const hasNotes = Boolean(topic.markdownContent?.trim());
  const hasSummary = Boolean(topic.summaryPoints?.length);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-5">
        <div className="space-y-3 border-b border-border/70 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {hasVideo && <Badge variant="secondary">Video</Badge>}
            {hasNotes && <Badge variant="secondary">Notes</Badge>}
            {topic.estimatedTime && (
              <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px]">
                {topic.estimatedTime}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {topic.title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {topic.description}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Study plan</span>
            {hasVideo && <span>Watch lecture</span>}
            {hasVideo && hasNotes && <span>|</span>}
            {hasNotes && <span>Read notes</span>}
            {(hasVideo || hasNotes) && <span>|</span>}
            <span>Mark complete</span>
          </div>
        </div>

        {hasVideo && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Lecture</h2>
                <p className="text-sm text-muted-foreground">Watch the topic overview first.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  const iframe = videoContainerRef.current?.querySelector("iframe");
                  iframe?.requestFullscreen?.();
                }}
              >
                <Maximize2 className="h-4 w-4" />
                Expand
              </Button>
            </div>

            <div
              ref={videoContainerRef}
              className="relative aspect-video overflow-hidden rounded-2xl border border-border/70 bg-black/5"
            >
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}

              {hasVideoError ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-muted/30 p-6 text-center">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">Video unavailable right now</p>
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${topic.youtubeVideoId}?rel=0&modestbranding=1`}
                  title={`Video lesson: ${topic.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasVideoError(true);
                  }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                />
              )}
            </div>
          </div>
        )}

        {hasNotes ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Notes</h2>
              <p className="text-sm text-muted-foreground">Clean reading view for quick revision.</p>
            </div>

            <MarkdownPreview
              content={topic.markdownContent}
              className="min-h-[420px] rounded-2xl border border-border/60 bg-background/75 p-4 prose-pre:border prose-pre:border-border/60 prose-pre:bg-muted/40 prose-headings:font-semibold prose-headings:tracking-tight"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-background/70 p-6">
            <p className="text-sm font-medium text-foreground">Notes are not available yet.</p>
            <p className="mt-1 text-sm text-muted-foreground">You can still continue with the lecture for this topic.</p>
          </div>
        )}
      </div>

      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-5 rounded-2xl border border-border/70 bg-background/70 p-4">
          <div className="space-y-3">
            <h3 className="text-base font-semibold tracking-tight text-foreground">Quick info</h3>
            <div className="grid gap-2">
              {topic.estimatedTime && (
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/75 px-3 py-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{topic.estimatedTime}</span>
                </div>
              )}
              {hasVideo && (
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/75 px-3 py-2 text-sm text-muted-foreground">
                  <PlayCircle className="h-4 w-4 text-primary" />
                  <span>Video available</span>
                </div>
              )}
            </div>
          </div>

          {hasSummary && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ListFilter className="h-4 w-4 text-primary" />
                <h3 className="text-base font-semibold tracking-tight text-foreground">Key points</h3>
              </div>
              <ul className="space-y-3">
                {topic.summaryPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary/70" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-border/70 bg-background/75 p-4">
            <p className="text-sm font-medium text-foreground">
              {isCompleted ? "Completed" : "Track progress"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Mark this topic when you finish it.</p>
          </div>

          <Button
            ref={primaryActionRef}
            className={cn("w-full rounded-full", isCompleted && "bg-secondary text-secondary-foreground hover:bg-secondary")}
            onClick={handleMarkComplete}
            disabled={isMarkingComplete || isCompleted}
          >
            {isMarkingComplete ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </>
            ) : (
              "Mark as complete"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
