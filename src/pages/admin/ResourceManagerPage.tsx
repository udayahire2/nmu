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
import { Plus, Search, FileText, Video, File } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ResourceForm from "@/components/admin/ResourceForm";

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


    return (
        <div className="space-y-8 p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Resource Manager
                    </h1>
                    <p className="text-zinc-400 text-sm font-medium">Manage and organize your study materials.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-lg font-medium transition-all active:scale-95">
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

            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search by title, subject..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-full bg-[#111111] border border-white/5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="h-9 px-4 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 font-medium text-sm border border-white/5">
                        Filter
                    </Button>
                    <Button variant="ghost" className="h-9 px-4 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 font-medium text-sm border border-white/5">
                        Sort
                    </Button>
                </div>
            </div>

            {/* Dark Table Container */}
            <div className="border border-white/5 bg-[#050505] rounded-xl overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-[#0A0A0A] border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-white/5">
                            <TableHead className="w-[400px] pl-8 h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Resource Name</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Subject</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Type</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Author</TableHead>
                            <TableHead className="text-right pr-8 h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center text-zinc-500 border-none">
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="h-16 w-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                            <Search className="h-8 w-8 opacity-20" />
                                        </div>
                                        <p>No resources found matching your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((resource) => (
                                <TableRow key={resource.id} className="group border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                                    <TableCell className="pl-8 py-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`
                                                mt-1 h-10 w-10 rounded-xl flex items-center justify-center
                                                ${resource.type.toLowerCase() === 'pdf' ? 'bg-red-500/10 text-red-500' :
                                                    resource.type.toLowerCase() === 'video' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-emerald-500/10 text-emerald-500'}
                                            `}>
                                                {getTypeIcon(resource.type)}
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-semibold text-white text-base">{resource.title}</span>
                                                <span className="text-xs text-zinc-500 font-mono tracking-wide">{resource.createdAt.replace("T", " ").replace("Z", "")}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                            <span className="text-sm text-zinc-300 font-medium">{resource.subject}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant="secondary" className="bg-[#111111] hover:bg-[#1A1A1A] text-zinc-400 border border-white/5 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider font-bold">
                                            {resource.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="h-8 w-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-indigo-400">{resource.author.charAt(0)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8 py-4">
                                        <button
                                            onClick={() => deleteResource(resource.id)}
                                            className="text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
