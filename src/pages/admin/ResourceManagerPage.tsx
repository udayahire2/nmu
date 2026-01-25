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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">Resources</h1>
                    <p className="text-muted-foreground mt-1">Manage study materials, lectures, and notes.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="shadow-lg hover:shadow-primary/25 transition-all">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <ResourceForm onSuccess={() => {
                            document.getElementById('close-dialog')?.click();
                            alert("Resource added (simulated)");
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="p-4 border-b border-border/50 bg-muted/20">
                    <div className="flex items-center justify-between">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search resources..."
                                value={search}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                                className="pl-9 bg-background/50 border-border/50 focus:bg-background"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground hidden sm:block">
                            Showing {filtered.length} resources
                        </div>
                    </div>
                </CardHeader>
                <div className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-transparent hover:bg-transparent">
                                <TableHead className="w-[400px]">Title</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                        No resources found matching your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((resource) => (
                                    <TableRow key={resource.id} className="hover:bg-muted/30 transition-colors group">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors">
                                                    {getTypeIcon(resource.type)}
                                                </div>
                                                <div className="font-medium">{resource.title}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{resource.subject}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-normal bg-primary/5 text-primary hover:bg-primary/10">
                                                {resource.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] font-bold">
                                                    {resource.author.charAt(0)}
                                                </div>
                                                <span className="text-sm">{resource.author}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => deleteResource(resource.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
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
