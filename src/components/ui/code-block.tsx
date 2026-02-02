import { useState, useEffect } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    language: string;
    value: string;
    className?: string;
}

let highlighterPromise: Promise<Highlighter> | null = null;

const getHighlighter = () => {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['github-light', 'github-dark-dimmed'],
            langs: ['javascript', 'typescript', 'tsx', 'jsx', 'json', 'css', 'html', 'bash', 'python', 'java', 'sql', 'markdown'],
        });
    }
    return highlighterPromise;
};

export function CodeBlock({ language, value, className }: CodeBlockProps) {
    const [html, setHtml] = useState<string>("");
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const highlight = async () => {
            try {
                const highlighter = await getHighlighter();
                if (!mounted) return;

                const isDark = document.documentElement.classList.contains('dark');
                const theme = isDark ? 'github-dark-dimmed' : 'github-light';

                const highlighted = highlighter.codeToHtml(value, {
                    lang: language || 'text',
                    theme: theme
                });

                setHtml(highlighted);
                setIsLoading(false);
            } catch (error) {
                console.error("Shiki highlighting failed:", error);
                setHtml(`<pre><code>${value}</code></pre>`);
                setIsLoading(false);
            }
        };

        highlight();

        return () => {
            mounted = false;
        };
    }, [value, language]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className={cn(
            "group relative my-4 rounded-md bg-transparent dark:bg-muted/30 overflow-hidden",
            className
        )}>
            {/* Notion-style Floating Header: Visible on hover or always for language */}
            <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-gradient-to-b from-secondary/5 via-secondary/0 to-transparent">
                {/* Language Tag - Top Left */}
                <div className="text-xs text-muted-foreground/60 font-sans select-none px-2">
                    {language || 'Text'}
                </div>

                {/* Copy Button - Top Right */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground/60 hover:text-foreground hover:bg-background/50 rounded-sm"
                    onClick={handleCopy}
                    title="Copy code"
                >
                    {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                </Button>
            </div>

            {/* Content Area */}
            <div className="relative">
                {isLoading ? (
                    <div className="p-8 text-xs font-mono text-muted-foreground">
                        <pre>{value}</pre>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "text-sm font-mono leading-relaxed",
                            "[&>pre]:!bg-transparent [&>pre]:!p-8 [&>pre]:!m-0 [&>pre]:!overflow-auto",
                            "[&_code]:!font-mono [&_code]:!text-sm"
                        )}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </div>
        </div>
    );
}
