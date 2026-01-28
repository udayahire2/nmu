import { useState } from 'react';
import { DUMMY_RESOURCES } from "@/lib/dummy-data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Search, FileText, Video, File } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ResourceForm from "./ResourceForm";
import { Card, CardHeader } from "@/components/ui/card";

export default function ResourceManagerPage() {
    interface Resource {
        id: string;
        _id: string;
        title: string;
        subject: string;
        type: string;
        createdAt: string;
        author: string;
    }

    const [resources, setResources] = useState<Resource[]>(DUMMY_RESOURCES);
    const [search, setSearch] = useState("");

    const deleteResource = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        setResources(prev => prev.filter(r => r.id !== id));
        alert("Resource deleted (simulated)");
    };

    const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
            case 'video': return <Video className="h-4 w-4 text-blue-500" />;
            default: return <File className="h-4 w-4 text-gray-500" />;
        }
    };

    // Bento Stats Data
    const stats = [
        { label: "Total Resources", value: "1,204", change: "+12%", trend: "up", color: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/20", text: "text-blue-500" },
        { label: "Active Users", value: "8,540", change: "+24%", trend: "up", color: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/20", text: "text-purple-500" },
        { label: "Storage Used", value: "45.2 GB", change: "85%", trend: "neutral", color: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/20", text: "text-orange-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Resource Manager
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage and organize your study materials.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] border border-white/10 rounded-xl transition-all active:scale-99">
                            <Plus className="h-5 w-5 mr-2" />
                            Add New Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#09090b] border-white/10">
                        <ResourceForm onSuccess={() => {
                            document.getElementById('close-dialog')?.click();
                            alert("Resource added (simulated)");
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`p-6 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.color} backdrop-blur-xl relative overflow-hidden group`}>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-foreground tracking-tight">{stat.value}</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 ${stat.text}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Glass Table Container */}
            <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, subject..."
                            value={search}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                            className="pl-10 h-10 bg-black/20 border-white/10 focus:bg-black/40 focus:border-primary/50 rounded-xl transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="h-8 px-3 rounded-lg border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 transition-colors cursor-pointer">
                            Filter
                        </Badge>
                        <Badge variant="outline" className="h-8 px-3 rounded-lg border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 transition-colors cursor-pointer">
                            Sort
                        </Badge>
                    </div>
                </CardHeader>
                <div className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-white/5">
                                <TableHead className="w-[400px] pl-6 h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Resource Name</TableHead>
                                <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Subject</TableHead>
                                <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Type</TableHead>
                                <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Author</TableHead>
                                <TableHead className="text-right pr-6 h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center text-muted-foreground flex flex-col items-center justify-center">
                                        <div className="h-16 w-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                            <Search className="h-8 w-8 opacity-20" />
                                        </div>
                                        <p>No resources found matching your search.</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((resource) => (
                                    <TableRow key={resource.id} className="group border-white/5 hover:bg-white/[0.02] transition-colors data-[state=selected]:bg-white/[0.04]">
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`
                                                    h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110
                                                    ${resource.type.toLowerCase() === 'pdf' ? 'bg-red-500/10 text-red-500' :
                                                        resource.type.toLowerCase() === 'video' ? 'bg-blue-500/10 text-blue-500' :
                                                            'bg-emerald-500/10 text-emerald-500'}
                                                `}>
                                                    {getTypeIcon(resource.type)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground/90 text-sm group-hover:text-primary transition-colors">{resource.title}</span>
                                                    <span className="text-xs text-muted-foreground">{resource.createdAt}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                                                <span className="text-sm text-muted-foreground font-medium">{resource.subject}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-medium bg-white/5 hover:bg-white/10 border-white/5 text-foreground/80 px-2.5 py-0.5 rounded-lg">
                                                {resource.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex -space-x-2 overflow-hidden">
                                                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-black bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                                                    {resource.author.charAt(0)}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 bg-black/90 backdrop-blur-xl border-white/10">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="cursor-pointer focus:bg-white/10" onClick={() => navigator.clipboard.writeText(resource.id)}>
                                                        Copy ID
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer focus:bg-white/10">View details</DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem onClick={() => deleteResource(resource.id)} className="text-red-500 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                                                        Delete Resource
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
