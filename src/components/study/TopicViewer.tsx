import type { Topic } from "@/data/study-data";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Youtube } from "lucide-react";

interface TopicViewerProps {
    topic: Topic;
    onComplete?: () => void;
}

export function TopicViewer({ topic, onComplete }: TopicViewerProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="space-y-4 border-b pb-8">
                <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {topic.description}
                </p>
                <div className="flex gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600">
                        <Youtube className="h-3.5 w-3.5" />
                        Video
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600">
                        <FileText className="h-3.5 w-3.5" />
                        Notes
                    </span>
                </div>
            </header>

            {/* Video Section */}
            {topic.youtubeVideoId && (
                <section className="rounded-2xl overflow-hidden border border-border bg-black aspect-video relative group">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${topic.youtubeVideoId}`}
                        title={topic.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                        loading="lazy"
                    />
                </section>
            )}

            {/* Exam Summary */}
            <section className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="font-bold text-amber-600 mb-4 flex items-center gap-2">
                    ✨ Exam Ready Summary
                </h3>
                <ul className="space-y-2">
                    {topic.summaryPoints.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm md:text-base text-foreground/80">
                            <span className="block h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                            {point}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Notes Preview (Markdown ideally, simplified here) */}
            <article className="prose prose-zinc dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{
                    // SAFE: Content is from trusted local data source.
                    // In a real app with user content, use DOMPurify here.
                    __html: topic.markdownContent.replace(/\n/g, '<br/>').replace(/# (.*)/g, '<h2>$1</h2>')
                }} />
            </article>

            {/* Action */}
            <div className="flex justify-end pt-10 border-t">
                <Button size="lg" className="rounded-full gap-2" onClick={onComplete}>
                    <CheckCircle2 className="h-5 w-5" />
                    Mark as Completed
                </Button>
            </div>
        </div>
    );
}
