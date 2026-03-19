import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Download, FileCode, FileText, Loader2, Plus, Search } from 'lucide-react';
import SyllabusForm from '@/components/admin/SyllabusForm';
import { deleteSyllabus, fetchSyllabus, type SyllabusItem } from '@/services/syllabus-service';

export default function SyllabusManagerPage() {
    const [syllabusList, setSyllabusList] = useState<SyllabusItem[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    const loadSyllabus = async () => {
        setLoading(true);
        const data = await fetchSyllabus();
        setSyllabusList(data);
        setLoading(false);
    };

    useEffect(() => {
        loadSyllabus();
    }, []);

    const deleteItem = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;

        const success = await deleteSyllabus(id);
        if (success) {
            setSyllabusList((prev) => prev.filter((item) => item.id !== id && item._id !== id));
            return;
        }

        alert('Failed to delete syllabus item.');
    };

    const filtered = syllabusList.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase())
    );

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return <FileText className="h-4 w-4 text-red-500" />;
            case 'markdown':
                return <FileCode className="h-4 w-4 text-blue-500" />;
            default:
                return <Download className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Syllabus Manager</h1>
                    <p className="text-sm font-medium text-zinc-400">
                        Manage course curriculum and syllabus content.
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-lg bg-white font-medium text-black transition-all hover:bg-zinc-200">
                            <Plus className="mr-2 h-5 w-5" />
                            Add Syllabus
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#09090b] sm:max-w-[600px]">
                        <SyllabusForm
                            onSuccess={() => {
                                setDialogOpen(false);
                                loadSyllabus();
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                    placeholder="Search by title or code..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-10 w-full rounded-full border border-white/5 bg-[#111111] pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/10"
                />
            </div>

            <div className="overflow-hidden rounded-xl border border-white/5 bg-[#050505] shadow-2xl">
                <Table>
                    <TableHeader className="border-b border-white/5 bg-[#0A0A0A]">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="h-12 w-[120px] pl-8 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Code</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Course Title</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Branch / Sem</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Type</TableHead>
                            <TableHead className="h-12 pr-8 text-right text-[11px] font-bold uppercase tracking-widest text-zinc-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 border-none text-center">
                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-zinc-500" />
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 border-none text-center text-zinc-500">
                                    <div className="flex h-full flex-col items-center justify-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                            <Search className="h-8 w-8 opacity-20" />
                                        </div>
                                        <p>No syllabus found matching your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((item) => (
                                <TableRow key={item.id || item._id} className="group border-white/[0.02] transition-colors hover:bg-white/[0.02]">
                                    <TableCell className="pl-8 py-5 font-mono text-sm font-medium text-zinc-400">
                                        {item.code}
                                    </TableCell>
                                    <TableCell className="py-5 text-base font-semibold text-white">
                                        {item.title}
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-zinc-300">{item.branch}</span>
                                            <span className="text-xs text-zinc-500">Semester {item.semester}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex items-center gap-3">
                                            {getTypeIcon(item.type)}
                                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">{item.type}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5 pr-8 text-right">
                                        <button
                                            onClick={() => deleteItem(item.id || item._id || '')}
                                            className="text-xs font-medium text-zinc-500 transition-colors hover:text-white"
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
