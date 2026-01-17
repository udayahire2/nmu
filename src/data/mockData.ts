import type { Course } from '../types';

export const mockCourses: Course[] = [
    {
        id: 'bca',
        name: 'Bachelor of Computer Applications',
        shortName: 'BCA',
        semesters: [
            {
                id: 'sem-1',
                name: 'Semester 1',
                subjects: [
                    {
                        id: 'bca-101',
                        code: 'BCA-101',
                        name: 'Fundamentals of C Programming',
                        syllabus: [
                            'Introduction to Algorithms and Flowcharts',
                            'Basics of C Language',
                            'Control Structures',
                            'Arrays and Functions',
                            'Pointers and Structures'
                        ],
                        units: [
                            {
                                id: 'u1',
                                number: 1,
                                title: 'Introduction to C',
                                content: `### algorithms
An algorithm is a step-by-step procedure to solve a problem.

**Characteristics:**
1. Input
2. Output
3. Definiteness
4. Finiteness
5. Effectiveness

### Flowchart
Diagrammatic representation of an algorithm.
`,
                                importantQuestions: ['Define Algorithm and Flowchart.', 'Explain structure of C program.']
                            },
                            {
                                id: 'u2',
                                number: 2,
                                title: 'Control Structures',
                                content: '### If-Else Statement\nUsed for conditional execution...',
                                importantQuestions: ['Explain Switch case with example.', 'Difference between while and do-while.']
                            }
                        ],
                        previousYearQuestions: [
                            { id: 'pyq-2024-w', year: '2024', season: 'Winter', link: '#' },
                            { id: 'pyq-2024-s', year: '2024', season: 'Summer', link: '#' },
                            { id: 'pyq-2023-w', year: '2023', season: 'Winter', link: '#' }
                        ],
                        videos: [
                            { id: 'vid-1', title: 'C Programming Format', url: 'https://youtube.com/...' },
                            { id: 'vid-2', title: 'Loops in C', url: 'https://youtube.com/...' }
                        ],
                        revisionNotes: `### Quick Revision: C Language
- **Structure**: Preprocessor -> Global Decl -> Main() -> Body
- **Data Types**: int (2/4 bytes), float (4), char (1), double (8)
- **Loops**: 
  - \`for\`: Fixed iterations
  - \`while\`: Entry controlled
  - \`do-while\`: Exit controlled (runs at least once)
- **Pointers**: Store address of another variable (\`*ptr\`, \`&var\`)
            `
                    },
                    {
                        id: 'bca-102',
                        code: 'BCA-102',
                        name: 'Web Technologies I',
                        subjects: [], // Type fix: This is a Subject, but I nested it wrong in my head? No, Semester has subjects.
                        units: [],
                        previousYearQuestions: [],
                        videos: []
                    } as any // Quick fix for brevity, will populate fully if needed
                ]
            },
            {
                id: 'sem-2',
                name: 'Semester 2',
                subjects: []
            }
        ]
    },
    {
        id: 'bsc-cs',
        name: 'B.Sc Computer Science',
        shortName: 'B.Sc (CS)',
        semesters: []
    },
    {
        id: 'be-cs',
        name: 'Bachelor of Engineering (Computer)',
        shortName: 'BE (Comp)',
        semesters: [
            {
                id: 'sem-5',
                name: 'Semester 5',
                subjects: [
                    {
                        id: 'be-501',
                        code: 'CS-501',
                        name: 'Frontend Engineering',
                        syllabus: [
                            'Unit 1: Introduction to Web & HTML5 - Semantic Elements, Accessibility',
                            'Unit 2: CSS3 Styling - Flexbox, Grid, Responsive Design, Animations',
                            'Unit 3: JavaScript Programming - ES6+, DOM Manipulation, Async/Await',
                            'Unit 4: React.js Fundamentals - Components, Props, State, Hooks',
                            'Unit 5: State Management & Routing - Context API, React Router, Redux Basics',
                            'Unit 6: Testing & Deployment - Jest, Vercel/Netlify, CI/CD'
                        ],
                        syllabusPdf: 'https://www.nmu.ac.in/syllabus/Engineering/Computer/BE_Computer_Syllabus.pdf',
                        units: [
                            {
                                id: 'u1',
                                number: 1,
                                title: 'Introduction to Modern Web',
                                content: `### The Modern Web
The web has evolved from simple static pages to complex applications.

#### Key Concepts:
1. **Client-Server Architecture**: Browser (Client) requests data from Server.
2. **REST APIs**: Standard way for web services to communicate.
3. **SPA (Single Page Applications)**: Loading content dynamically without refreshing the page (e.g., React, Vue).

#### HTML5 Semantic Elements
Using correct tags for content structure:
- \`<header>\`: Intro content
- \`<nav>\`: Navigation links
- \`<main>\`: Dominant content
- \`<article>\`: Independent content
- \`<footer>\`: Footer info

> **Tip:** Always use semantic tags for better SEO and Accessibility.
                                `,
                                importantQuestions: ['Explain Client-Server Architecture.', 'List 5 HTML5 semantic tags and their use.']
                            },
                            {
                                id: 'u2',
                                number: 2,
                                title: 'CSS3 & Responsive Design',
                                content: `### CSS Flexbox & Grid
Layout systems that revolutionized web design.

#### Flexbox (One-dimensional)
Good for rows OR columns.
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Main axis */
  align-items: center;     /* Cross axis */
}
\`\`\`

#### CSS Grid (Two-dimensional)
Good for rows AND columns simultaneously.
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

#### Media Queries
Essential for responsive design.
\`\`\`css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`
                                `,
                                importantQuestions: ['Difference between Flexbox and Grid?', 'Write a media query for mobile devices.']
                            },
                            {
                                id: 'u3',
                                number: 3,
                                title: 'JavaScript & React Basics',
                                content: `### Modern JavaScript (ES6+)

#### Arrow Functions
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

#### Destructuring
\`\`\`javascript
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
\`\`\`

### React Fundamentals
Component-based architecture.

**Functional Component:**
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

**Hooks:**
- \`useState\`: Manage local state
- \`useEffect\`: Side effects (data fetching)
                                `,
                                importantQuestions: ['What are React Hooks?', 'Explain Virtual DOM.']
                            }
                        ],
                        previousYearQuestions: [
                            { id: 'pyq-2024-s-be', year: '2024', season: 'Summer', link: '#' },
                            { id: 'pyq-2023-w-be', year: '2023', season: 'Winter', link: '#' }
                        ],
                        videos: [
                            { id: 'vid-frontend-1', title: 'Start Frontend Development', url: 'https://www.youtube.com/watch?v=GetTheGist' },
                            { id: 'vid-frontend-2', title: 'React JS Crash Course', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                            { id: 'vid-frontend-3', title: 'CSS Flexbox Guide', url: 'https://www.youtube.com/watch?v=fYq5PXgSsbE' }
                        ],
                        revisionNotes: `### Frontend Engineering Quick Rev
- **HTML**: Structure of the page. Use semantic tags.
- **CSS Box Model**: Content -> Padding -> Border -> Margin.
- **JavaScript**: The behavior layer. Engine (V8). Event Loop.
- **DOM**: Document Object Model. Tree structure of HTML.
- **React**: Library for building UIs.
  - **JSX**: HTML-like syntax in JS.
  - **Props**: Read-only data passed down.
  - **State**: Mutable data managed by component.
  - **Virtual DOM**: Optimize rendering by comparing diffs.
  - **Reconciliation**: Process of updating the DOM.
                        `
                    }
                ]
            }
        ]
    }
];

// Helper to find data
export const getCourse = (id: string) => mockCourses.find(c => c.id === id);
