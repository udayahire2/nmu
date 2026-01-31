import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, FileText, Video, BookOpen, Download, Filter, Sparkles, Book, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { DUMMY_RESOURCES, DUMMY_STATS } from '../lib/dummy-data';
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

    useEffect(() => {
        // Simulate loading for premium feel
        const timer = setTimeout(() => {
            setResources(DUMMY_RESOURCES);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

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

    // Filter Logic
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.subject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab = activeTab === "all" ||
            (activeTab === "notes" && (resource.type.toLowerCase() === 'notes')) ||
            (activeTab === "videos" && resource.type.toLowerCase() === 'video') ||
            (activeTab === "papers" && (resource.type.toLowerCase() === 'pdf' || resource.type.toLowerCase() === 'doc'));

        return matchesSearch && matchesTab;
    });

    const handleViewResource = (resource: any) => {
        setSelectedResource(resource);
    };

    return (
        <div className="min-h-screen bg-transparent space-y-8 pb-20 relative">
            {/* Ambient Background */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-50 animate-pulse" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-30" />
            </div>

            {/* Hero Header */}
            <div className="relative pt-24 pb-16 px-6 flex flex-col items-center text-center overflow-hidden z-10">
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
                        <Badge variant="outline" className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary backdrop-blur-md rounded-full text-xs font-medium uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3" />
                            Academic Resources
                        </Badge>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                        Study <span className="text-primary relative inline-block">
                            Materials
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5 L 100 8 Q 50 13 0 8 Z" fill="currentColor" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Access a curated collection of notes, video lectures, and previous year papers to ace your exams.
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl px-2"
                >
                    {DUMMY_STATS.map((stat, i) => (
                        <div key={i} className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            <stat.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Sticky Controls Section */}
            <div className="sticky top-[4.5rem] z-40 w-full backdrop-blur-xl bg-background/70 border-y border-border/40 shadow-sm transition-all duration-200">
                <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col xl:flex-row gap-4 items-center justify-between">

                    {/* Search Field */}
                    <div className="relative w-full xl:max-w-sm group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <Input
                            placeholder="Search by topic or subject..."
                            className="pl-10 h-10 bg-secondary/50 border-transparent hover:bg-secondary/70 focus:bg-background focus:border-primary/30 transition-all rounded-xl"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters & Tabs Wrapper */}
                    <div className="flex flex-col md:flex-row w-full xl:w-auto gap-3 md:gap-4 items-center justify-between xl:justify-end overflow-hidden">

                        {/* Dropdown Filters */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                <SelectTrigger className="w-full md:w-[160px] h-10 rounded-xl bg-background border-border/60 hover:border-primary/40 focus:ring-1 focus:ring-primary/20">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                                        <SelectValue placeholder="Branch" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Branches</SelectItem>
                                    {branches.map(branch => (
                                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                                <SelectTrigger className="w-full md:w-[150px] h-10 rounded-xl bg-background border-border/60 hover:border-primary/40 focus:ring-1 focus:ring-primary/20">
                                    <SelectValue placeholder="Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Semesters</SelectItem>
                                    {semesters.map(sem => (
                                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                            <TabsList className="bg-secondary/50 p-1 h-10 rounded-xl w-full md:w-auto grid grid-cols-4 md:flex">
                                <TabsTrigger value="all" className="rounded-lg text-xs md:text-sm px-3 md:px-4">All</TabsTrigger>
                                <TabsTrigger value="notes" className="rounded-lg text-xs md:text-sm px-3 md:px-4">Notes</TabsTrigger>
                                <TabsTrigger value="videos" className="rounded-lg text-xs md:text-sm px-3 md:px-4">Videos</TabsTrigger>
                                <TabsTrigger value="papers" className="rounded-lg text-xs md:text-sm px-3 md:px-4">Papers</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container mx-auto px-4 md:px-6 min-h-[500px]">
                {loading ? (
                    <div className="flex flex-col gap-4 justify-center items-center h-64">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Fetching resources...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredResources.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {filteredResources.map((resource, index) => (
                                    <motion.div
                                        layout
                                        key={resource.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Card className="group h-full flex flex-col justify-between border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                                            <CardHeader className="p-5 pb-2">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className={`p-2.5 rounded-xl ${resource.type.toLowerCase() === 'video' ? 'bg-red-500/10 text-red-500' :
                                                            resource.type.toLowerCase() === 'pdf' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
                                                        } ring-1 ring-inset ring-black/5 dark:ring-white/10`}>
                                                        {getIcon(resource.type)}
                                                    </div>
                                                    <Badge variant={getBadgeVariant(resource.type)} className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shadow-none border-0 bg-secondary text-secondary-foreground hover:bg-secondary">
                                                        {resource.type}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">{resource.subject}</span>
                                                    <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                        {resource.title}
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="p-5 pt-2 flex-grow">
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
                                                    <span className="flex items-center gap-1">
                                                        By {resource.author}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span className="flex items-center gap-1">
                                                        {resource.views} views
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                                                    Comprehensive study material covering key concepts, examples, and problem sets.
                                                </p>
                                            </CardContent>

                                            <CardFooter className="p-4 pt-0 flex gap-3">
                                                <Button
                                                    className="flex-1 h-9 rounded-lg bg-primary/90 hover:bg-primary shadow-sm group-hover:shadow-primary/20 transition-all"
                                                    size="sm"
                                                    onClick={() => handleViewResource(resource)}
                                                >
                                                    {resource.type.toLowerCase() === 'video' ? 'Watch Now' : 'View Material'}
                                                </Button>
                                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-border/60 hover:border-primary/50 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6 ring-4 ring-background shadow-inner">
                                    <Search className="h-8 w-8 text-muted-foreground/80" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">No matches found</h3>
                                <p className="text-muted-foreground max-w-sm mt-2 text-sm">
                                    We couldn't find any resources matching "{searchQuery}" in {selectedSemester === "All" ? "any semester" : selectedSemester}.
                                </p>
                                <Button
                                    variant="link"
                                    onClick={() => { setSearchQuery(""); setSelectedSemester("All"); setSelectedBranch("All"); setActiveTab("all") }}
                                    className="mt-4 text-primary"
                                >
                                    Clear all filters
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Resource Viewer Modal */}
            <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50">
                    <DialogHeader className="p-4 border-b border-border/40 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedResource?.type.toLowerCase() === 'video' ? 'bg-red-500/10 text-red-500' :
                                    selectedResource?.type.toLowerCase() === 'pdf' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
                                }`}>
                                {selectedResource && getIcon(selectedResource.type)}
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold leading-none mb-1">
                                    {selectedResource?.title}
                                </DialogTitle>
                                <p className="text-xs text-muted-foreground">
                                    {selectedResource?.subject} • {selectedResource?.author}
                                </p>
                            </div>
                        </div>
                        {/* Close button is automatically added by DialogContent, but we can customize if needed */}
                    </DialogHeader>

                    <div className="flex-1 bg-muted/20 min-h-[60vh] relative flex items-center justify-center">
                        {selectedResource?.type.toLowerCase() === 'video' ? (
                            <iframe
                                src={selectedResource.url}
                                className="w-full h-[60vh]"
                                title={selectedResource.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : selectedResource?.type.toLowerCase() === 'pdf' ? (
                            <iframe
                                src={selectedResource.url}
                                className="w-full h-[80vh]"
                                title={selectedResource.title}
                            />
                        ) : (
                            <div className="text-center p-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 text-muted-foreground">
                                    {selectedResource && getIcon(selectedResource.type)}
                                </div>
                                <h3 className="text-lg font-medium text-foreground">Preview Not Available</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mt-2">
                                    This content type cannot be previewed directly. Please download the file to view it.
                                </p>
                                <Button className="mt-6" variant="outline">
                                    <Download className="mr-2 h-4 w-4" /> Download File
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
