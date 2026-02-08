import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, FileText, Video, File, Search, Clock, Eye, RefreshCw, Loader2, BookOpen, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchPendingMaterials, fetchApprovedMaterials, updateMaterialStatus, type StudyMaterial } from '@/services/study-service';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ContentApprovalPage() {
    const [pendingRequests, setPendingRequests] = useState<StudyMaterial[]>([]);
    const [historyRequests, setHistoryRequests] = useState<StudyMaterial[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [viewingRequest, setViewingRequest] = useState<StudyMaterial | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [pending, approved] = await Promise.all([
                fetchPendingMaterials(),
                fetchApprovedMaterials()
            ]);
            setPendingRequests(pending);
            // Note: Currently API gets approved
            setHistoryRequests(approved);
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        const status = action === 'approve' ? 'approved' : 'rejected';

        // Optimistic update
        const request = pendingRequests.find(r => r._id === id);
        if (!request) return;

        setPendingRequests(prev => prev.filter(r => r._id !== id));
        if (action === 'approve') {
            setHistoryRequests(prev => [{ ...request, status: 'approved' }, ...prev]);
        }

        const result = await updateMaterialStatus(id, status);
        if (result) {
            toast.success(`Content ${status} successfully!`);
        } else {
            toast.error(`Failed to ${action} content`);
            loadData(); // Revert
        }
    };

    const getTypeIcon = (type: string) => {
        switch ((type || '').toLowerCase()) {
            case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
            case 'video': return <Video className="h-4 w-4 text-blue-500" />;
            case 'notes': return <BookOpen className="h-4 w-4 text-emerald-500" />;
            default: return <File className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Approved</Badge>;
            case 'rejected':
                return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Rejected</Badge>;
            default:
                return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Pending</Badge>;
        }
    };

    // Filtered requests based on search
    const filteredPending = pendingRequests.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.author.toLowerCase().includes(search.toLowerCase())
    );

    const filteredHistory = historyRequests.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Content Approvals
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">Verify and manage student study material submissions.</p>
                </div>
                <Button variant="outline" size="sm" onClick={loadData} disabled={loading} className="w-fit">
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Data
                </Button>
            </div>

            <Tabs defaultValue="pending" className="w-full space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <TabsList className="bg-transparent border-0 p-0 h-auto gap-2">
                        <TabsTrigger
                            value="pending"
                            className="h-9 px-4 rounded-full border border-white/5 bg-black/20 data-[state=active]:bg-white/10 data-[state=active]:border-white/10 data-[state=active]:text-white transition-all"
                        >
                            Pending
                            <Badge className="ml-2 h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px]">
                                {pendingRequests.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="h-9 px-4 rounded-full border border-white/5 bg-black/20 data-[state=active]:bg-white/10 data-[state=active]:border-white/10 data-[state=active]:text-white transition-all"
                        >
                            Approved History
                        </TabsTrigger>
                    </TabsList>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search requests..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-10 bg-black/20 border-white/10 focus:bg-black/40 rounded-xl"
                        />
                    </div>
                </div>

                <TabsContent value="pending" className="mt-0">
                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden min-h-[400px]">
                        <CardHeader className="border-b border-white/5 bg-white/5 px-6 py-4">
                            <CardTitle className="text-lg font-medium">Pending Submissions</CardTitle>
                            <CardDescription>Review and take action on new content uploads.</CardDescription>
                        </CardHeader>
                        <div className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-white/5">
                                        <TableHead className="pl-6">Content Details</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right pr-6">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-64 text-center">
                                                <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredPending.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
                                                        <Check className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                    <p>All caught up! No pending requests.</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredPending.map((req) => (
                                            <TableRow key={req._id} className="group border-white/5 hover:bg-white/2 transition-colors">
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                                                            {getTypeIcon(req.type)}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-semibold text-sm text-white">{req.title}</p>
                                                            <p className="text-xs text-muted-foreground">{req.subject}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-foreground/80">{req.author}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(req.createdAt).toLocaleDateString()}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(req.status)}
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10"
                                                            title="View Content"
                                                            onClick={() => setViewingRequest(req)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20"
                                                            onClick={() => handleAction(req._id, 'approve')}
                                                        >
                                                            <Check className="h-4 w-4 mr-1.5" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                                                            onClick={() => handleAction(req._id, 'reject')}
                                                        >
                                                            <X className="h-4 w-4 mr-1.5" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden min-h-[400px]">
                        <CardHeader className="border-b border-white/5 bg-white/5 px-6 py-4">
                            <CardTitle className="text-lg font-medium">History</CardTitle>
                            <CardDescription>Recently approved content.</CardDescription>
                        </CardHeader>
                        <div className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-white/5">
                                        <TableHead className="pl-6">Content Details</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right pr-6">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-64 text-center">
                                                <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredHistory.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-64 text-center text-muted-foreground">
                                                No history available.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredHistory.map((req) => (
                                            <TableRow key={req._id} className="group border-white/5 hover:bg-white/[0.02]">
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center opacity-60">
                                                            {getTypeIcon(req.type)}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-semibold text-sm text-foreground/70">{req.title}</p>
                                                            <p className="text-xs text-muted-foreground">{req.subject}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-muted-foreground">{req.author}</span>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(req.status)}
                                                </TableCell>
                                                <TableCell className="text-right pr-6 text-sm text-muted-foreground">
                                                    {new Date(req.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Preview Modal */}
            <Dialog open={!!viewingRequest} onOpenChange={(open) => !open && setViewingRequest(null)}>
                <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50">
                    <DialogHeader className="p-4 border-b border-border/40 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${viewingRequest?.type.toLowerCase() === 'video' ? 'bg-red-500/10 text-red-500' :
                                viewingRequest?.type.toLowerCase() === 'pdf' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
                                }`}>
                                {viewingRequest && getTypeIcon(viewingRequest.type)}
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold leading-none mb-1">
                                    {viewingRequest?.title}
                                </DialogTitle>
                                <p className="text-xs text-muted-foreground">
                                    {viewingRequest?.subject} • {viewingRequest?.author}
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 bg-muted/20 min-h-[60vh] relative flex items-center justify-center">
                        {viewingRequest?.type.toLowerCase() === 'video' ? (
                            <iframe
                                src={viewingRequest.url}
                                className="w-full h-[60vh]"
                                title={viewingRequest.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : viewingRequest?.type.toLowerCase() === 'pdf' ? (
                            <iframe
                                src={viewingRequest.url || (viewingRequest.filePath ? `http://localhost:5001${viewingRequest.filePath}` : '')}
                                className="w-full h-[80vh]"
                                title={viewingRequest.title}
                            />
                        ) : (
                            <div className="text-center p-10">
                                <h3 className="text-lg font-medium text-foreground">Preview Not Available</h3>
                                {viewingRequest?.url && (
                                    <a href={viewingRequest.url} target="_blank" rel="noreferrer">
                                        <Button className="mt-4" variant="outline">
                                            <ExternalLink className="mr-2 h-4 w-4" /> Open Link
                                        </Button>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
