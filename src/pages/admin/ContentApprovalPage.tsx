import { useState } from 'react';
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
import { Check, X, FileText, Video, File, Search, Clock, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data for Student Uploads
const MOCK_REQUESTS = [
    {
        id: "REQ-001",
        title: "Advanced React Patterns",
        subject: "Web Development",
        type: "pdf",
        author: "Alex Johnson (Student)",
        submittedAt: "2 hours ago",
        status: "pending",
        url: "#"
    },
    {
        id: "REQ-002",
        title: "Data Structures - Trees",
        subject: "DSA",
        type: "video",
        author: "Samantha Lee (Student)",
        submittedAt: "5 hours ago",
        status: "pending",
        url: "#"
    },
    {
        id: "REQ-003",
        title: "Operating Systems Notes",
        subject: "OS",
        type: "doc",
        author: "Rahul Gupta (Student)",
        submittedAt: "1 day ago",
        status: "approved",
        url: "#"
    },
    {
        id: "REQ-004",
        title: "Invalid File Test",
        subject: "Testing",
        type: "pdf",
        author: "John Doe (Student)",
        submittedAt: "2 days ago",
        status: "rejected",
        url: "#"
    }
];

export default function ContentApprovalPage() {
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [search, setSearch] = useState("");

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        if (!window.confirm(`Are you sure you want to ${action} this content?`)) return;

        setRequests(prev => prev.map(req => {
            if (req.id === id) {
                return { ...req, status: action === 'approve' ? 'approved' : 'rejected' };
            }
            return req;
        }));

        alert(`Content ${action}ed successfully!`);
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
            case 'video': return <Video className="h-4 w-4 text-blue-500" />;
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
    const filteredRequests = requests.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Content Approvals
                </h1>
                <p className="text-muted-foreground text-sm font-medium">Verify and manage student study material submissions.</p>
            </div>

            <Tabs defaultValue="pending" className="w-full space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <TabsList className="bg-transparent border-0 p-0 h-auto gap-2">
                        <TabsTrigger
                            value="pending"
                            className="h-9 px-4 rounded-full border border-white/5 bg-black/20 data-[state=active]:bg-white/10 data-[state=active]:border-white/10 data-[state=active]:text-white transition-all"
                        >
                            Pending Requests
                            <Badge className="ml-2 h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px]">
                                {requests.filter(r => r.status === 'pending').length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="h-9 px-4 rounded-full border border-white/5 bg-black/20 data-[state=active]:bg-white/10 data-[state=active]:border-white/10 data-[state=active]:text-white transition-all"
                        >
                            Approval History
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
                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
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
                                    {filteredRequests.filter(r => r.status === 'pending').length === 0 ? (
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
                                        filteredRequests.filter(r => r.status === 'pending').map((req) => (
                                            <TableRow key={req.id} className="group border-white/5 hover:bg-white/[0.02] transition-colors">
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
                                                        {req.submittedAt}
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
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20"
                                                            onClick={() => handleAction(req.id, 'approve')}
                                                        >
                                                            <Check className="h-4 w-4 mr-1.5" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-8 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                                                            onClick={() => handleAction(req.id, 'reject')}
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
                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="border-b border-white/5 bg-white/5 px-6 py-4">
                            <CardTitle className="text-lg font-medium">History</CardTitle>
                            <CardDescription>Past approval and rejection actions.</CardDescription>
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
                                    {filteredRequests.filter(r => r.status !== 'pending').map((req) => (
                                        <TableRow key={req.id} className="group border-white/5 hover:bg-white/[0.02]">
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
                                                {req.submittedAt}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
