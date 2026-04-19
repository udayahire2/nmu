import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    TrendingUp,
    Users,
    BarChart3,
    Loader2,
    FileText,
    Search,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import {
    fetchPendingMaterials,
    fetchApprovedMaterials,
    updateMaterialStatus,
    type StudyMaterial,
} from "@/services/study-service";
import { buildApiUrl, parseApiData } from "@/services/api";

// Type for stats from API
interface AdminStats {
    totalUsers: number;
    newUsers: number;
    totalResources: number;
    newResources: number;
    // add other fields as needed
}

export default function DashboardPage() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [pendingMaterials, setPendingMaterials] = useState<StudyMaterial[]>([]);
    const [approvedMaterials, setApprovedMaterials] = useState<StudyMaterial[]>(
        []
    );
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await fetch(buildApiUrl("/admin/stats"), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.success) {
                    setStats(parseApiData(data, null));
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        loadMaterials();
    }, []);

    const loadMaterials = async () => {
        const pending = await fetchPendingMaterials();
        setPendingMaterials(pending);
        const approved = await fetchApprovedMaterials();
        setApprovedMaterials(approved);
    };

    const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
        const result = await updateMaterialStatus(id, status);
        if (result) {
            loadMaterials();
        }
    };

    // Filter materials by search query (title or author)
    const filterMaterials = (materials: StudyMaterial[]) => {
        if (!searchQuery.trim()) return materials;
        const q = searchQuery.toLowerCase();
        return materials.filter(
            (m) =>
                m.title.toLowerCase().includes(q) ||
                (m.author && m.author.toLowerCase().includes(q))
        );
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Stats cards data
    const statCards = [
        {
            title: "Total Users",
            value: stats?.totalUsers ?? 0,
            change: stats?.newUsers ?? 0,
            icon: Users,
            description: "Registered students",
        },
        {
            title: "Total Resources",
            value: stats?.totalResources ?? 0,
            change: stats?.newResources ?? 0,
            icon: FileText,
            description: "Study materials",
        },
        {
            title: "Active Sessions",
            value: 42,
            change: 12,
            icon: TrendingUp,
            description: "Current active users",
        },
        {
            title: "Storage Used",
            value: "4.2 GB",
            change: 68,
            icon: BarChart3,
            description: "of 6 GB limit",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your platform's performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <Card key={idx} className="border-border/60 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.change > 0 ? `+${stat.change}` : stat.change}{" "}
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Approvals Section */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Content Approvals</h2>
                    <p className="text-muted-foreground text-sm">
                        Verify and manage student study material submissions.
                    </p>
                </div>

                <Tabs defaultValue="pending" className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <TabsList>
                            <TabsTrigger value="pending">
                                Pending{" "}
                                <Badge variant="secondary" className="ml-2">
                                    {pendingMaterials.length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="approved">
                                Approved History
                            </TabsTrigger>
                        </TabsList>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search requests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <TabsContent value="pending" className="space-y-4">
                        <MaterialTable
                            materials={filterMaterials(pendingMaterials)}
                            showActions={true}
                            onApprove={(id) => handleStatusUpdate(id, "approved")}
                            onReject={(id) => handleStatusUpdate(id, "rejected")}
                        />
                    </TabsContent>

                    <TabsContent value="approved" className="space-y-4">
                        <MaterialTable
                            materials={filterMaterials(approvedMaterials)}
                            showActions={false}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Extra metrics (optional) */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-border/60 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Response Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128ms</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-emerald-600 dark:text-emerald-400">-5%</span> faster than last week
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Reusable table component for materials
function MaterialTable({
    materials,
    showActions,
    onApprove,
    onReject,
}: {
    materials: StudyMaterial[];
    showActions: boolean;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
}) {
    if (materials.length === 0) {
        return (
            <div className="border rounded-lg p-12 text-center text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>All caught up! No requests to show.</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow>
                        <TableHead className="w-[300px]">Content Details</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        {showActions && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {materials.map((material) => (
                        <TableRow key={material._id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-md bg-muted">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{material.title}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {material.type}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{material.author || "Unknown"}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                                {new Date(material.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        material.status === "approved"
                                            ? "default"
                                            : material.status === "rejected"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    {material.status}
                                </Badge>
                            </TableCell>
                            {showActions && (
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onReject?.(material._id)}
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onApprove?.(material._id)}
                                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}