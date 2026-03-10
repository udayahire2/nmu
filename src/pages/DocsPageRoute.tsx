import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
    DocsPage,
    DocsBody,
    DocsTitle,
    DocsDescription,
} from 'fumadocs-ui/layouts/docs/page';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { pageTree, getPage } from '@/lib/docs-source';

// Rehype-like code handling via react-markdown components
function CodeBlock({ className, children }: { className?: string; children?: React.ReactNode }) {
    const lang = className?.replace('language-', '') ?? '';
    return (
        <pre className="relative overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
            {lang && (
                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground uppercase tracking-wider font-mono">
                    {lang}
                </span>
            )}
            <code className={className}>{children}</code>
        </pre>
    );
}

function InlineCode({ children }: { children?: React.ReactNode }) {
    return (
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
            {children}
        </code>
    );
}

export default function DocsPageRoute() {
    const params = useParams<{ '*': string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Parse slugs from wildcard
    const slugs = (params['*'] ?? '').split('/').filter(Boolean);
    const page = getPage(slugs);

    useEffect(() => {
        if (mounted && !page) {
            navigate('/docs', { replace: true });
        }
    }, [page, mounted, navigate]);

    if (!page) return null;

    const markdownComponents: Components = {
        // Custom MDX-like components used in docs content
        callout({ children, title, type, icon, ...props }: any) {
            return (
                <Callout title={title as string} type={type as any} icon={icon as string} {...props}>
                    {children}
                </Callout>
            );
        },
        cards({ children, ...props }: any) {
            return <Cards {...props}>{children}</Cards>;
        },
        card({ children, title, href, icon, ...props }: any) {
            return (
                <Card title={title as string} href={href as string} icon={icon as React.ReactNode} {...props}>
                    {children}
                </Card>
            );
        },
        steps({ children, ...props }: any) {
            return <Steps {...props}>{children}</Steps>;
        },
        step({ children, ...props }: any) {
            return <Step {...props}>{children}</Step>;
        },
        tabs({ children, items, ...props }: any) {
            // Simple mapping for docs, assuming items is a comma-separated string if passed as prop
            const parsedItems = typeof items === 'string' ? items.split(',') : (items as string[] || []);
            return <Tabs items={parsedItems} {...props}>{children}</Tabs>;
        },
        tab({ children, value, ...props }: any) {
            return <Tab value={value as string} {...props}>{children}</Tab>;
        },

        // Standard Markdown Mappings
        code({ className, children, ...rest }) {
            // Block code: parent will be <pre>
            const isBlock = className?.startsWith('language-');
            if (isBlock) {
                return <CodeBlock className={className}>{children}</CodeBlock>;
            }
            return <InlineCode {...rest}>{children}</InlineCode>;
        },
        pre({ children }) {
            // Prevent double-wrapping; our CodeBlock already has <pre>
            return <>{children}</>;
        },
        table({ children }) {
            return (
                <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card/50 shadow-sm">
                    <table className="w-full text-sm border-collapse">{children}</table>
                </div>
            );
        },
        th({ children }) {
            return (
                <th className="border-b border-border bg-muted/30 px-4 py-3 text-left font-semibold text-foreground first:rounded-tl-xl last:rounded-tr-xl">
                    {children}
                </th>
            );
        },
        td({ children }) {
            return (
                <td className="border-b border-border px-4 py-3 text-muted-foreground last:border-b-0">
                    {children}
                </td>
            );
        },
        blockquote({ children }) {
            return (
                <blockquote className="my-6 border-l-4 border-primary bg-primary/10 px-6 py-4 italic text-foreground rounded-r-lg">
                    {children}
                </blockquote>
            );
        },
        h2({ children }) {
            return <h2 className="mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0">{children}</h2>;
        },
        h3({ children }) {
            return <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground">{children}</h3>;
        },
        p({ children }) {
            return <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">{children}</p>;
        },
        ul({ children }) {
            return <ul className="my-6 ml-6 list-disc text-muted-foreground [&>li]:mt-2">{children}</ul>;
        },
        li({ children }) {
            return <li>{children}</li>;
        },
        a({ href, children }) {
            return (
                <a href={href} className="font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors">
                    {children}
                </a>
            );
        }
    } as Components & Record<string, any>;

    return (
        <DocsLayout
            tree={pageTree}
            nav={{
                title: (
                    <span className="flex items-center gap-2 font-semibold">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        UDX Docs
                    </span>
                ),
            }}
            sidebar={{
                defaultOpenLevel: 1,
                collapsible: true,
                banner: (
                    <div className="flex flex-col gap-2 p-1">
                        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2 px-3 text-xs font-medium text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            v1.0.0-beta
                        </div>
                    </div>
                ),
                footer: (
                    <div className="flex flex-col gap-2 p-1">
                        <a
                            href="https://github.com/your-org/udx"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-lg p-2 px-3 text-xs font-medium text-muted-foreground hover:bg-muted"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            GitHub Repository
                        </a>
                    </div>
                )
            }}
        >
            <DocsPage
                key={location.pathname}
                toc={page.toc.map((item) => ({
                    title: item.title,
                    url: item.url,
                    depth: item.depth,
                }))}
                tableOfContent={{ enabled: true }}
                breadcrumb={{ enabled: true }}
            >
                <DocsTitle>{page.title}</DocsTitle>
                {page.description && (
                    <DocsDescription>{page.description}</DocsDescription>
                )}
                <DocsBody>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={markdownComponents}
                    >
                        {page.content.trim()}
                    </ReactMarkdown>
                </DocsBody>
            </DocsPage>
        </DocsLayout>
    );
}
