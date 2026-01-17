import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { mockCourses } from '../data/mockData';

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    // Helper to generate readable names
    const getName = (index: number, value: string) => {
        // Basic heuristic based on path structure
        // /course/:id -> Course Name
        // /course/:id/sem/:id -> Semester Name
        // /course/:id/sem/:id/subject/:id -> Subject Name

        // Ideally, we'd look up the IDs in the mockData or Store.
        // For MVP, we can try to look it up or just format the string if id lookup fails.

        // Let's do simple lookups for now based on context availability or just cleaner ID formatting
        if (pathnames[index - 1] === 'course') {
            const course = mockCourses.find(c => c.id === value);
            return course ? course.shortName : value;
        }
        if (pathnames[index - 1] === 'sem') {
            // Flatten search or just format
            return value.replace('sem-', 'Sem ').replace('-', ' ');
        }
        if (pathnames[index - 1] === 'subject') {
            // Deep search or just code
            return value.toUpperCase();
        }
        if (pathnames[index - 1] === 'unit') {
            return `Unit ${value.replace('u', '')}`;
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
        <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors flex-shrink-0">
                <Home className="w-4 h-4" />
            </Link>
            {pathnames.map((value, index) => {
                // Skip label segments like 'course', 'sem', 'subject' in the visual output if we want purely hierarchical?
                // Actually, URL structure is /course/bca/sem/sem-1...
                // We probably only want to show the ID parts as clickable breadcrumbs.

                const isId = index > 0 && ['course', 'sem', 'subject', 'unit'].includes(pathnames[index - 1]);
                if (!isId) return null; // Skip the prefix segments in display if we want compact breadcrumbs

                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const name = getName(index, value);

                return (
                    <div key={to} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2 text-slate-300 flex-shrink-0" />
                        <Link
                            to={to}
                            className={`hover:text-indigo-600 transition-colors ${index === pathnames.length - 1 ? 'font-semibold text-slate-800 pointer-events-none' : ''
                                }`}
                        >
                            {name}
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
}
