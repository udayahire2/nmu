import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Lenis from 'lenis';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { Maximize, Minimize } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CodeBlock } from "@/components/ui/code-block";

interface MarkdownPreviewProps {
    content: string;
    className?: string;
}

export default function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
    const [isMaximized, setIsMaximized] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const normalScrollRef = useRef<HTMLDivElement>(null);
    const dialogContentRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

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

    // Initialize Lenis for smooth scrolling
    useEffect(() => {
        const targetRef = isMaximized ? scrollContainerRef : normalScrollRef;

        // Give a small delay for the DOM to settle (especially for Dialog open)
        const timer = setTimeout(() => {
            if (targetRef.current) {
                const lenis = new Lenis({
                    wrapper: targetRef.current,
                    content: targetRef.current.firstElementChild as HTMLElement,
                    duration: 0.8, // Reduced from 1.2 for snappier feel
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Keep standard easing
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    wheelMultiplier: 1.5, // Increased sensitivity
                    touchMultiplier: 2,
                });

                lenisRef.current = lenis;

                function raf(time: number) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }

                requestAnimationFrame(raf);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, [isMaximized]);

    // Fix for dialog focus trap interfering with scroll
    useEffect(() => {
        if (isMaximized && scrollContainerRef.current) {
            // Focus the scroll container to ensure it receives wheel events
            setTimeout(() => {
                scrollContainerRef.current?.focus({ preventScroll: true });
            }, 50);
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
            "p-8 md:p-12 font-sans", // Notion uses generous padding
            "prose prose-zinc dark:prose-invert !max-w-3xl mx-auto w-full", // Centered content like Notion
            // Typography updates
            "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
            "prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4",
            "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-border/40", // Underlined H2
            "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2",
            // Text styling
            "prose-p:leading-relaxed prose-p:text-base prose-p:text-foreground/90 prose-p:my-3",
            "prose-strong:font-semibold prose-strong:text-foreground",
            "prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-primary/50",
            // Code & Pre styling handled by custom component, but defaults for inline code:
            "prose-code:text-red-500 prose-code:bg-red-500/10 dark:prose-code:text-red-400 dark:prose-code:bg-red-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
            // Blockquotes
            "prose-blockquote:border-l-4 prose-blockquote:border-foreground/20 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-4 prose-blockquote:not-italic prose-blockquote:text-muted-foreground",
            // Lists
            "prose-ul:my-2 prose-ul:list-disc prose-ul:pl-6",
            "prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-6",
            "prose-li:my-1 prose-li:text-foreground/90",
            // Images
            "prose-img:rounded-lg prose-img:border prose-img:border-border/40 prose-img:shadow-sm prose-img:my-8",
            "prose-hr:my-8 prose-hr:border-border/40",
            "select-text" // Ensure text selection works
        )}>
            <ReactMarkdown
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match && !String(children).includes('\n');

                        if (!isInline && match) {
                            return (
                                <CodeBlock
                                    language={match[1]}
                                    value={String(children).replace(/\n$/, '')}
                                    className="not-prose" // Prevent prose styles from interfering
                                />
                            );
                        }

                        // For code blocks without language specified, treat as text block
                        if (!isInline) {
                            return (
                                <CodeBlock
                                    language="text"
                                    value={String(children).replace(/\n$/, '')}
                                    className="not-prose"
                                />
                            );
                        }

                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
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
                    ref={normalScrollRef}
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
                            ref={scrollContainerRef}
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