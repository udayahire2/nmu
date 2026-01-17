import { useParams, useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { getCourse } from '../data/mockData';
import type { Subject } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import { Bookmark, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export default function UnitViewerPage() {
    const { courseId, semesterId, subjectId, unitId } = useParams();
    const location = useLocation();
    const { addToHistory, toggleBookmark, isBookmarked } = useUser();

    const course = getCourse(courseId || '');
    const semester = course?.semesters.find(s => s.id === semesterId);
    const subject = semester?.subjects.find(s => s.id === subjectId) as Subject | undefined;
    const unit = subject?.units.find(u => u.id === unitId);

    useEffect(() => {
        if (unit && subject) {
            addToHistory({
                title: `${unit.title} - ${subject.name}`,
                path: location.pathname
            });
        }
    }, [unit?.id]);

    if (!unit) return <NotFoundPage />;

    const isUnitBookmarked = isBookmarked(unit.id);

    return (
        <div className="max-w-3xl mx-auto">
            <Breadcrumbs />

            <article className="bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-zinc-800 p-6 flex justify-between items-start bg-slate-50/50 dark:bg-dark-app/50">
                    <div>
                        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">Unit {unit.number}</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">{unit.title}</h1>
                    </div>
                    <button
                        onClick={() => toggleBookmark({ id: unit.id, type: 'unit', title: unit.title, path: location.pathname })}
                        className={cn("p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors", isUnitBookmarked ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500")}
                        title="Bookmark Unit"
                    >
                        <Bookmark className={cn("w-6 h-6", isUnitBookmarked && "fill-current")} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 prose prose-slate prose-indigo dark:prose-invert max-w-none">
                    <Markdown>{unit.content}</Markdown>
                </div>

                {/* Important Questions */}
                {unit.importantQuestions && unit.importantQuestions.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border-t border-yellow-100 dark:border-yellow-900/20 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 fill-current" />
                            Important Questions / Exam Corner
                        </h3>
                        <ul className="space-y-2">
                            {unit.importantQuestions.map((q, i) => (
                                <li key={i} className="flex gap-3 text-yellow-900 dark:text-yellow-100">
                                    <span className="font-mono font-bold opacity-60">Q{i + 1}.</span>
                                    <span>{q}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </article>

            {/* Navigation Footer (Next/Prev could act here) */}
            <div className="mt-8 flex justify-between text-sm text-slate-500 px-2">
                {/* Placeholder for Next/Prev Unit logic if needed */}
            </div>
        </div>
    );
}
