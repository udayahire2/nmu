import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, Book, Download, Filter, FileText, ChevronRight, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy Data for Syllabus
const BRANCHES = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];
const SEMESTERS = [
    { value: "sem1", label: "Semester 1", year: "1st Year" },
    { value: "sem2", label: "Semester 2", year: "1st Year" },
    { value: "sem3", label: "Semester 3", year: "2nd Year" },
    { value: "sem4", label: "Semester 4", year: "2nd Year" },
    { value: "sem5", label: "Semester 5", year: "3rd Year" },
    { value: "sem6", label: "Semester 6", year: "3rd Year" },
    { value: "sem7", label: "Semester 7", year: "4th Year" },
    { value: "sem8", label: "Semester 8", year: "4th Year" },
];

const DUMMY_SYLLABUS = [
    { id: 1, title: "Data Structures & Algorithms", branch: "Computer Science", semester: "sem3", code: "CS301", credits: 4, type: "Core", fileUrl: "#" },
    { id: 2, title: "Digital Logic Design", branch: "Computer Science", semester: "sem3", code: "CS302", credits: 3, type: "Core", fileUrl: "#" },
    { id: 3, title: "Discrete Mathematics", branch: "Computer Science", semester: "sem3", code: "CS303", credits: 3, type: "Core", fileUrl: "#" },
    { id: 4, title: "Object Oriented Programming", branch: "Information Technology", semester: "sem3", code: "IT301", credits: 4, type: "Core", fileUrl: "#" },
    { id: 5, title: "Database Management Systems", branch: "Computer Science", semester: "sem4", code: "CS401", credits: 4, type: "Core", fileUrl: "#" },
    { id: 6, title: "Operating Systems", branch: "Computer Science", semester: "sem4", code: "CS402", credits: 4, type: "Core", fileUrl: "#" },
    { id: 7, title: "Computer Networks", branch: "Information Technology", semester: "sem5", code: "IT501", credits: 4, type: "Core", fileUrl: "#" },
    { id: 8, title: "Software Engineering", branch: "Information Technology", semester: "sem5", code: "IT502", credits: 3, type: "Core", fileUrl: "#" },
    { id: 9, title: "Engineering Physics", branch: "All", semester: "sem1", code: "PH101", credits: 4, type: "Foundation", fileUrl: "#" },
    { id: 10, title: "Engineering Mathematics I", branch: "All", semester: "sem1", code: "MA101", credits: 4, type: "Foundation", fileUrl: "#" },
];

