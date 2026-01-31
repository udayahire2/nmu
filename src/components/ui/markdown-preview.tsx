import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface MarkdownPreviewProps {
    content: string;
    className?: string;
}

export default function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
    const [isMaximized, setIsMaximized] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const dialogContentRef = useRef<HTMLDivElement>(null);

    // Handle escape key to close dialog
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMaximized) {
                setIsMaximized(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isMaximized]);

    // Fix for dialog focus trap interfering with scroll
    useEffect(() => {
        if (isMaximized && scrollContainerRef.current) {
            // Focus the scroll container to ensure it receives wheel events
            setTimeout(() => {
                scrollContainerRef.current?.focus({ preventScroll: true });
            }, 10);
        }
    }, [isMaximized]);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMaximized(!isMaximized);
    };

    // Prevent default dialog behavior on scroll container click
    const handleScrollContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Shared content renderer
    const Content = () => (
        <div className={cn(
            "p-6 md:p-8",
            "prose prose-zinc dark:prose-invert !max-w-none w-full",
            "prose-headings:font-bold prose-headings:tracking-tight",
            "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
            "prose-p:leading-7 prose-p:text-muted-foreground",
            "prose-strong:text-foreground prose-strong:font-semibold",
            "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
            "prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none",
            "prose-pre:bg-secondary/30 prose-pre:border prose-pre:border-border/50 prose-pre:text-foreground",
            "prose-blockquote:border-l-primary prose-blockquote:bg-secondary/20 prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:pr-2 prose-blockquote:italic",
            "prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6",
            "prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6",
            "prose-li:my-2 prose-li:text-muted-foreground",
            "prose-img:rounded-xl prose-img:border prose-img:border-border/50 prose-img:shadow-md",
            "prose-hr:border-border/50",
            "select-text" // Ensure text selection works
        )}>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    );

    return (
        <>
            {/* Normal Mode */}
            <div
                className={cn("relative bg-background group overflow-hidden", className)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute right-4 top-4 z-50">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleToggle}
                        title="Maximize"
                    >
                        <Maximize className="h-4 w-4" />
                    </Button>
                </div>

                <div
                    className="h-full w-full markdown-scrollbar"
                    style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'hsl(var(--border)) transparent',
                        overscrollBehavior: 'contain' // Prevent scroll chaining
                    }}
                    onClick={handleScrollContainerClick}
                    onWheel={(e) => e.stopPropagation()} // Stop scroll bubbling to parent
                >
                    <Content />
                </div>
            </div>

            {/* Maximized Mode - Using Dialog */}
            <Dialog open={isMaximized} onOpenChange={setIsMaximized}>
                <DialogContent
                    ref={dialogContentRef}
                    className="!max-w-none !w-screen !h-screen !p-0 !border-0 !rounded-none !bg-background !flex !flex-col focus:outline-none z-[99999] overflow-hidden !top-0 !left-0 !translate-x-0 !translate-y-0"
                    showCloseButton={false}
                    onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on scrollbar click
                    onInteractOutside={(e) => {
                        // Only allow closing when clicking the backdrop, not scrollbar/content
                        const target = e.target as HTMLElement;
                        if (target.closest('.markdown-scrollbar') ||
                            target.closest('.scroll-container') ||
                            target === scrollContainerRef.current) {
                            e.preventDefault();
                        }
                    }}
                >
                    <DialogTitle className="sr-only">Markdown Preview</DialogTitle>

                    {/* Header */}
                    <div className="absolute top-4 right-4 z-50">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm shadow-md"
                            onClick={handleToggle}
                            title="Minimize"
                        >
                            <Minimize className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Scrollable Content - Fixed container */}
                    <div
                        ref={scrollContainerRef}
                        className="scroll-container flex-1 w-full h-full overflow-hidden relative"
                        onClick={handleScrollContainerClick}
                        onWheel={(e) => e.stopPropagation()} // Ensure wheel events don't bubble up
                        tabIndex={0} // Make it focusable for keyboard navigation
                        style={{
                            outline: 'none', // Remove focus outline
                            position: 'relative'
                        }}
                    >
                        <div
                            className="markdown-scrollbar w-full h-full overflow-y-auto"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'hsl(var(--border)) transparent',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                padding: '1rem 0'
                            }}
                            onClick={(e) => {
                                // Ensure clicks within the scrollable area don't bubble
                                e.stopPropagation();
                            }}
                        >
                            {/* Full width container, no centering or max-width constraints */}
                            <div
                                className="w-full min-h-full bg-background px-4 md:px-8 py-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Content />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}