import type { Root as PageTreeRoot } from 'fumadocs-core/page-tree';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DocPage {
    slug: string[];
    url: string;
    title: string;
    description?: string;
    content: string;
    toc: { title: string; url: string; depth: number }[];
}

// ─── Vite glob import of all markdown files ──────────────────────────────────
// Each entry: key = relative path like "./getting-started/index.md", value = raw string

const rawFiles = import.meta.glob<string>('./../../content/docs/**/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
});

// ─── Frontmatter parser ───────────────────────────────────────────────────────

function parseFrontmatter(raw: string): {
    title: string;
    description?: string;
    content: string;
} {
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) return { title: 'Untitled', content: raw };

    const fm = fmMatch[1];
    const content = fmMatch[2].trim();

    const get = (key: string) => {
        const m = fm.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
        return m ? m[1].trim() : undefined;
    };

    return {
        title: get('title') ?? 'Untitled',
        description: get('description'),
        content,
    };
}

// ─── TOC extractor ────────────────────────────────────────────────────────────

function extractToc(content: string): { title: string; url: string; depth: number }[] {
    const toc: { title: string; url: string; depth: number }[] = [];
    const headingRe = /^(#{2,3})\s+(.+)$/gm;
    let m: RegExpExecArray | null;
    while ((m = headingRe.exec(content)) !== null) {
        const depth = m[1].length; // 2 or 3
        const title = m[2].trim();
        const url = '#' + title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        toc.push({ title, url, depth });
    }
    return toc;
}

// ─── Slug builder from file path ─────────────────────────────────────────────
// e.g. "./../../content/docs/getting-started/index.md" → ['getting-started']
//      "./../../content/docs/index.md"                 → []
//      "./../../content/docs/api/endpoints.md"         → ['api', 'endpoints']

function pathToSlug(path: string): string[] {
    // Strip prefix up to /docs/ and .md extension
    const rel = path.replace(/^.*\/content\/docs\//, '').replace(/\.md$/, '');
    const parts = rel.split('/').filter(Boolean);

    // If last segment is "index", drop it (folder index pages)
    if (parts[parts.length - 1] === 'index') parts.pop();

    return parts;
}

// ─── Build pages array ────────────────────────────────────────────────────────

const pages: DocPage[] = Object.entries(rawFiles).map(([filePath, raw]) => {
    const slug = pathToSlug(filePath);
    const url = slug.length === 0 ? '/docs' : '/docs/' + slug.join('/');
    const { title, description, content } = parseFrontmatter(raw as string);
    const toc = extractToc(content);
    return { slug, url, title, description, content, toc };
});

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getPage(slugs: string[]): DocPage | undefined {
    const key = slugs.join('/');
    return pages.find((p) => p.slug.join('/') === key);
}

export function getAllPages(): DocPage[] {
    return pages;
}

// ─── Sidebar Page Tree ────────────────────────────────────────────────────────

export const pageTree: PageTreeRoot = {
    name: 'Documentation',
    children: [
        {
            type: 'page',
            name: 'Introduction',
            url: '/docs',
        },
        {
            type: 'folder',
            name: 'Getting Started',
            children: [
                {
                    type: 'page',
                    name: 'Getting Started',
                    url: '/docs/getting-started',
                },
                {
                    type: 'page',
                    name: 'Configuration',
                    url: '/docs/getting-started/configuration',
                },
            ],
        },
        {
            type: 'folder',
            name: 'Study Materials',
            children: [
                {
                    type: 'page',
                    name: 'Overview',
                    url: '/docs/study-materials',
                },
                {
                    type: 'page',
                    name: 'Uploading Content',
                    url: '/docs/study-materials/uploading',
                },
                {
                    type: 'page',
                    name: 'Content Types',
                    url: '/docs/study-materials/content-types',
                },
            ],
        },
        {
            type: 'page',
            name: 'Syllabus',
            url: '/docs/syllabus',
        },
        {
            type: 'folder',
            name: 'Admin',
            children: [
                {
                    type: 'page',
                    name: 'Admin Guide',
                    url: '/docs/admin',
                },
                {
                    type: 'page',
                    name: 'Content Approval',
                    url: '/docs/admin/approvals',
                },
                {
                    type: 'page',
                    name: 'User Management',
                    url: '/docs/admin/users',
                },
            ],
        },
        {
            type: 'folder',
            name: 'API Reference',
            children: [
                {
                    type: 'page',
                    name: 'API Overview',
                    url: '/docs/api',
                },
                {
                    type: 'page',
                    name: 'Endpoints',
                    url: '/docs/api/endpoints',
                },
            ],
        },
    ],
};
