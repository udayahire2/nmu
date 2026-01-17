import { useParams, Link } from 'react-router-dom';
import { getCourse } from '../data/mockData';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import { Layers, ChevronRight } from 'lucide-react';

export default function CoursePage() {
    const { courseId } = useParams();
    const course = getCourse(courseId || '');

    if (!course) return <NotFoundPage />;

    return (
        <div>
            <Breadcrumbs />
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{course.name}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg mt-2">Select your semester to continue</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.semesters.map((sem) => (
                    <Link
                        key={sem.id}
                        to={`/course/${course.id}/sem/${sem.id}`}
                        className="group bg-white dark:bg-dark-card rounded-xl p-6 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between h-40"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{sem.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{sem.subjects.length} Subjects</p>
                        </div>

                        <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                            <ChevronRight className="w-5 h-5 text-indigo-500" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
