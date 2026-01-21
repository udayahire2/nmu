
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockData';
import { ChevronRight, Clock, BookOpen, Search, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import PageTransition from '../components/PageTransition';

export default function HomePage() {
    const { history } = useUser();

    return (
        <PageTransition className="space-y-8">
            {/* Hero Section */}
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative pt-16 pb-32 md:pt-24 md:pb-48 overflow-hidden">
                {/* Background: Geometric Grid Pattern */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#0a0a0a] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] opacity-60"></div>

                {/* Background Decor: Subtle Gradient Mesh */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent -z-20 pointer-events-none" />

                <div className=" relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
                    {/* Eyebrow Pill */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 ease-out mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-default">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Review. Revise. Excel.
                            </span>
                        </div>
                    </div>

                    {/* Main Title with Integrated Image */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 ease-out">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
                            The Ultimate
                            <span className="inline-flex align-middle mx-2 md:mx-4 h-[0.8em] w-[1.4em] md:w-[1.6em] rounded-full border-4 border-white dark:border-[#121212] shadow-xl overflow-hidden relative -top-1 md:-top-2">
                                <img
                                    src="/hero-student.jpg"
                                    alt="Happy Student"
                                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </span>
                            Learning Platform
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 ease-out text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
                        Access high-quality university notes, past question papers, and video lectures. Everything you need to ace your exams, in one place.
                    </p>

                    {/* Search Input - Polished Pro UI */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 ease-out w-full max-w-2xl">
                        <div className="relative flex items-center p-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full shadow-lg dark:shadow-none hover:border-indigo-500/30 dark:hover:border-zinc-700 transition-all duration-300 group">
                            <div className="pl-4 pr-3 text-slate-400 dark:text-zinc-500 group-focus-within:text-indigo-500 transition-colors">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for courses, topics, or notes..."
                                className="flex-1 bg-transparent border-none text-base text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-0 h-11 w-full"
                            />
                            <button className="hidden md:flex items-center justify-center h-8 w-8 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-md">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="md:hidden p-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 shadow-md">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats / Trust (Optional minimalist addition) */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 ease-out mt-12 flex gap-8 md:gap-12 text-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        {/* You can add simple text stats or logos here if needed later */}
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
