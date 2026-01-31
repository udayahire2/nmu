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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Search, FileText, Download, FileCode } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader } from "@/components/ui/card";
import SyllabusForm from "@/components/admin/SyllabusForm";

// Dummy Data
const DUMMY_SYLLABUS = [
    { id: "1", title: "Data Structures", code: "CS301", branch: "Computer Science", semester: "Semester 3", type: "pdf", credits: 4, updatedAt: "2024-03-10" },
    { id: "2", title: "Operating Systems", code: "CS402", branch: "Computer Science", semester: "Semester 4", type: "markdown", credits: 4, updatedAt: "2024-03-12" },
    { id: "3", title: "Engineering Physics", code: "PH101", branch: "All", semester: "Semester 1", type: "pdf", credits: 4, updatedAt: "2024-01-15" },
];

export default function SyllabusManagerPage() {
    const [syllabusList, setSyllabusList] = useState(DUMMY_SYLLABUS);
    const [search, setSearch] = useState("");

    const deleteItem = (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        setSyllabusList(prev => prev.filter(item => item.id !== id));
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
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Syllabus Manager
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage course curriculum and syllabus content.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] border border-white/10 rounded-xl transition-all active:scale-99">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Syllabus
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#09090b] border-white/10">
                        <SyllabusForm onSuccess={() => {
                            document.getElementById('close-dialog')?.click();
                            alert("Syllabus added (simulated)");
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Glass Table Container */}
            <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title or code..."
                            value={search}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                            className="pl-10 h-10 bg-black/20 border-white/10 focus:bg-black/40 focus:border-primary/50 rounded-xl transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                </CardHeader>
                <div className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-white/5">
                                <TableHead className="w-[100px] pl-6 h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Code</TableHead>
                                <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Course Title</TableHead>
                                <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Branch / Sem</TableHead>
                                <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Type</TableHead>
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
                                        <p>No syllabus found matching your search.</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((item) => (
                                    <TableRow key={item.id} className="group border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                                            {item.code}
                                        </TableCell>
                                        <TableCell className="font-medium text-foreground/90">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-foreground/80">{item.branch}</span>
                                                <span className="text-[10px] text-muted-foreground">{item.semester}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(item.type)}
                                                <span className="text-xs uppercase">{item.type}</span>
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
                                                    <DropdownMenuItem className="cursor-pointer focus:bg-white/10" onClick={() => alert("Edit clicked")}>
                                                        Edit Syllabus
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer focus:bg-white/10" onClick={() => alert("View clicked")}>
                                                        View Content
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem onClick={() => deleteItem(item.id)} className="text-red-500 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                                                        Delete
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
