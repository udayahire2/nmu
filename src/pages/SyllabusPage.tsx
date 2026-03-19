import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import MarkdownPreview from '@/components/ui/markdown-preview';
import { fetchSyllabus, type SyllabusItem } from '@/services/syllabus-service';
import {
    AlertCircle,
    Book,
    ChevronRight,
    Download,
    ExternalLink,
    FileText,
    Filter,
    Loader2,
    RefreshCw,
    Search,
} from 'lucide-react';

export default function SyllabusPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [selectedSemester, setSelectedSemester] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
    const [viewItem, setViewItem] = useState<SyllabusItem | null>(null);

    const loadSyllabus = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchSyllabus();
            setSyllabus(data);
        } catch (loadError) {
            console.error(loadError);
            setError('Failed to load syllabus.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSyllabus();
    }, []);

    const branchOptions = useMemo(
        () => ['All', ...Array.from(new Set(syllabus.map((item) => item.branch))).sort()],
        [syllabus]
    );

    const semesterOptions = useMemo(
        () => ['All', ...Array.from(new Set(syllabus.map((item) => item.semester))).sort((a, b) => Number(a) - Number(b))],
        [syllabus]
    );

    const filteredSyllabus = syllabus.filter((item) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.code.toLowerCase().includes(query);
        const matchesBranch = selectedBranch === 'All' || item.branch === selectedBranch;
        const matchesSemester = selectedSemester === 'All' || item.semester === selectedSemester;

        return matchesSearch && matchesBranch && matchesSemester;
    });

    return (
        <div className="relative min-h-screen space-y-8 bg-transparent pb-20">
            <div className="fixed inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute left-1/4 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-primary/5 blur-[120px] opacity-40" />
                <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10 flex flex-col items-center overflow-hidden px-6 pb-12 pt-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-3xl space-y-6"
                >
                    <div className="flex justify-center">
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1.5 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary shadow-sm backdrop-blur-md"
                        >
                            <Book className="h-3 w-3" />
                            Curriculum & Course Content
                        </Badge>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        University <span className="relative inline-block text-primary">Syllabus</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                        Explore detailed syllabus, credits, and course structures for all semesters and branches.
                    </p>
                </motion.div>
            </div>

            <div className="sticky top-[4.5rem] z-40 w-full border-y border-border/40 bg-background/70 shadow-sm backdrop-blur-xl transition-all duration-200">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row md:px-6">
                    <div className="group relative w-full md:max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        </div>
                        <Input
                            placeholder="Search by subject name or code..."
                            className="h-10 rounded-xl border-transparent bg-secondary/50 pl-10 transition-all hover:bg-secondary/70 focus:border-primary/30 focus:bg-background"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </div>

                    <div className="flex w-full gap-2 md:w-auto">
                        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                            <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background md:w-[200px]">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                                    <SelectValue placeholder="Select branch" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {branchOptions.map((branch) => (
                                    <SelectItem key={branch} value={branch}>
                                        {branch === 'All' ? 'All Branches' : branch}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background md:w-[180px]">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesterOptions.map((semester) => (
                                    <SelectItem key={semester} value={semester}>
                                        {semester === 'All' ? 'All Semesters' : `Semester ${semester}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="container mx-auto min-h-[500px] px-4 md:px-6">
                {loading && (
                    <div className="flex h-64 flex-col items-center justify-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="animate-pulse text-sm font-medium text-muted-foreground">Loading syllabus...</p>
                    </div>
                )}

                {!loading && error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                            <AlertCircle className="h-7 w-7 text-destructive" />
                        </div>
                        <h3 className="text-lg font-medium">Unable to load syllabus</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                        <Button variant="outline" onClick={loadSyllabus} className="mt-4 gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                    </motion.div>
                )}

                {!loading && !error && (
                    <AnimatePresence mode="popLayout">
                        {filteredSyllabus.length > 0 ? (
                            <div className="grid gap-4">
                                {filteredSyllabus.map((item, index) => (
                                    <motion.div
                                        layout
                                        key={item._id || item.code}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.04 }}
                                    >
                                        <Card className="group border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-md">
                                            <div className="flex flex-col justify-between gap-4 p-4 md:flex-row md:items-center md:p-6">
                                                <div className="flex-1 space-y-1">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Badge variant="secondary" className="border-primary/20 bg-primary/10 font-mono text-[10px] uppercase text-primary">
                                                            {item.code}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                                            {item.type}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">• {item.credits} Credits</span>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.branch} • Semester {item.semester}
                                                    </p>
                                                </div>

                                                <div className="mt-2 flex items-center gap-3 md:mt-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-9 gap-2 text-muted-foreground hover:text-foreground"
                                                        onClick={() => setViewItem(item)}
                                                    >
                                                        View Details
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="h-9 shadow-sm"
                                                        onClick={() => setViewItem(item)}
                                                    >
                                                        <Download className="mr-2 h-4 w-4" />
                                                        {item.type === 'markdown' ? 'Open Content' : 'Open File'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                                    <Search className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium">No subjects found</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
                <DialogContent className="max-w-3xl border-border/50 bg-background/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle>{viewItem?.title}</DialogTitle>
                    </DialogHeader>

                    {viewItem && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1 rounded-lg bg-secondary/50 p-3">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Course Code</span>
                                    <p className="font-semibold">{viewItem.code}</p>
                                </div>
                                <div className="space-y-1 rounded-lg bg-secondary/50 p-3">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Credits</span>
                                    <p className="font-semibold">{viewItem.credits}</p>
                                </div>
                                <div className="space-y-1 rounded-lg bg-secondary/50 p-3">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Branch</span>
                                    <p className="font-semibold">{viewItem.branch}</p>
                                </div>
                                <div className="space-y-1 rounded-lg bg-secondary/50 p-3">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Semester</span>
                                    <p className="font-semibold">Semester {viewItem.semester}</p>
                                </div>
                            </div>

                            {viewItem.type === 'markdown' ? (
                                <div className="max-h-[60vh] overflow-hidden rounded-lg border border-border/50">
                                    <MarkdownPreview content={viewItem.contentUrl} className="max-h-[60vh]" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed border-border bg-muted/10 p-6 text-center">
                                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium">Syllabus Document</p>
                                        <p className="text-xs text-muted-foreground">Open the uploaded syllabus file in a new tab.</p>
                                    </div>
                                    <Button asChild>
                                        <a href={viewItem.contentUrl} target="_blank" rel="noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Open Syllabus
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
