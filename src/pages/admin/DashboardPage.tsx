import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Users, BarChart3, Loader2, FileText, Search, CheckCircle2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DUMMY_STATS } from "@/lib/dummy-data";
import { fetchPendingMaterials, fetchApprovedMaterials, updateMaterialStatus, type StudyMaterial } from "@/services/study-service";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [pendingMaterials, setPendingMaterials] = useState<StudyMaterial[]>([]);
    const [approvedMaterials, setApprovedMaterials] = useState<StudyMaterial[]>([]);
    const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
                const res = await fetch(`${API_URL}/admin/stats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
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

    const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
        const result = await updateMaterialStatus(id, status);
        if (result) {
            loadMaterials();
        }
    };

    // Enhanced stats with clean design
    const enrichedStats = [
        {
            label: "Total Users",
            value: stats?.totalUsers || "0",
            change: stats?.newUsers || 0,
            changeType: "increase",
            color: "blue",
            icon: Users,
            description: "Registered students"
        },
        {
            label: "Resources",
            value: stats?.totalResources || "0",
            change: stats?.newResources || 0,
            changeType: "increase",
            color: "purple",
            icon: FileText,
            description: "Study materials"
        },
        {
            ...DUMMY_STATS[2],
            color: "emerald",
            icon: TrendingUp,
            description: "This week"
        },
        {
            ...DUMMY_STATS[3],
            color: "amber",
            icon: BarChart3,
            description: "Platform usage"
        },
    ];

    const colorClasses = {
        blue: {
            bg: "bg-blue-50 dark:bg-blue-900/20",
            text: "text-blue-600 dark:text-blue-400",
            border: "border-blue-200 dark:border-blue-800"
        },
        purple: {
            bg: "bg-purple-50 dark:bg-purple-900/20",
            text: "text-purple-600 dark:text-purple-400",
            border: "border-purple-200 dark:border-purple-800"
        },
        emerald: {
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            text: "text-emerald-600 dark:text-emerald-400",
            border: "border-emerald-200 dark:border-emerald-800"
        },
        amber: {
            bg: "bg-amber-50 dark:bg-amber-900/20",
            text: "text-amber-600 dark:text-amber-400",
            border: "border-amber-200 dark:border-amber-800"
        }
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

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-muted-foreground text-sm font-medium">Overview of your platform's performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {enrichedStats.map((stat, i) => {
                    const colors = colorClasses[stat.color as keyof typeof colorClasses] || colorClasses.blue;

                    return (
                        <div key={i} className="group relative p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300">

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                </div>
                                <p className="mt-4 text-xs text-muted-foreground/60">{stat.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Content Approvals Section */}
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Content Approvals</h2>
                    <p className="text-muted-foreground text-sm">Verify and manage student study material submissions.</p>
                </div>

                {/* Tabs & Actions */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex items-center p-1 bg-[#111111] border border-white/5 rounded-full">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'pending' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                        >
                            Pending <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'pending' ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>{pendingMaterials.length}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('approved')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'approved' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                        >
                            Approved History
                        </button>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="w-full h-10 pl-9 pr-4 rounded-full bg-[#111111] border border-white/5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/10"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="border border-white/5 bg-[#050505] rounded-xl overflow-hidden shadow-2xl">
                    <Table>
                        <TableHeader className="bg-[#0A0A0A] border-b border-white/5">
                            <TableRow className="hover:bg-transparent border-white/5">
                                <TableHead className="w-[300px] pl-8 h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Content Details</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Author</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Submitted</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Status</TableHead>
                                <TableHead className="text-right pr-8 h-12 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(activeTab === 'pending' ? pendingMaterials : approvedMaterials).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center text-zinc-500 border-none">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="h-12 w-12 mb-4 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center">
                                                <div className="h-4 w-4 rounded-full border-[1.5px] border-zinc-500 flex items-center justify-center">
                                                    <CheckCircle2 className="h-3 w-3 text-zinc-500" />
                                                </div>
                                            </div>
                                            <p className="text-zinc-500 font-medium">All caught up! No {activeTab} requests.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                (activeTab === 'pending' ? pendingMaterials : approvedMaterials).map((material) => (
                                    <TableRow key={material._id} className="group border-white/2 hover:bg-white/2 transition-colors">
                                        <TableCell className="pl-8 py-4">
                                            <div className="flex items-start gap-4">
                                                <div className={`
                                                        mt-1 h-10 w-10 rounded-xl flex items-center justify-center
                                                        ${material.type.toLowerCase() === 'pdf' ? 'bg-red-500/10 text-red-500' :
                                                        material.type.toLowerCase() === 'video' ? 'bg-blue-500/10 text-blue-500' :
                                                            'bg-emerald-500/10 text-emerald-500'}
                                                    `}>
                                                    {material.type.toLowerCase() === 'pdf' ? <FileText className="h-5 w-5" /> : <Loader2 className="h-5 w-5" />}
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-semibold text-white text-sm">{material.title}</span>
                                                    <span className="text-xs text-zinc-500 font-mono tracking-wide">{material.createdAt?.substring(0, 10)}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-indigo-400">{material.author?.charAt(0) || 'U'}</span>
                                                </div>
                                                <span className="text-sm text-zinc-300 font-medium">{material.author || 'Unknown'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <span className="text-xs text-zinc-500 font-mono">
                                                {new Date(material.createdAt).toLocaleDateString()}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="secondary" className={`
                                                    ${material.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                    material.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                        'bg-red-500/10 text-red-500 border-red-500/20'} 
                                                    border px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold
                                                `}>
                                                {material.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8 py-4">
                                            {material.status === 'pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        onClick={() => handleStatusUpdate(material._id, 'rejected')}
                                                        size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                    >
                                                        X
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleStatusUpdate(material._id, 'approved')}
                                                        size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-border/50 bg-linear-to-br from-card to-card/80 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground mb-1">
                                    Active Sessions
                                </div>
                                <div className="text-2xl font-bold text-foreground">
                                    42
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                            <span className="text-emerald-600 dark:text-emerald-400">+12%</span> from yesterday
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-linear-to-br from-card to-card/80 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground mb-1">
                                    Storage Used
                                </div>
                                <div className="text-2xl font-bold text-foreground">
                                    4.2 GB
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                            68% of 6 GB limit
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-linear-to-br from-card to-card/80 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground mb-1">
                                    Avg. Response Time
                                </div>
                                <div className="text-2xl font-bold text-foreground">
                                    128ms
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                                <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                            <span className="text-emerald-600 dark:text-emerald-400">-5%</span> faster than last week
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
