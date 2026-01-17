import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { mockCourses } from '../data/mockData';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ q: searchTerm });
    };

    interface SearchResult {
        type: string;
        title: string;
        path: string;
        subtitle: string;
    }

    // Simple search logic
    const results: SearchResult[] = [];
    if (query) {
        const lowerQuery = query.toLowerCase();
        mockCourses.forEach(course => {
            if (course.name.toLowerCase().includes(lowerQuery) || course.shortName.toLowerCase().includes(lowerQuery)) {
                results.push({ type: 'Course', title: course.name, path: `/course/${course.id}`, subtitle: course.shortName });
            }
            course.semesters.forEach(sem => {
                sem.subjects.forEach(subject => {
                    if (subject.name.toLowerCase().includes(lowerQuery) || subject.code.toLowerCase().includes(lowerQuery)) {
                        results.push({ type: 'Subject', title: subject.name, path: `/course/${course.id}/sem/${sem.id}/subject/${subject.id}`, subtitle: `${course.shortName} • ${sem.name}` });
                    }
                    subject.units.forEach(unit => {
                        if (unit.title.toLowerCase().includes(lowerQuery)) {
                            results.push({ type: 'Unit', title: unit.title, path: `/course/${course.id}/sem/${sem.id}/subject/${subject.id}/unit/${unit.id}`, subtitle: `${subject.name} (Unit ${unit.number})` });
                        }
                    });
                });
            });
        });
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Search</h1>

            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for courses, subjects, or topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-app border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>
            </form>

            <div className="space-y-4">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <Link
                            key={index}
                            to={result.path}
                            className="block bg-white dark:bg-dark-card border border-slate-200 dark:border-zinc-800 rounded-xl p-4 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-sm transition-all"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded uppercase">{result.type}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{result.subtitle}</span>
                                    </div>
                                    <h3 className="font-medium text-slate-900 dark:text-white">{result.title}</h3>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                            </div>
                        </Link>
                    ))
                ) : query && (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                        No results found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
}
