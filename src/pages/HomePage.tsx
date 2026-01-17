
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockData';
import { ChevronRight, Clock, BookOpen, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';
import PageTransition from '../components/PageTransition';

export default function HomePage() {
    const { history } = useUser();

    return (
        <PageTransition className="space-y-8">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="text-center py-20 md:py-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">
                    {/* Top Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-sm text-xs font-medium text-slate-600 dark:text-slate-400 mb-4">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                        Review. Revise. Excel.
                    </div>

                    {/* Image integrated into Eyebrow/Sub-heading style as per reference */}
                    <div className="flex items-center justify-center gap-3 mb-4 text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300">
                        <span>The Ultimate</span>
                        <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-white dark:border-[#121212] shadow-lg overflow-hidden group">
                            <img
                                src="/hero-student.jpg"
                                alt="Student"
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <span>Learning Platform</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-none">
                        Master Your Academics
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Access university notes, question papers, and video lectures in one place.
                    </p>

                    <div className="w-full max-w-2xl relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-slate-200 dark:from-slate-800 dark:to-slate-800 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search courses, topics..."
                                className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700 shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Course List */}
            <section>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Your Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockCourses.map((course) => (
                        <Link
                            key={course.id}
                            to={`/course/${course.id}`}
                            className="group block bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-200 dark:border-white/5 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {course.shortName}
                                    </h3>
                                    <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">{course.name}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 rounded-md font-medium">
                                    {course.semesters.length} Semesters
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent History */}
            {history.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500 dark:text-zinc-500" />
                        Recently Viewed
                    </h2>
                    <div className="bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                        {history.map((item, i) => (
                            <Link key={i} to={item.path} className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex justify-between items-center group">
                                <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">{item.title}</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-indigo-400" />
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </PageTransition>
    );
}
