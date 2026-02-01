import { useState, useEffect, useRef, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Search, Filter, BookOpen, FileText, Video, Book, X, Loader2 } from "lucide-react";
import { DUMMY_RESOURCES } from '../lib/dummy-data';
import { motion, AnimatePresence } from "framer-motion";
import { StudyMaterialCard } from "@/components/study-materials/StudyMaterialCard";
import type { StudyMaterial } from "@/components/study-materials/types";
import { StudyMaterialFilter } from "@/components/study-materials/StudyMaterialFilter";
import { StudyMaterialViewer } from "@/components/study-materials/StudyMaterialViewer";

export default function StudyMaterialsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("All");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [activeTab, setActiveTab] = useState("all");
    const [resources, setResources] = useState<StudyMaterial[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedResource, setSelectedResource] = useState<StudyMaterial | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Simulate loading for premium feel
        const timer = setTimeout(() => {
            setResources(DUMMY_RESOURCES);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Focus search input on cmd/ctrl + k
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Memoized Filter Logic
    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.author.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTab = activeTab === "all" ||
                (activeTab === "notes" && (resource.type.toLowerCase() === 'notes')) ||
                (activeTab === "videos" && resource.type.toLowerCase() === 'video') ||
                (activeTab === "papers" && (resource.type.toLowerCase() === 'pdf' || resource.type.toLowerCase() === 'doc'));

            const matchesBranch = selectedBranch === "All" || resource.branch === selectedBranch;
            const matchesSemester = selectedSemester === "All" || resource.semester === selectedSemester;

            return matchesSearch && matchesTab && matchesBranch && matchesSemester;
        });
    }, [resources, searchQuery, activeTab, selectedBranch, selectedSemester]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedSemester("All");
        setSelectedBranch("All");
        setActiveTab("all");
        searchInputRef.current?.focus();
    };

    const activeFiltersCount = [
        selectedSemester !== "All",
        selectedBranch !== "All",
        activeTab !== "all",
        searchQuery.length > 0
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5 pb-20">
            {/* Enhanced Ambient Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[60vh] md:w-[80vh] h-[60vh] md:h-[80vh] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[60vh] md:w-[80vh] h-[60vh] md:h-[80vh] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-transparent to-background" />
            </div>

            {/* Sticky Header with Hero */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/85 border-b border-border/40 shadow-sm transition-all">
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
                    {/* Top Navigation Bar */}
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <div /> {/* Spacer for flex layout */}

                        <div className="flex items-center gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 h-9 border-border/60 bg-background/50"
                                    >
                                        <Filter className="h-4 w-4" />
                                        <span className="hidden sm:inline">Filters</span>
                                        {activeFiltersCount > 0 && (
                                            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-[10px] flex items-center justify-center bg-primary/10 text-primary">
                                                {activeFiltersCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <SheetHeader>
                                        <SheetTitle>Filter Resources</SheetTitle>
                                        <SheetDescription>
                                            Refine your search by branch, semester, or type.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <StudyMaterialFilter
                                        selectedBranch={selectedBranch}
                                        setSelectedBranch={setSelectedBranch}
                                        selectedSemester={selectedSemester}
                                        setSelectedSemester={setSelectedSemester}
                                        activeFiltersCount={activeFiltersCount}
                                        onClearFilters={handleClearFilters}
                                    />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Hero Section - Compact on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-2xl mx-auto mb-4 md:mb-8"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
                            Discover
                            <span className="text-primary relative inline-block mx-2">
                                Academic
                                <svg className="absolute w-full h-1.5 md:h-2 -bottom-0.5 md:-bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                            Resources
                        </h2>
                        <p className="text-muted-foreground text-xs md:text-base hidden sm:block">
                            Curated notes, video lectures, and previous year papers from top educators
                        </p>
                    </motion.div>

                    {/* Main Search Bar */}
                    <div className="max-w-2xl mx-auto mb-2">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            </div>
                            <Input
                                ref={searchInputRef}
                                placeholder="Search topics..."
                                className="pl-10 md:pl-11 pr-12 md:pr-24 h-10 md:h-12 text-sm md:text-base bg-secondary/50 border-transparent hover:bg-secondary/70 focus:bg-background focus:border-primary/50 rounded-xl shadow-none focus:shadow-sm transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 md:px-6 pt-4 min-h-[calc(100vh-200px)]">
                {/* Content Header */}
                <div className="flex flex-col gap-4 mb-6 sticky top-[180px] md:static z-30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="hidden md:block">
                            <h3 className="text-lg font-semibold text-foreground">
                                {activeTab === 'all' ? 'All Resources' :
                                    activeTab === 'notes' ? 'Study Notes' :
                                        activeTab === 'videos' ? 'Video Lectures' : 'Previous Papers'}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {filteredResources.length} results
                            </p>
                        </div>

                        {/* Resource Type Tabs - Scrollable on mobile */}
                        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                                <TabsList className="bg-secondary/40 p-1 h-10 md:h-11 rounded-xl w-full sm:w-auto flex">
                                    <TabsTrigger value="all" className="flex-1 sm:flex-none gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg text-xs md:text-sm">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value="notes" className="flex-1 sm:flex-none gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg text-xs md:text-sm">
                                        <FileText className="h-3.5 w-3.5" />
                                        Notes
                                    </TabsTrigger>
                                    <TabsTrigger value="videos" className="flex-1 sm:flex-none gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg text-xs md:text-sm">
                                        <Video className="h-3.5 w-3.5" />
                                        Videos
                                    </TabsTrigger>
                                    <TabsTrigger value="papers" className="flex-1 sm:flex-none gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg text-xs md:text-sm">
                                        <Book className="h-3.5 w-3.5" />
                                        Papers
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                </div>

                {/* Resource Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative mb-6">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse rounded-full" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading premium resources...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {filteredResources.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {filteredResources.map((resource, index) => (
                                    <StudyMaterialCard
                                        key={resource.id}
                                        resource={resource}
                                        index={index}
                                        onView={setSelectedResource}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6 ring-8 ring-background shadow-inner">
                                    <Search className="h-10 w-10 text-muted-foreground/60" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
                                <p className="text-muted-foreground max-w-md mb-6 text-sm">
                                    We couldn't find any resources matching your search. Try adjusting your filters or search term.
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        variant="default"
                                        onClick={handleClearFilters}
                                        className="gap-2"
                                    >
                                        <X className="h-4 w-4" />
                                        Clear all filters
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => searchInputRef.current?.focus()}
                                    >
                                        <Search className="h-4 w-4 mr-2" />
                                        Search again
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <StudyMaterialViewer
                resource={selectedResource}
                onClose={() => setSelectedResource(null)}
            />

            {/* Floating Action Button for Mobile Filter */}
            <div className="fixed bottom-6 right-6 z-30 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="lg"
                            className="rounded-full h-12 w-12 shadow-xl bg-primary text-primary-foreground"
                        >
                            <Filter className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
                        <SheetHeader>
                            <SheetTitle>Filter Resources</SheetTitle>
                        </SheetHeader>
                        <StudyMaterialFilter
                            selectedBranch={selectedBranch}
                            setSelectedBranch={setSelectedBranch}
                            selectedSemester={selectedSemester}
                            setSelectedSemester={setSelectedSemester}
                            activeFiltersCount={activeFiltersCount}
                            onClearFilters={handleClearFilters}
                        />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}