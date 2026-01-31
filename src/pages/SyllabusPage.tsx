import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Book, Download, Filter, Sparkles, FileText, ChevronRight } from "lucide-react";
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
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [selectedSemester, setSelectedSemester] = useState("All");
    const [loading, setLoading] = useState(true);
    const [syllabus, setSyllabus] = useState<any[]>([]);
    const [viewItem, setViewItem] = useState<any | null>(null);

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setSyllabus(DUMMY_SYLLABUS);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredSyllabus = syllabus.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBranch = selectedBranch === "All" || item.branch === selectedBranch || item.branch === "All";
        const matchesSemester = selectedSemester === "All" || item.semester === selectedSemester;

        return matchesSearch && matchesBranch && matchesSemester;
    });

    const getSemLabel = (val: string) => SEMESTERS.find(s => s.value === val)?.label || val;

    return (
        <div className="min-h-screen bg-transparent space-y-8 pb-20 relative">
            {/* Ambient Background */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute top-0 left-1/4 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] opacity-30" />
            </div>

            {/* Header */}
            <div className="relative pt-24 pb-12 px-6 flex flex-col items-center text-center overflow-hidden z-10">
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
                            <Book className="h-3 w-3" />
                            Curriculum & Course Content
                        </Badge>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        University <span className="text-primary relative inline-block">Syllabus</span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Explore detailed syllabus, credits, and course structures for all semesters and branches.
                    </p>
                </motion.div>
            </div>

            {/* Filters Section */}
            <div className="sticky top-[4.5rem] z-40 w-full backdrop-blur-xl bg-background/70 border-y border-border/40 shadow-sm transition-all duration-200">
                <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full md:max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <Input
                            placeholder="Search by subject name or code..."
                            className="pl-10 h-10 bg-secondary/50 border-transparent hover:bg-secondary/70 focus:bg-background focus:border-primary/30 transition-all rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Dropdowns */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                            <SelectTrigger className="w-full md:w-[200px] h-10 rounded-xl bg-background border-border/60 hover:border-primary/40 focus:ring-1 focus:ring-primary/20">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
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
                            <SelectTrigger className="w-full md:w-[180px] h-10 rounded-xl bg-background border-border/60 hover:border-primary/40 focus:ring-1 focus:ring-primary/20">
                                <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Semesters</SelectItem>
                                {SEMESTERS.map(sem => (
                                    <SelectItem key={sem.value} value={sem.value}>{sem.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div className="container mx-auto px-4 md:px-6 min-h-[500px]">
                {loading ? (
                    <div className="flex flex-col gap-4 justify-center items-center h-64">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading syllabus...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredSyllabus.length > 0 ? (
                            <div className="grid gap-4">
                                {filteredSyllabus.map((item, index) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Card className="group border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
                                            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="secondary" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                                                            {item.code}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                                            {item.type}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">• {item.credits} Credits</span>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.branch === "All" ? "Common for all branches" : item.branch} • {getSemLabel(item.semester)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3 mt-2 md:mt-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-9 gap-2 text-muted-foreground hover:text-foreground"
                                                        onClick={() => setViewItem(item)}
                                                    >
                                                        View Details <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" className="h-9 shadow-sm">
                                                        <Download className="h-4 w-4 mr-2" /> Download PDF
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                                    <Search className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium">No subjects found</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Try adjusting your search or filters.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Detail Dialog */}
            <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
                <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
                    <DialogHeader>
                        <DialogTitle>{viewItem?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Course Code</span>
                                <p className="font-semibold">{viewItem?.code}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Credits</span>
                                <p className="font-semibold">{viewItem?.credits}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Branch</span>
                                <p className="font-semibold">{viewItem?.branch}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Semester</span>
                                <p className="font-semibold">{getSemLabel(viewItem?.semester)}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-center space-y-3 bg-muted/10">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium">Syllabus Document</p>
                                <p className="text-xs text-muted-foreground">PDF, 2.4 MB</p>
                            </div>
                            <Button className="w-full sm:w-auto">
                                <Download className="h-4 w-4 mr-2" /> Download Full Syllabus
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
