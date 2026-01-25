import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Video, File, Download, BookOpen } from "lucide-react";
import { Loader2 } from "lucide-react";
import { DUMMY_RESOURCES, DUMMY_STATS } from '../lib/dummy-data';
import { motion } from "framer-motion";

const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
const branches = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];

export default function StudyMaterialsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("All");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [activeTab, setActiveTab] = useState("all");
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for premium feel
        const timer = setTimeout(() => {
            setResources(DUMMY_RESOURCES);
            setLoading(false);
        }, 1000);
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
        return <File className="h-4 w-4" />;
    };

    // Filter Logic
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
        // For dummy data, we might not have 'semester' or 'branch' fields populated in all items, 
        // so we'll be lenient with filters or strictly filter if fields exist.
        // The DUMMY_RESOURCES has 'subject', 'type', 'title'. 
        // Let's assume 'subject' maps loosely to branch/sem for this demo or just filter on what we have.
        // We will filter mainly by search and tab type for now as dummy data is limited.

        const matchesTab = activeTab === "all" ||
            (activeTab === "notes" && (resource.type.toLowerCase() === 'notes')) ||
            (activeTab === "videos" && resource.type.toLowerCase() === 'video') ||
            (activeTab === "papers" && (resource.type.toLowerCase() === 'pdf' || resource.type.toLowerCase() === 'doc'));

        return matchesSearch && matchesTab;
    });

    return (
        <div className="min-h-screen bg-transparent space-y-12 pb-20">
            {/* Hero Header */}
            <div className="relative pt-20 pb-12 px-6 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl space-y-4"
                >
                    <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/5 text-primary mb-4 backdrop-blur-sm">
                        Library
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Study <span className="text-primary">Materials</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Find notes, videos, and papers for your course.
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 w-full max-w-4xl"
                >
                    {DUMMY_STATS.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/40 backdrop-blur-md border border-border/40 shadow-sm">
                            <stat.icon className="h-5 w-5 text-primary mb-2" />
                            <span className="text-2xl font-bold">{stat.value}</span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Controls Section */}
            <div className="container mx-auto px-4 md:px-6 sticky top-20 z-30">
                <div className="bg-background/70 backdrop-blur-xl p-4 rounded-2xl border border-border/40 shadow-lg flex flex-col xl:flex-row gap-4 items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full xl:max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <Input
                            placeholder="Search topics..."
                            className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex w-full xl:w-auto overflow-x-auto gap-2 no-scrollbar pb-1 xl:pb-0">
                        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                            <SelectTrigger className="w-[160px] h-11 rounded-xl bg-background/50 border-border/50">
                                <SelectValue placeholder="Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Branches</SelectItem>
                                {branches.map(branch => (
                                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger className="w-[140px] h-11 rounded-xl bg-background/50 border-border/50">
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
                    <Tabs defaultValue="all" className="w-full xl:w-auto" onValueChange={setActiveTab}>
                        <TabsList className="bg-muted/30 p-1 h-11 rounded-xl border border-border/30 w-full xl:w-auto justify-start xl:justify-center overflow-x-auto">
                            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">All</TabsTrigger>
                            <TabsTrigger value="notes" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Notes</TabsTrigger>
                            <TabsTrigger value="videos" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Videos</TabsTrigger>
                            <TabsTrigger value="papers" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Papers</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Grid Content */}
            <div className="container mx-auto px-4 md:px-6 min-h-[500px]">
                {loading ? (
                    <div className="flex flex-col gap-4 justify-center items-center h-64 opacity-50">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm font-medium">Loading...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((resource, index) => (
                            <motion.div
                                key={resource.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="group h-full flex flex-col border-border/40 bg-background/40 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                                    <CardHeader className="relative pb-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                                                {getIcon(resource.type)}
                                            </div>
                                            <Badge variant={getBadgeVariant(resource.type)} className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider shadow-none border-0 bg-secondary/50 text-secondary-foreground">
                                                {resource.type}
                                            </Badge>
                                        </div>

                                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{resource.subject}</span>
                                        <CardTitle className="leading-snug text-lg group-hover:text-primary transition-colors cursor-pointer">{resource.title}</CardTitle>
                                    </CardHeader>

                                    <CardContent className="flex-grow">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                            <span>{resource.author}</span>
                                            <span>•</span>
                                            <span>{resource.views} views</span>
                                        </div>
                                        {/* Placeholder description if missing */}
                                        <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                                            Notes for this topic.
                                        </p>
                                    </CardContent>

                                    <CardFooter className="pt-2 flex gap-3 border-t border-border/30 bg-muted/20 p-4">
                                        <Button variant="default" size="sm" className="flex-1 h-9">
                                            {resource.type.toLowerCase() === 'video' ? 'Watch Video' : 'View'}
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-9 w-9 border-border/50">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && filteredResources.length === 0 && (
                    <div className="text-center py-20 opacity-60">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No resources found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
