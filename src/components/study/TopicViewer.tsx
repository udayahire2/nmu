import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Topic } from "@/data/study-data";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Loader2,
    AlertCircle,
    Maximize2,
    ListFilter,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownPreview from "@/components/ui/markdown-preview";

interface TopicViewerProps {
    topic: Topic;
    onComplete?: () => void;
}

export function TopicViewer({ topic, onComplete }: TopicViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasVideoError, setHasVideoError] = useState(false);
    const [isMarkingComplete, setIsMarkingComplete] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(true);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const primaryActionRef = useRef<HTMLButtonElement>(null);

    // Focus primary action on mount for keyboard users
    useEffect(() => {
        const timer = setTimeout(() => {
            primaryActionRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    const handleVideoError = () => {
        setIsLoading(false);
        setHasVideoError(true);
    };

    const handleMarkComplete = async () => {
        if (isCompleted || isMarkingComplete) return;

        setIsMarkingComplete(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800)); // Slightly longer for "weight"
            setIsCompleted(true);
            onComplete?.();

            // Show temporary success state
            setTimeout(() => {
                setIsMarkingComplete(false);
            }, 1500);
        } catch (error) {
            setIsMarkingComplete(false);
            console.error("Failed to mark as complete:", error);
        }
    };



    const hasVideo = !!topic.youtubeVideoId;
    const hasNotes = !!topic.markdownContent?.trim();
    const hasSummary = topic.summaryPoints && topic.summaryPoints.length > 0;

    return (
        <div className="max-w-5xl mx-auto pb-32 pt-8 lg:pt-12 px-4 sm:px-6">
            {/* Header */}
            <header className="space-y-6 border-b border-border/40 pb-10 mb-10">
                <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight text-balance">
                        {topic.title}
                    </h1>
                    <p className="text-[17px] text-muted-foreground/90 leading-relaxed max-w-3xl text-balance">
                        {topic.description}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                    {hasVideo && (
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-sm border border-border/40">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                            Video Lesson
                        </span>
                    )}
                    {hasNotes && (
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-sm border border-border/40">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500/80" />
                            Study Notes
                        </span>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-16">
                    {/* Video Section */}
                    {hasVideo && (
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold tracking-tight text-foreground">Lecture</h2>
                                <button
                                    onClick={() => {
                                        const iframe = videoContainerRef.current?.querySelector('iframe');
                                        if (iframe?.requestFullscreen) {
                                            iframe.requestFullscreen();
                                        }
                                    }}
                                    className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                                >
                                    <Maximize2 className="h-3 w-3" strokeWidth={2.5}/>
                                    Expand
                                </button>
                            </div>

                            <div
                                ref={videoContainerRef}
                                className="relative aspect-video rounded-xl overflow-hidden bg-black/5 ring-1 ring-inset ring-border/50 shadow-sm"
                            >
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted/5 z-10 backdrop-blur-sm">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/40" />
                                    </div>
                                )}

                                {hasVideoError ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 p-8 text-center z-10">
                                        <AlertCircle className="h-6 w-6 text-muted-foreground/40 mb-4" strokeWidth={1.5}/>
                                        <p className="text-sm font-medium text-muted-foreground">Video Unavailable</p>
                                    </div>
                                ) : (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${topic.youtubeVideoId}?rel=0&modestbranding=1`}
                                        title={`Video lesson: ${topic.title}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 z-0 bg-transparent"
                                        loading="lazy"
                                        onLoad={handleVideoLoad}
                                        onError={handleVideoError}
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                                    />
                                )}
                            </div>
                        </section>
                    )}

                    {/* Notes Section */}
                    {hasNotes && (
                        <article className="space-y-6">
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">Reference Notes</h2>
                            <div className="rounded-xl overflow-hidden bg-transparent">
                                <MarkdownPreview
                                    content={topic.markdownContent}
                                    className="min-h-[500px] border-none bg-transparent prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border/40 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                                />
                            </div>
                        </article>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {hasSummary && (
                        <div className="sticky top-28">
                            <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden">
                                <button
                                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                                    className="w-full flex items-center justify-between p-5 hover:bg-muted/10 transition-colors focus-visible:outline-none focus-visible:bg-muted/10"
                                >
                                    <h3 className="text-[13px] font-semibold uppercase tracking-widest text-foreground flex items-center gap-2.5">
                                        <ListFilter className="h-4 w-4 text-muted-foreground" strokeWidth={2}/>
                                        Key Takeaways
                                    </h3>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isSummaryOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                        >
                                            <div className="p-5 pt-0 border-t border-border/20">
                                                <ul className="space-y-4 my-2">
                                                    {topic.summaryPoints.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3.5 text-[14px] leading-relaxed text-muted-foreground">
                                                            <div className="mt-2 h-1 w-1 rounded-full bg-foreground/20 shrink-0" />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
                <div className="flex items-center gap-4 p-2 pl-6 rounded-full border border-border/40 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 ring-1 ring-white/10">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hidden sm:block">
                        {isCompleted ? "Topic Completed" : "Mark Progress"}
                    </div>

                    <Button
                        ref={primaryActionRef}
                        size="sm"
                        className={cn(
                            "h-10 sm:h-9 px-6 sm:px-5 rounded-full text-xs font-semibold transition-all w-full sm:w-auto shadow-none",
                            isCompleted
                                ? "bg-muted text-muted-foreground hover:bg-muted"
                                : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        )}
                        onClick={handleMarkComplete}
                        disabled={isMarkingComplete || isCompleted}
                    >
                        {isMarkingComplete ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : isCompleted ? (
                            <>
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" strokeWidth={2.5}/>
                                Done
                            </>
                        ) : (
                            <>
                                Complete Lesson
                                <ArrowRight className="h-3.5 w-3.5 ml-1.5 mb-[1px]" strokeWidth={2.5} />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}