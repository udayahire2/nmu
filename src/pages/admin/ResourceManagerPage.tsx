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
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { File, FileText, Loader2, Plus, Search, Video } from 'lucide-react';
import ResourceForm from '@/components/admin/ResourceForm';
import {
    deleteResource as deleteResourceById,
    fetchResources,
    type ResourceItem,
} from '@/services/resource-service';

export default function ResourceManagerPage() {
    const [resources, setResources] = useState<ResourceItem[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    const loadResources = async () => {
        setLoading(true);
        const data = await fetchResources();
        setResources(data);
        setLoading(false);
    };

    useEffect(() => {
        loadResources();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;

        const success = await deleteResourceById(id);

        if (success) {
            setResources((prev) => prev.filter((resource) => resource._id !== id));
            return;
        }

        alert('Failed to delete resource.');
    };

    const filtered = resources.filter((resource) =>
        [resource.title, resource.subject, resource.author]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return <FileText className="h-4 w-4 text-red-500" />;
            case 'video':
                return <Video className="h-4 w-4 text-blue-500" />;
            default:
                return <File className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Resource Manager</h1>
                    <p className="text-sm font-medium text-zinc-400">
                        Manage and organize published study resources.
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-lg bg-white font-medium text-black transition-all hover:bg-zinc-200">
                            <Plus className="mr-2 h-5 w-5" />
                            Add New Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#09090b] sm:max-w-[600px]">
                        <ResourceForm
                            onSuccess={() => {
                                setDialogOpen(false);
                                loadResources();
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Search by title, subject..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="h-10 w-full rounded-full border border-white/5 bg-[#111111] pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/10"
                    />
                </div>
                <Button variant="ghost" className="h-9 rounded-full border border-white/5 px-4 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white">
                    {resources.length} total
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/5 bg-[#050505] shadow-2xl">
                <Table>
                    <TableHeader className="border-b border-white/5 bg-[#0A0A0A]">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="h-12 w-[400px] pl-8 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Resource Name</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Subject</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Type</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Author</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Year</TableHead>
                            <TableHead className="h-12 pr-8 text-right text-[11px] font-bold uppercase tracking-widest text-zinc-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-48 border-none text-center">
                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-zinc-500" />
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 border-none text-center text-zinc-500">
                                    <div className="flex h-full flex-col items-center justify-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                            <Search className="h-8 w-8 opacity-20" />
                                        </div>
                                        <p>No resources found matching your search.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((resource) => (
                                <TableRow key={resource._id} className="group border-white/[0.02] transition-colors hover:bg-white/[0.02]">
                                    <TableCell className="pl-8 py-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-xl ${resource.type.toLowerCase() === 'pdf'
                                                ? 'bg-red-500/10 text-red-500'
                                                : resource.type.toLowerCase() === 'video'
                                                    ? 'bg-blue-500/10 text-blue-500'
                                                    : 'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                {getTypeIcon(resource.type)}
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-base font-semibold text-white">{resource.title}</span>
                                                <span className="font-mono text-xs tracking-wide text-zinc-500">
                                                    {(resource.createdAt || '').replace('T', ' ').replace('Z', '')}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm font-medium text-zinc-300">{resource.subject}</TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant="secondary" className="rounded-md border border-white/5 bg-[#111111] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:bg-[#1A1A1A]">
                                            {resource.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-zinc-300">{resource.author}</TableCell>
                                    <TableCell className="py-4 text-sm text-zinc-400">{resource.year}</TableCell>
                                    <TableCell className="py-4 pr-8 text-right">
                                        <button
                                            onClick={() => handleDelete(resource._id)}
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
