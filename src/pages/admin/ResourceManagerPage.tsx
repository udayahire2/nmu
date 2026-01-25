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
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ResourceForm from "./ResourceForm";

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

    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchResources = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/v1/resources');
            const data = await res.json();
            if (data.success) {
                setResources(data.data.map((r: any) => ({ ...r, id: r._id })));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const deleteResource = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/v1/resources/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchResources();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
                    <p className="text-muted-foreground">Manage study materials and lectures.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <ResourceForm onSuccess={() => {
                            // Close dialog hack or better state management
                            document.getElementById('close-dialog')?.click();
                            fetchResources();
                            // In a real app we'd control the dialog open state
                            window.location.reload(); // Quick refresh for now
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter resources..."
                    value={search}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No resources found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((resource) => (
                                <TableRow key={resource.id}>
                                    <TableCell className="font-medium">
                                        {resource.title}
                                    </TableCell>
                                    <TableCell>{resource.subject}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{resource.type}</Badge>
                                    </TableCell>
                                    <TableCell>{resource.author}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(resource.id)}>
                                                    Copy ID
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>View details</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deleteResource(resource.id)} className="text-destructive focus:text-destructive">
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
        </div>
    );
}
