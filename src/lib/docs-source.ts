import type { Root as PageTreeRoot } from 'fumadocs-core/page-tree';


export interface DocPage {
    slug: string[];
    url: string;
    title: string;
    description?: string;
    content: string;
    toc: { title: string; url: string; depth: number }[];
}

// ─── Dummy Documentation Content ────────────────────────────────────────────

const pages: DocPage[] = [
    {
        slug: [],
        url: '/docs',
        title: 'Introduction',
        description: 'Welcome to the documentation — your complete guide to getting started.',
        toc: [
            { title: 'Overview', url: '#overview', depth: 2 },
            { title: 'Key Features', url: '#key-features', depth: 2 },
            { title: 'Prerequisites', url: '#prerequisites', depth: 2 },
        ],
        content: `
## Overview

Welcome to **UDX Docs** — the official documentation for the UDX platform. This guide covers everything you need to know to build, manage, and deploy your projects.

Whether you're a student exploring study materials or an admin managing resources, this documentation has you covered.

## Key Features

- 📚 **Study Materials** — Browse notes, PDFs, and video lectures organized by branch, semester, and subject.
- 🗂️ **Syllabus Management** — View and manage semester syllabi with structured topic trees.
- 👥 **Role-Based Access** — Distinct dashboards for students, faculty, and administrators.
- 🔍 **Smart Search** — Full-text search across all documentation and resources.
- 🌙 **Dark Mode** — Beautiful dark and light themes out of the box.

## Prerequisites

Before you get started, make sure you have:

- Node.js \`18+\` installed
- A Supabase account and project configured
- Basic knowledge of React and TypeScript
    `,
    },
    {
        slug: ['getting-started'],
        url: '/docs/getting-started',
        title: 'Getting Started',
        description: 'Set up the project and run it locally in minutes.',
        toc: [
            { title: 'Installation', url: '#installation', depth: 2 },
            { title: 'Environment Variables', url: '#environment-variables', depth: 2 },
            { title: 'Running Locally', url: '#running-locally', depth: 2 },
        ],
        content: `
## Installation

Clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/your-org/udx.git
cd udx/app
npm install
\`\`\`

## Environment Variables

Create a \`.env\` file in the \`app/\` directory:

\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

You can find these values in your [Supabase project settings](https://supabase.com/dashboard).

## Running Locally

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The app will be available at \`http://localhost:5173\`.
    `,
    },
    {
        slug: ['getting-started', 'configuration'],
        url: '/docs/getting-started/configuration',
        title: 'Configuration',
        description: 'Customize the platform to fit your institution.',
        toc: [
            { title: 'Theme', url: '#theme', depth: 2 },
            { title: 'Branches & Semesters', url: '#branches-semesters', depth: 2 },
        ],
        content: `
## Theme

The app supports light, dark, and system themes. Themes are stored in \`localStorage\` under the key \`vite-ui-theme\`.

You can customize colors by editing \`src/index.css\`. The design system uses CSS custom properties:

\`\`\`css
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --radius: 0.75rem;
}
\`\`\`

## Branches & Semesters

Branches and semesters are fetched dynamically from Supabase. To add a new branch, insert a row into the \`branches\` table:

| Column     | Type   | Description             |
|------------|--------|-------------------------|
| \`id\`       | uuid   | Primary key             |
| \`name\`     | text   | e.g. "Computer Science" |
| \`short\`    | text   | e.g. "CS"               |
    `,
    },
    {
        slug: ['study-materials'],
        url: '/docs/study-materials',
        title: 'Study Materials',
        description: 'How study materials are organized, uploaded, and managed.',
        toc: [
            { title: 'Structure', url: '#structure', depth: 2 },
            { title: 'Uploading Content', url: '#uploading-content', depth: 2 },
            { title: 'Content Types', url: '#content-types', depth: 2 },
        ],
        content: `
## Structure

Study materials are organized in a three-level hierarchy:

\`\`\`
Branch → Semester → Subject → Topics
\`\`\`

Each **topic** can have multiple attached resources (PDFs, videos, notes).

## Uploading Content

Faculty members can upload study materials via the **Faculty Dashboard**:

1. Navigate to \`/dashboard/faculty\`
2. Select a subject
3. Click **Upload Resource**
4. Fill in the title, description, and file
5. Submit for admin approval

## Content Types

| Type    | Icon | Description              |
|---------|------|--------------------------|
| PDF     | 📄   | Lecture notes and slides |
| Video   | 🎬   | Recorded lectures        |
| Notes   | 📝   | Text-based notes         |
| Link    | 🔗   | External resources       |
    `,
    },
    {
        slug: ['api-reference'],
        url: '/docs/api-reference',
        title: 'API Reference',
        description: 'REST API endpoints for the UDX backend.',
        toc: [
            { title: 'Authentication', url: '#authentication', depth: 2 },
            { title: 'Resources', url: '#resources', depth: 2 },
            { title: 'Syllabus', url: '#syllabus', depth: 2 },
        ],
        content: `
## Authentication

All API requests require a valid JWT token in the \`Authorization\` header:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

Tokens are issued by Supabase Auth on login.

## Resources

### GET /api/resources

Returns all approved study materials.

**Query Parameters:**

| Param      | Type   | Required | Description           |
|------------|--------|----------|-----------------------|
| \`branch\`   | string | No       | Filter by branch      |
| \`semester\` | string | No       | Filter by semester    |
| \`subject\`  | string | No       | Filter by subject ID  |

### POST /api/resources

Upload a new resource. Requires \`faculty\` or \`admin\` role.

## Syllabus

### GET /api/syllabus/:branch/:semester

Returns the full syllabus tree for a branch and semester.
    `,
    },
    {
        slug: ['fumadocs-setup'],
        url: '/docs/fumadocs-setup',
        title: 'Fumadocs Setup',
        description: 'How we integrated Fumadocs into this Vite project.',
        toc: [
            { title: 'Overview', url: '#overview', depth: 2 },
            { title: 'Vite Integration', url: '#vite-integration', depth: 2 },
            { title: 'Custom Components', url: '#custom-components', depth: 2 },
        ],
        content: `
## Overview

This project uses **Fumadocs** to provide a premium documentation experience. While Fumadocs is typically used with Next.js, we have adapted it for a pure **Vite + React Router** environment.

<callout title="Why Manual Source?" type="idea">
This setup uses a manual "in-memory" source system instead of the Next.js filesystem-based routing. This ensures maximum performance and compatibility with your current React Router architecture while keeping the premium Fumadocs UI.
</callout>

## Installation Steps

<steps>
<step>
### Install Dependencies
First, install the core Fumadocs packages along with \`rehype-raw\` for rich component parsing:
\`\`\`bash
npm install fumadocs-core fumadocs-ui rehype-raw
\`\`\`
</step>
<step>
### Configure Router
Create a \`GlobalLayout\` in \`router.tsx\` to host the \`RootProvider\` so that theme and search contexts are available throughout the app.
</step>
<step>
### Map Components
Use \`react-markdown\` with \`rehype-raw\` to map custom HTML tags to the official \`fumadocs-ui\` React components inside your \`DocsPageRoute.tsx\`.
</step>
</steps>

## Explore Components

We use custom tags to render these premium components directly from markdown:

<cards>
  <card title="Callouts" href="#overview" description="Highlight important information using the <callout> tag." />
  <card title="Steps" href="#installation-steps" description="Create beautiful step-by-step guides using <steps> and <step> tags." />
  <card title="Cards" href="#explore-components" description="Display related links in a neat grid format using <cards> and <card>." />
</cards>
        `,
    },
    {
        slug: ['admin'],
        url: '/docs/admin',
        title: 'Admin Guide',
        description: 'Managing users, content, and platform settings.',
        toc: [
            { title: 'Dashboard', url: '#dashboard', depth: 2 },
            { title: 'Content Approval', url: '#content-approval', depth: 2 },
            { title: 'User Management', url: '#user-management', depth: 2 },
        ],
        content: `
## Dashboard

The admin dashboard at \`/admin/dashboard\` gives you a bird's-eye view of platform activity:

- Total students enrolled
- Pending content approvals
- Recent uploads
- Active faculty members

## Content Approval

Faculty-uploaded resources are held in a **pending** state until an admin approves them. Navigate to \`/admin/approvals\` to review submissions.

**Approval workflow:**

1. Faculty submits a resource
2. Admin receives a notification
3. Admin reviews and **Approves** or **Rejects**
4. Approved content becomes visible to students

## User Management

Manage students and faculty at \`/admin/students\` and \`/admin/faculty\`:

- View all registered users
- Assign or revoke roles
- Suspend accounts
- Export user data as CSV
    `,
    },
];

// ─── Lookup Helpers ──────────────────────────────────────────────────────────

export function getPage(slugs: string[]): DocPage | undefined {
    const key = slugs.join('/');
    return pages.find((p) => p.slug.join('/') === key);
}

export function getAllPages(): DocPage[] {
    return pages;
}

// ─── Page Tree ───────────────────────────────────────────────────────────────

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
            type: 'page',
            name: 'Study Materials',
            url: '/docs/study-materials',
        },
        {
            type: 'folder',
            name: 'Reference',
            children: [
                {
                    type: 'page',
                    name: 'API Reference',
                    url: '/docs/api-reference',
                },
                {
                    type: 'page',
                    name: 'Fumadocs Setup',
                    url: '/docs/fumadocs-setup',
                },
                {
                    type: 'page',
                    name: 'Admin Guide',
                    url: '/docs/admin',
                },
            ],
        },
    ],
};
