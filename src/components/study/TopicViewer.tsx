import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Topic } from "@/data/study-data";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Loader2,
    AlertCircle,
    Maximize2,
    ChevronDown,
    Lightbulb
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
        <div className="max-w-4xl mx-auto space-y-10 pb-32 pt-6 px-4">
            {/* Header */}
            <header className="space-y-4 border-b border-border/60 pb-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {topic.title}
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                        {topic.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                    {hasVideo && (
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Video Lesson
                        </span>
                    )}
                    {hasNotes && (
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Study Notes
                        </span>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Video Section */}
                    {hasVideo && (
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-lg font-semibold tracking-tight">Lesson Video</h2>
                                <button
                                    onClick={() => {
                                        const iframe = videoContainerRef.current?.querySelector('iframe');
                                        if (iframe?.requestFullscreen) {
                                            iframe.requestFullscreen();
                                        }
                                    }}
                                    className="text-xs font-bold uppercase tracking-tight text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {(<Maximize2 className="h-3.5 w-3.5 inline mr-1" />)}
                                    Fullscreen
                                </button>
                            </div>

                            <div
                                ref={videoContainerRef}
                                className="relative aspect-video rounded-lg overflow-hidden bg-black border border-border/60"
                            >
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/50" />
                                    </div>
                                )}

                                {hasVideoError ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 p-8 text-center z-10">
                                        <AlertCircle className="h-6 w-6 text-muted-foreground mb-4" />
                                        <p className="text-sm font-semibold">Video Unavailable</p>
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
                        <article className="space-y-4">
                            <h2 className="text-lg font-semibold tracking-tight px-1">Study Notes</h2>
                            <div className="border border-border/60 rounded-lg overflow-hidden bg-card">
                                <MarkdownPreview
                                    content={topic.markdownContent}
                                    className="h-[600px] border-0"
                                />
                            </div>
                        </article>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {hasSummary && (
                        <div className="sticky top-24">
                            <div className="rounded-lg border border-border/60 bg-card">
                                <button
                                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                                    className="w-full flex items-center justify-between p-4 border-b border-border/40 hover:bg-muted/30 transition-colors"
                                >
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4" />
                                        Summary
                                    </h3>
                                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground/40 transition-transform duration-300", isSummaryOpen && "rotate-180")} />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isSummaryOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="p-3 pt-4">
                                                <ul className="space-y-4">
                                                    {topic.summaryPoints.map((point, i) => (
                                                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                                                            <div className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
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
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-border/60 bg-background/95 backdrop-blur-md">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {isCompleted && "Topic Complete"}
                    </div>

                    <Button
                        ref={primaryActionRef}
                        size="sm"
                        className={cn(
                            "h-10 px-6 rounded-md font-bold uppercase tracking-wider transition-all",
                            isCompleted
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        )}
                        onClick={handleMarkComplete}
                        disabled={isMarkingComplete || isCompleted}
                    >
                        {isMarkingComplete ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isCompleted ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Done
                            </>
                        ) : (
                            "Mark as Complete"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}