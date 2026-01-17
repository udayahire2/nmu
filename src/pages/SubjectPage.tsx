import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getCourse } from '../data/mockData';
import type { Subject } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { BookOpen, FileText, Video, ChevronRight, Bookmark, ScrollText } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUser } from '../context/UserContext';

type Tab = 'notes' | 'papers' | 'videos' | 'revision' | 'syllabus';

export default function SubjectPage() {
    const { courseId, semesterId, subjectId } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<Tab>('notes');
    const { toggleBookmark, isBookmarked } = useUser();

    const course = getCourse(courseId || '');
    const semester = course?.semesters.find(s => s.id === semesterId);
    const subject = semester?.subjects.find(s => s.id === subjectId) as Subject | undefined;

    if (!subject) return <NotFoundPage />;

    const isSubjectBookmarked = isBookmarked(subject.id);

    return (
        <div>
            <Breadcrumbs />

            {/* Header */}
            <header className="mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded mb-2 inline-block">
                            {subject.code}
                        </span>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{subject.name}</h1>
                    </div>
                    <button
                        onClick={() => toggleBookmark({ id: subject.id, type: 'subject', title: subject.name, path: location.pathname })}
                        className={cn("p-2 rounded-full transition-colors", isSubjectBookmarked ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}
                    >
                        <Bookmark className={cn("w-5 h-5", isSubjectBookmarked && "fill-current")} />
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-zinc-800 mb-6 overflow-x-auto">
                <TabButton active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} icon={BookOpen}>Notes</TabButton>
                <TabButton active={activeTab === 'syllabus'} onClick={() => setActiveTab('syllabus')} icon={ScrollText}>Syllabus</TabButton>
                <TabButton active={activeTab === 'papers'} onClick={() => setActiveTab('papers')} icon={FileText}>Papers</TabButton>
                <TabButton active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} icon={Video}>Videos</TabButton>
                <TabButton active={activeTab === 'revision'} onClick={() => setActiveTab('revision')} icon={Bookmark}>Quick Rev</TabButton>
            </div>

            {/* Content */}
            <div className="min-h-[300px]">
                {activeTab === 'notes' && (
                    <div className="space-y-3">
                        {subject.units.map(unit => (
                            <Link
                                key={unit.id}
                                to={`unit/${unit.id}`}
                                className="block bg-white dark:bg-dark-card border border-slate-200 dark:border-zinc-800 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-sm transition-all group"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1 block">Unit {unit.number}</span>
                                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">{unit.title}</h3>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                                </div>
                            </Link>
                        ))}
                        {subject.units.length === 0 && <EmptyState message="No notes available yet." />}
                    </div>
                )}

                {activeTab === 'syllabus' && (
                    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-zinc-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Detailed Syllabus</h3>
                            {subject.syllabusPdf && (
                                <a href={subject.syllabusPdf} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                    <FileText className="w-4 h-4" />
                                    Download PDF
                                </a>
                            )}
                        </div>
                        {subject.syllabus && subject.syllabus.length > 0 ? (
                            <ul className="space-y-3">
                                {subject.syllabus.map((topic, i) => (
                                    <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="min-w-[24px] h-[24px] rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center mt-0.5">
                                            {i + 1}
                                        </div>
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="Syllabus not available." />
                        )}
                    </div>
                )}

                {activeTab === 'papers' && (
                    <div className="space-y-3">
                        {subject.previousYearQuestions.map(qp => (
                            <a
                                key={qp.id}
                                href={qp.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-500 hover:bg-slate-50 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                        <span className="text-xs font-bold">PDF</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-800">{qp.season} {qp.year}</h3>
                                        <p className="text-xs text-slate-500">Question Paper</p>
                                    </div>
                                </div>
                                <FileText className="w-5 h-5 text-slate-400" />
                            </a>
                        ))}
                        {subject.previousYearQuestions.length === 0 && <EmptyState message="No previous year papers found." />}
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div className="space-y-3">
                        {subject.videos.map(vid => (
                            <a
                                key={vid.id}
                                href={vid.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-500 hover:bg-slate-50 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                        <Video className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-800">{vid.title}</h3>
                                        <p className="text-xs text-slate-500">Video Reference</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                        {subject.videos.length === 0 && <EmptyState message="No video references available." />}
                    </div>
                )}

                {activeTab === 'revision' && (
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-dark-card border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-6 md:p-8">
                        <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">Last-Minute Quick Revision</h3>
                        {subject.revisionNotes ? (
                            <div className="prose prose-indigo prose-sm max-w-none dark:prose-invert">
                                {/* Simple pre-wrap render or we could use Markdown component if imported */}
                                <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300">{subject.revisionNotes}</pre>
                            </div>
                        ) : (
                            <EmptyState message="No revision notes added yet." />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, children }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                active ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    )
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500 italic">
            {message}
        </div>
    )
}
