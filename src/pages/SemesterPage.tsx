import { useParams, Link } from 'react-router-dom';
import { getCourse } from '../data/mockData';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { BookOpen, AlertCircle } from 'lucide-react';

export default function SemesterPage() {
    const { courseId, semesterId } = useParams();
    const course = getCourse(courseId || '');
    const semester = course?.semesters.find(s => s.id === semesterId);

    if (!course || !semester) return <NotFoundPage />;

    return (
        <div>
            <Breadcrumbs />
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-slate-400 dark:text-slate-500 font-normal">{course.shortName} /</span> {semester.name}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Select a subject to view notes and resources</p>
            </header>

            {semester.subjects.length === 0 ? (
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-xl p-6 flex flex-col items-center text-center">
                    <AlertCircle className="w-10 h-10 text-amber-500 mb-3" />
                    <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">No subjects found</h3>
                    <p className="text-amber-700 dark:text-amber-300 max-w-sm mt-1">Content for this semester hasn't been added yet. Check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {semester.subjects.map(subject => (
                        <Link
                            key={subject.id}
                            to={`/course/${course.id}/sem/${semester.id}/subject/${subject.id}`}
                            className="block bg-white dark:bg-dark-card border border-slate-200 dark:border-zinc-800 rounded-xl p-5 hover:border-indigo-500 dark:hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition-all"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 rounded">
                                    {subject.code}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{subject.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-3">
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" /> {subject.units.length} Units
                                </span>
                                {/* Highlights if any */}
                                {subject.previousYearQuestions.length > 0 && (
                                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                                        PYQs Available
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
