import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { Search, FileText, Video, BookOpen, Download, Filter, Sparkles, Book, X, ExternalLink, Star, Clock, Eye } from "lucide-react";
import { Loader2 } from "lucide-react";
import MarkdownPreview from "@/components/ui/markdown-preview";
import { DUMMY_RESOURCES } from '../lib/dummy-data';
import { motion, AnimatePresence } from "framer-motion";

const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
const branches = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];

export default function StudyMaterialsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("All");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [activeTab, setActiveTab] = useState("all");
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedResource, setSelectedResource] = useState<any | null>(null);
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
            if (e.key === 'Escape' && selectedResource) {
                setSelectedResource(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedResource]);

    const getBadgeVariant = (type: string) => {
        const t = type.toLowerCase();
        if (t === 'pdf') return 'destructive';
        if (t === 'video') return 'default';
        if (t === 'notes') return 'secondary';
        return 'outline';
    };

    const getIcon = (type: string) => {
        const t = type.toLowerCase();
        if (t === 'pdf') return <FileText className="h-4 w-4" />;
        if (t === 'video') return <Video className="h-4 w-4" />;
        if (t === 'notes') return <BookOpen className="h-4 w-4" />;
        return <Book className="h-4 w-4" />;
    };

    const getResourceColor = (type: string) => {
        const t = type.toLowerCase();
        switch (t) {
            case 'video': return { bg: 'bg-red-500/10', text: 'text-red-500', ring: 'ring-red-500/20' };
            case 'pdf': return { bg: 'bg-blue-500/10', text: 'text-blue-500', ring: 'ring-blue-500/20' };
            case 'notes': return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', ring: 'ring-emerald-500/20' };
            default: return { bg: 'bg-primary/10', text: 'text-primary', ring: 'ring-primary/20' };
        }
    };

    // Filter Logic
    const filteredResources = resources.filter(resource => {
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

    const handleViewResource = (resource: any) => {
        setSelectedResource(resource);
    };

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

    const FilterContent = () => (
        <div className="flex flex-col gap-4 py-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Branch</label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                        <SelectTrigger className="w-full h-11">
                            <div className="flex items-center gap-2">
                                <SelectValue placeholder="All Branches" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Branches</SelectItem>
                            {branches.map(branch => (
                                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Semester</label>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-full h-11">
                            <div className="flex items-center gap-2">
                                <SelectValue placeholder="All Semesters" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Semesters</SelectItem>
                            {semesters.map(sem => (
                                <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                <Button
                    variant="ghost"
                    onClick={handleClearFilters}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                    Clear All
                </Button>
                <div className="text-xs text-muted-foreground">
                    {filteredResources.length} results found
                </div>
            </div>
        </div>
    );

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
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 md:gap-3"
                        >
                            <div className="p-1.5 md:p-2 rounded-xl bg-primary/10 text-primary">
                                <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight">Study Materials</h1>
                                <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">{resources.length} resources available</p>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex">
                                <Badge variant="outline" className="gap-1.5">
                                    <Sparkles className="h-3 w-3" />
                                    Premium
                                </Badge>
                            </div>

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
                                    <FilterContent />
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

            {/* Filters Section Removed (Replaced by Sheet) */}

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
                                {filteredResources.map((resource, index) => {
                                    const colors = getResourceColor(resource.type);
                                    return (
                                        <motion.div
                                            key={resource.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            whileHover={{ y: -4 }}
                                        >
                                            <Card className="group h-full flex flex-col border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden">
                                                <CardHeader className="p-4 pb-2 space-y-3">
                                                    {/* Type Badge */}
                                                    <div className="flex justify-between items-start">
                                                        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} ${colors.ring} ring-1`}>
                                                            {getIcon(resource.type)}
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5">
                                                                {resource.type}
                                                            </Badge>
                                                            {resource.isNew && (
                                                                <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30 text-[10px] px-2 py-0.5 h-5">
                                                                    New
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Resource Info */}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <Badge variant="outline" className="text-[10px] font-normal">
                                                                {resource.subject}
                                                            </Badge>
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                                <span>{resource.rating || 4.5}</span>
                                                            </div>
                                                        </div>

                                                        <CardTitle className="text-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                            {resource.title}
                                                        </CardTitle>

                                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                                            By {resource.author}
                                                        </p>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="p-4 pt-0 flex-grow">
                                                    <div className="space-y-3">
                                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                                            {resource.description || "Comprehensive study material covering key concepts, examples, and problem sets."}
                                                        </p>

                                                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/20">
                                                            <div className="flex items-center gap-3">
                                                                <span className="flex items-center gap-1">
                                                                    <Eye className="h-3 w-3" />
                                                                    {resource.views}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    {resource.duration || "30m"}
                                                                </span>
                                                            </div>
                                                            <span className="text-xs font-medium px-2 py-1 rounded-md bg-secondary/50">
                                                                {resource.semester || "Sem 4"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="p-4 pt-3 flex gap-2">
                                                    <Button
                                                        className="flex-1 h-9 rounded-lg bg-primary hover:bg-primary/90 shadow-sm"
                                                        size="sm"
                                                        onClick={() => handleViewResource(resource)}
                                                    >
                                                        {resource.type.toLowerCase() === 'video' ? 'Watch Now' : 'View'}
                                                        <ExternalLink className="ml-2 h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-9 w-9 rounded-lg border-border/60 hover:border-primary/50 hover:bg-secondary"
                                                        title="Download"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
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

            {/* Resource Viewer Modal */}
            <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                <DialogContent className="max-w-6xl w-full h-full md:w-[95vw] md:h-[90vh] md:rounded-xl p-0 overflow-hidden bg-background border-border shadow-2xl rounded-none flex flex-col">
                    <DialogHeader className="p-4 border-b border-border/40 flex flex-row items-center justify-between bg-secondary/5 shrink-0">
                        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedResource(null)}
                                className="h-8 w-8 md:hidden"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            {selectedResource && (
                                <>
                                    <div className={`p-1.5 md:p-2 rounded-lg ${getResourceColor(selectedResource.type).bg} ${getResourceColor(selectedResource.type).text} shrink-0`}>
                                        {getIcon(selectedResource.type)}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <DialogTitle className="text-base md:text-lg font-semibold leading-none truncate">
                                            {selectedResource.title}
                                        </DialogTitle>
                                        <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                                            <Badge variant="outline" className="text-[10px] md:text-xs h-4 md:h-5 px-1 md:px-2">
                                                {selectedResource.subject}
                                            </Badge>
                                            <span className="text-[10px] md:text-xs text-muted-foreground truncate hidden sm:inline">• By {selectedResource.author}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 shrink-0">
                            <Button variant="outline" size="sm" className="gap-2 h-8 md:h-9 text-xs md:text-sm hidden sm:flex">
                                <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                Download
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedResource(null)}
                                className="h-8 w-8 md:h-9 md:w-9 hidden md:flex"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </DialogHeader>

                    <DialogDescription className="sr-only">
                        Viewing study material: {selectedResource?.title}
                    </DialogDescription>

                    <div className="flex-1 overflow-hidden p-0 md:p-2 bg-muted/10 h-full relative">
                        {selectedResource?.type.toLowerCase() === 'video' ? (
                            <div className="relative w-full h-full md:rounded-lg overflow-hidden bg-black flex items-center justify-center">
                                <iframe
                                    src={selectedResource.url}
                                    className="w-full h-full aspect-video"
                                    title={selectedResource.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : selectedResource?.type.toLowerCase() === 'markdown' || selectedResource?.type.toLowerCase() === 'notes' ? (
                            <div className="h-full w-full md:rounded-lg border-0 md:border border-border overflow-hidden bg-background">
                                <MarkdownPreview
                                    content={selectedResource.content || selectedResource.url || "# No content available"}
                                    className="h-full"
                                />
                            </div>
                        ) : selectedResource?.type.toLowerCase() === 'pdf' ? (
                            <div className="relative w-full h-full md:rounded-lg overflow-hidden bg-muted/20">
                                <iframe
                                    src={selectedResource.url}
                                    className="w-full h-full"
                                    title={selectedResource.title}
                                />
                                <div className="absolute bottom-4 right-4 z-10 md:hidden">
                                    <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-6 md:p-10 text-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4 md:mb-6 ring-4 ring-background">
                                    {selectedResource && getIcon(selectedResource.type)}
                                </div>
                                <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">Preview Not Available</h3>
                                <p className="text-sm md:text-base text-muted-foreground max-w-sm mb-6">
                                    This file type cannot be previewed directly. Please download the file to view its contents.
                                </p>
                                <Button className="gap-2 w-full sm:w-auto h-11 md:h-10">
                                    <Download className="h-4 w-4" />
                                    Download File ({selectedResource?.type})
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="p-3 md:p-4 border-t border-border/40 bg-background md:bg-secondary/5 shrink-0">
                        <div className="flex items-center justify-between text-xs md:text-sm">
                            <div className="flex items-center gap-3 md:gap-4">
                                <span className="text-muted-foreground hidden sm:inline">
                                    Last updated: {selectedResource?.updatedAt || "Recently"}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    {selectedResource?.views || 0}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3">
                                <Button variant="ghost" size="sm" className="h-8 md:h-9 px-2 md:px-3">
                                    Share
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 md:h-9 px-2 md:px-3">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Floating Action Button for Mobile Filter - Only show if necessary or if we want duplicate entry points. 
                With the new Header button, this is less Critical but can stay.
            */}
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
                        <FilterContent />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}