export default function SyllabusPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [selectedSemester, setSelectedSemester] = useState("All");
    const [loading, setLoading] = useState(true);
    const [syllabus, setSyllabus] = useState<any[]>([]);
    const [viewItem, setViewItem] = useState<any | null>(null);
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setSyllabus(DUMMY_SYLLABUS);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Proper Debounce for Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Memoized Filter Logic
    const filteredSyllabus = useMemo(() => {
        return syllabus.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.code.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesBranch = selectedBranch === "All" || item.branch === selectedBranch || item.branch === "All";
            const matchesSemester = selectedSemester === "All" || item.semester === selectedSemester;

            return matchesSearch && matchesBranch && matchesSemester;
        });
    }, [syllabus, debouncedSearch, selectedBranch, selectedSemester]);

    const getSemLabel = (val: string) => {
        const sem = SEMESTERS.find(s => s.value === val);
        return sem ? `${sem.label} (${sem.year})` : val;
    };

    const clearFilters = useCallback(() => {
        setSelectedBranch("All");
        setSelectedSemester("All");
        setSearchQuery("");
        setDebouncedSearch("");
    }, []);

    const handleCardClick = useCallback((item: any) => {
        setViewItem(item);
    }, []);

    const handleCardKeyDown = useCallback((e: React.KeyboardEvent, item: any) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setViewItem(item);
        }
    }, [handleCardClick]);

    const handleDownloadClick = useCallback((e: React.MouseEvent, item: any) => {
        e.stopPropagation();
        // Actual download logic would go here
        console.log(`Downloading ${item.title}`);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Optimized Background with reduced motion support */}
            <div className="fixed inset-0 -z-20 overflow-hidden">
                <div className="absolute inset-0 bg-background" />
                <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-40 motion-safe:animate-pulse motion-reduce:opacity-20" />
                <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] opacity-30 motion-reduce:opacity-15" />
            </div>

            {/* Header Section */}
            <header className="relative pt-20 pb-12 px-4 md:px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex justify-center"
                    >
                        <Badge
                            variant="outline"
                            className="px-4 py-2 border-primary/20 bg-primary/5 text-primary backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-2"
                        >
                            <Book className="h-3.5 w-3.5" />
                            Curriculum & Course Content
                        </Badge>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        University <span className="text-primary relative inline-block">Syllabus</span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Explore detailed syllabus, credits, and course structures for all semesters and branches.
                    </p>
                </motion.div>
            </header>

            {/* Filters Section - Optimized for mobile */}
            <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/95 supports-[backdrop-filter]:bg-background/70 border-b border-border/40 shadow-sm">
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1 group">
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                <Search className="h-4 w-4" />
                            </div>
                            <Input
                                placeholder="Search by subject name or code..."
                                className="pl-10 h-12 md:h-10 bg-secondary/50 border-border/60 hover:bg-secondary/70 focus:bg-background focus:border-primary/50 transition-all rounded-xl text-base md:text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search syllabus"
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex flex-col xs:flex-row gap-2">
                            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                <SelectTrigger className="h-12 md:h-10 rounded-xl bg-secondary/50 border-border/60 hover:bg-secondary/70 focus:bg-background focus:ring-2 focus:ring-primary/20 text-base md:text-sm min-w-[160px]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <SelectValue placeholder="Select Branch" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Branches</SelectItem>
                                    {BRANCHES.map(branch => (
                                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                                <SelectTrigger className="h-12 md:h-10 rounded-xl bg-secondary/50 border-border/60 hover:bg-secondary/70 focus:bg-background focus:ring-2 focus:ring-primary/20 text-base md:text-sm min-w-[160px]">
                                    <SelectValue placeholder="Select Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Semesters</SelectItem>
                                    {SEMESTERS.map(sem => (
                                        <SelectItem key={sem.value} value={sem.value}>
                                            {sem.label} ({sem.year})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Active Filters Indicator */}
                    {(selectedBranch !== "All" || selectedSemester !== "All" || searchQuery) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-border/30"
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Filter className="h-3.5 w-3.5" />
                                    Active filters:
                                </span>

                                {selectedBranch !== "All" && (
                                    <Badge variant="secondary" className="text-xs px-2 py-1">
                                        {selectedBranch}
                                        <button
                                            onClick={() => setSelectedBranch("All")}
                                            className="ml-1.5 hover:text-destructive"
                                            aria-label={`Remove ${selectedBranch} filter`}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}

                                {selectedSemester !== "All" && (
                                    <Badge variant="secondary" className="text-xs px-2 py-1">
                                        {getSemLabel(selectedSemester)}
                                        <button
                                            onClick={() => setSelectedSemester("All")}
                                            className="ml-1.5 hover:text-destructive"
                                            aria-label={`Remove semester filter`}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}

                                {searchQuery && (
                                    <Badge variant="secondary" className="text-xs px-2 py-1">
                                        Search: "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="ml-1.5 hover:text-destructive"
                                            aria-label="Clear search"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 ml-auto text-xs"
                                    onClick={clearFilters}
                                >
                                    Clear all
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 min-h-[500px]">
                {loading ? (
                    <div className="flex flex-col gap-4 justify-center items-center h-64">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">
                            Loading syllabus...
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredSyllabus.length} of {syllabus.length} courses
                            </p>

                        </div>

                        {/* Syllabus List */}
                        <AnimatePresence mode="wait">
                            {filteredSyllabus.length > 0 ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    {filteredSyllabus.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card
                                                className="group border-border/40 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.995]"
                                                onClick={() => handleCardClick(item)}
                                                onKeyDown={(e) => handleCardKeyDown(e, item)}
                                                tabIndex={0}
                                                role="button"
                                                aria-label={`View details for ${item.title}`}
                                            >
                                                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                                            <Badge
                                                                variant="secondary"
                                                                className="font-mono text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20"
                                                            >
                                                                {item.code}
                                                            </Badge>
                                                            <Badge
                                                                variant="outline"
                                                                className={`text-xs ${item.type === "Core"
                                                                    ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                                                                    : "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                                                                    }`}
                                                            >
                                                                {item.type}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                                {item.credits} Credit{item.credits !== 1 ? 's' : ''}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                                            {item.title}
                                                        </h3>

                                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <span className="truncate max-w-[180px]">
                                                                    {item.branch === "All" ? "Common for all branches" : item.branch}
                                                                </span>
                                                            </span>
                                                            <span className="hidden sm:inline">•</span>
                                                            <span>{getSemLabel(item.semester)}</span>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="flex items-center gap-3 mt-4 md:mt-0"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-10 px-4 text-muted-foreground hover:text-foreground hidden sm:flex"
                                                            onClick={() => handleCardClick(item)}
                                                        >
                                                            Details
                                                            <ChevronRight className="h-4 w-4 ml-1.5" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-10 px-4 shadow-sm min-w-[120px]"
                                                            onClick={(e) => handleDownloadClick(e, item)}
                                                            aria-label={`Download ${item.title} syllabus`}
                                                        >
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
                                        <Search className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-medium mb-2">No subjects found</h3>
                                    <p className="text-muted-foreground mb-6 max-w-md">
                                        No courses match your current filters. Try adjusting your search or filter criteria.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                    >
                                        Clear all filters
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </main>

            {/* Detail Dialog */}
            <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
                <DialogContent
                    className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50 max-h-[85vh] overflow-y-auto"
                    onInteractOutside={(e) => {
                        // Prevent dismissing when clicking on sticky header
                        const target = e.target as HTMLElement;
                        if (target.closest('.sticky')) {
                            e.preventDefault();
                        }
                    }}
                    onEscapeKeyDown={() => setViewItem(null)}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                        dialogCloseRef.current?.focus();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="pr-12 text-xl font-bold tracking-tight">{viewItem?.title}</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Course Details and Syllabus Overview
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Course Code
                                </span>
                                <p className="font-semibold text-lg">{viewItem?.code}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Credits
                                </span>
                                <p className="font-semibold text-lg">{viewItem?.credits}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Branch
                                </span>
                                <p className="font-semibold">{viewItem?.branch === "All" ? "Common for all branches" : viewItem?.branch}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Semester
                                </span>
                                <p className="font-semibold">{getSemLabel(viewItem?.semester)}</p>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl border-2 border-dashed border-border/60 bg-gradient-to-br from-muted/20 to-transparent">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="font-medium mb-1">Syllabus Document</p>
                                    <p className="text-sm text-muted-foreground">
                                        PDF Format • Approximately 2.4 MB
                                    </p>
                                </div>
                                <Button
                                    className="w-full sm:w-auto"
                                    onClick={() => console.log(`Downloading ${viewItem?.title}`)}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Syllabus
                                </Button>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground pt-2 border-t border-border/30">
                            <p>
                                This syllabus outlines the course objectives, learning outcomes, assessment methods, and weekly schedule.
                                For more details, contact your department coordinator.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}