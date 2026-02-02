import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Topic } from "@/data/study-data";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    FileText,
    Youtube,
    Loader2,
    AlertCircle,
    Maximize2,
    ChevronDown,
    ChevronUp,
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
        <div className="max-w-5xl mx-auto space-y-12 pb-32">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 border-b border-border pb-10"
            >
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                        {topic.title}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                        {topic.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {hasVideo && (
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-sm font-medium bg-muted text-foreground/80">
                            <Youtube className="h-4 w-4" />
                            Video Lesson
                        </span>
                    )}
                    {hasNotes && (
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-sm font-medium bg-muted text-foreground/80">
                            <FileText className="h-4 w-4" />
                            Study Notes
                        </span>
                    )}
                </div>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Video Section */}
                    {hasVideo && (
                        <motion.section
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-xl font-semibold tracking-tight">Video Lesson</h2>
                                <button
                                    onClick={() => {
                                        const iframe = videoContainerRef.current?.querySelector('iframe');
                                        if (iframe?.requestFullscreen) {
                                            iframe.requestFullscreen();
                                        }
                                    }}
                                    className="group flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                    aria-label="Enter fullscreen mode"
                                >
                                    <Maximize2 className="h-4 w-4" />
                                    <span>Fullscreen</span>
                                </button>
                            </div>

                            <div
                                ref={videoContainerRef}
                                className="relative aspect-video rounded-lg overflow-hidden bg-black border border-border"
                            >
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                            <p className="text-sm font-medium text-muted-foreground">Loading...</p>
                                        </div>
                                    </div>
                                )}

                                {hasVideoError ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 p-8 text-center z-10">
                                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
                                        <p className="text-foreground font-medium">Video Unavailable</p>
                                        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                                            Please check your connection.
                                        </p>
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
                        </motion.section>
                    )}

                    {/* Notes Section */}
                    {hasNotes && (
                        <motion.article
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl font-semibold tracking-tight px-1">Study Notes</h2>
                            <div className="p-0 md:p-1">
                                <MarkdownPreview
                                    content={topic.markdownContent}
                                    className="p-0 h-[500px] border rounded-lg shadow-sm"
                                />
                            </div>
                        </motion.article>
                    )}
                </div>

                {/* Sidebar / Secondary Content */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Key Takeaways */}
                    {hasSummary && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-24"
                        >
                            <div className="rounded-lg overflow-hidden border border-border bg-card">
                                <button
                                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                                    className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
                                >
                                    <h3 className="font-medium text-foreground flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                        Key Takeaways
                                    </h3>
                                    <span className={cn("transition-transform duration-300 text-muted-foreground", isSummaryOpen ? "rotate-180" : "rotate-0")}>
                                        <ChevronDown className="h-4 w-4" />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isSummaryOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="p-5 pt-2">
                                                <ul className="space-y-3">
                                                    {topic.summaryPoints.map((point, i) => (
                                                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className={cn(
                        "text-sm font-medium transition-opacity duration-300",
                        isCompleted ? "text-green-600 opacity-100" : "opacity-0"
                    )}>
                        {isCompleted && "Topic Completed"}
                    </div>

                    <Button
                        ref={primaryActionRef}
                        size="default" // Reduced size from lg
                        className={cn(
                            "rounded-md font-medium transition-all",
                            isCompleted
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        )}
                        onClick={handleMarkComplete}
                        disabled={isMarkingComplete || isCompleted}
                    >
                        {isMarkingComplete ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Saving
                            </>
                        ) : isCompleted ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Complete
                            </>
                        ) : (
                            <>
                                Mark as Complete
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}