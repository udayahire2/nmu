import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, FileText, Video, File, FileCode, Download, Eye, PlayCircle } from "lucide-react";
import { mockResources, subjects, semesters, branches, type Resource } from '../data/mockResources';

export default function StudyMaterialsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedSemester, setSelectedSemester] = useState("All");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [activeTab, setActiveTab] = useState("all");

    const getBadgeVariant = (type: string) => {
        switch (type) {
            case 'pdf': return 'destructive';
            case 'video': return 'default'; // Using default (primary) for video to pop
            case 'doc': return 'secondary';
            case 'markdown': return 'outline';
            default: return 'outline';
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="h-4 w-4" />;
            case 'video': return <Video className="h-4 w-4" />;
            case 'doc': return <File className="h-4 w-4" />;
            case 'markdown': return <FileCode className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    // Filter Logic
    const filteredResources = mockResources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === "All" || resource.subject === selectedSubject;
        const matchesSemester = selectedSemester === "All" || resource.semester === selectedSemester;
        const matchesBranch = selectedBranch === "All" || resource.branch === selectedBranch;
        const matchesTab = activeTab === "all" ||
            (activeTab === "notes" && (resource.type === 'pdf' || resource.type === 'markdown')) ||
            (activeTab === "videos" && resource.type === 'video') ||
            (activeTab === "papers" && resource.type === 'doc');

        return matchesSearch && matchesSubject && matchesSemester && matchesBranch && matchesTab;
    });

    return (
        <div className="min-h-screen bg-background p-6 md:p-12 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pb-6 border-b border-border/40">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        Study Materials
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg font-light">
                        Curated learning resources for <span className="text-primary font-medium">Computer Science</span>
                    </p>
                </div>
            </div>

            {/* Controls Section: Search, Filters, Tabs */}
            <div className="flex flex-col xl:flex-row gap-6 items-center justify-between sticky top-20 z-30 bg-background/80 backdrop-blur-xl p-4 -mx-4 rounded-xl border border-border/40 shadow-sm">

                {/* Search & Filters Group */}
                <div className="flex flex-col md:flex-row w-full xl:w-auto gap-3 items-center">
                    <div className="relative w-full md:w-[320px] group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <Input
                            placeholder="Search topics..."
                            className="pl-9 h-10 bg-muted/50 border-transparent hover:bg-muted focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                            <SelectTrigger className="w-full md:w-[140px] h-10 bg-muted/50 border-transparent hover:bg-muted focus:bg-background">
                                <SelectValue placeholder="Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {branches.map(branch => (
                                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger className="w-full md:w-[130px] h-10 bg-muted/50 border-transparent hover:bg-muted focus:bg-background">
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesters.map(sem => (
                                    <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Tabs - Centered/Right Aligned */}
                <Tabs defaultValue="all" className="w-full xl:w-auto" onValueChange={setActiveTab}>
                    <TabsList className="bg-muted/50 p-1 w-full md:w-auto h-11 rounded-full border border-border/50">
                        <TabsTrigger value="all" className="rounded-full px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">All</TabsTrigger>
                        <TabsTrigger value="notes" className="rounded-full px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">Notes</TabsTrigger>
                        <TabsTrigger value="videos" className="rounded-full px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">Videos</TabsTrigger>
                        <TabsTrigger value="papers" className="rounded-full px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">Docs</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Content Area - Removing the nested TabsContent wrappers to simplify, as logic handles filtering */}
            <div className="min-h-[500px]">
                <ResourceGrid resources={filteredResources} getBadgeVariant={getBadgeVariant} getIcon={getIcon} />
            </div>
        </div>
    );
}

// Sub-component for Grid to avoid repetition
function ResourceGrid({ resources, getBadgeVariant, getIcon }: { resources: Resource[], getBadgeVariant: any, getIcon: any }) {
    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No resources found matching your filters.</p>
                <Button variant="link" onClick={() => window.location.reload()}>Clear Filters</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
                <Card key={resource.id} className="flex flex-col hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 relative">
                        <div className="absolute top-4 right-4">
                            <Badge variant={getBadgeVariant(resource.type)} className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold shadow-sm gap-1">
                                {getIcon(resource.type)}
                                {resource.type}
                            </Badge>
                        </div>
                        <div className="pr-12">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block">{resource.subject}</span>
                            <CardTitle className="line-clamp-2 text-xl leading-tight mb-1 group-hover:text-primary transition-colors">{resource.title}</CardTitle>
                            <CardDescription className="text-xs font-medium">{resource.semester} • {resource.author}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {resource.description}
                        </p>
                    </CardContent>
                    <CardFooter className="pt-2 flex gap-2">
                        {resource.type === 'video' ? (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full gap-2">
                                        <PlayCircle className="h-4 w-4" /> Watch Now
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px]">
                                    <DialogHeader>
                                        <DialogTitle>{resource.title}</DialogTitle>
                                        <DialogDescription>
                                            {resource.author} • {resource.date}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="aspect-video w-full mt-2 rounded-lg overflow-hidden bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={resource.url}
                                            title={resource.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <>
                                <Button variant="default" className="flex-1 gap-2">
                                    <Eye className="h-4 w-4" /> View
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
