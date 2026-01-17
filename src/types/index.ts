export interface University {
    name: string;
    courses: Course[];
}

export interface Course {
    id: string;
    name: string;
    shortName: string; // e.g., "BCA", "B.Sc"
    semesters: Semester[];
}

export interface Semester {
    id: string;
    name: string; // e.g., "Semester 1", "Sem 1"
    subjects: Subject[];
}

export interface Subject {
    id: string;
    code: string; // e.g., "BCA-101"
    name: string;
    units: Unit[];
    previousYearQuestions: QuestionPaper[];
    videos: VideoResource[];
    syllabus?: string[]; // List of topics
    syllabusPdf?: string; // Link to official syllabus PDF
    revisionNotes?: string; // Markdown content for last-minute revision
}

export interface Unit {
    id: string;
    number: number;
    title: string;
    content: string; // Markdown or HTML content for notes
    importantQuestions?: string[];
}

export interface QuestionPaper {
    id: string;
    year: string;
    season: 'Summer' | 'Winter';
    link?: string; // PDF Link
    text?: string; // If explicit text is available
}

export interface VideoResource {
    id: string;
    title: string;
    url: string; // YouTube ID or URL
    duration?: string;
}

export interface BreadcrumbItem {
    label: string;
    path: string;
}
