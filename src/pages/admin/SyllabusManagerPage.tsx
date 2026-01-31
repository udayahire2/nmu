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
import { Input } from "@/components/ui/input";

import { Plus, Search, FileText, Download, FileCode } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SyllabusForm from "@/components/admin/SyllabusForm";
import { fetchSyllabus, deleteSyllabus, type SyllabusItem } from "@/services/syllabus-service";

export default function SyllabusManagerPage() {
    const [syllabusList, setSyllabusList] = useState<SyllabusItem[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadSyllabus();
    }, []);

    const loadSyllabus = async () => {
        const data = await fetchSyllabus();
        setSyllabusList(data);
    };

    const deleteItem = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        const success = await deleteSyllabus(id);
        if (success) {
            setSyllabusList(prev => prev.filter(item => item.id !== id && item._id !== id));
        } else {
            alert("Failed to delete syllabus item.");
        }
    };

    const filtered = syllabusList.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase())
    );

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
            case 'markdown': return <FileCode className="h-4 w-4 text-blue-500" />;
            default: return <Download className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-8 p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Syllabus Manager
                    </h1>
                    <p className="text-zinc-400 text-sm font-medium">Manage course curriculum and syllabus content.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-lg font-medium transition-all active:scale-95">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Syllabus
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#09090b] border-white/10">
                        <SyllabusForm onSuccess={() => {
                            document.getElementById('close-dialog')?.click();
                            loadSyllabus(); // Reload list after add
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search Bar Container */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search by title or code..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-full bg-[#111111] border border-white/5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/10"
                    />
                </div>
            </div>

            {/* Dark Table Container */}
            <div className="border border-white/5 bg-[#050505] rounded-xl overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-[#0A0A0A] border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-white/5">
                            <TableHead className="w-[120px] pl-8 h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Code</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Course Title</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Branch / Sem</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Type</TableHead>
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
                                        <p>No syllabus found matching your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((item) => (
                                <TableRow key={item.id || item._id} className="group border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                                    <TableCell className="pl-8 font-mono text-sm text-zinc-400 font-medium py-5">
                                        {item.code}
                                    </TableCell>
                                    <TableCell className="text-base font-semibold text-white py-5">
                                        {item.title}
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-zinc-300">{item.branch}</span>
                                            <span className="text-xs text-zinc-500">{item.semester}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex items-center gap-3">
                                            {getTypeIcon(item.type)}
                                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">{item.type}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-8 py-5">
                                        <button
                                            onClick={() => deleteItem(item.id || item._id || "")}
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
