import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Activity, TrendingUp, Users, BarChart3, Loader2, FileText, Eye, Download, Calendar } from "lucide-react";
import { DUMMY_STATS, TOP_RESOURCES, RECENT_ACTIVITY } from "@/lib/dummy-data";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
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
    }, []);

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
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            Dashboard Overview
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back, Admin. Here's what's happening today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {enrichedStats.map((stat, i) => {
                    const colors = colorClasses[stat.color as keyof typeof colorClasses];
                    return (
                        <Card 
                            key={i} 
                            className={`border ${colors.border} bg-gradient-to-b from-card to-card/80 shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2.5 rounded-lg ${colors.bg}`}>
                                        <stat.icon className={`h-5 w-5 ${colors.text}`} />
                                    </div>
                                    <Badge 
                                        variant="outline" 
                                        className={`text-xs font-medium ${stat.changeType === 'increase' ? 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'}`}
                                    >
                                        {stat.changeType === 'increase' ? '+' : '-'}{stat.change}%
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold text-foreground">
                                        {stat.value}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground/70">
                                        {stat.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activity - Left Column */}
                <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-muted-foreground" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>
                                    Latest platform interactions
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs">
                                View all
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {RECENT_ACTIVITY.map((activity, i) => (
                            <div 
                                key={i} 
                                className="flex items-center gap-4 p-3 rounded-lg border border-border/30 hover:bg-accent/50 transition-colors"
                            >
                                <div className="relative flex-shrink-0">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-muted/50 to-background border border-border/50 flex items-center justify-center">
                                        <span className="text-sm font-medium text-foreground">
                                            {activity.user.charAt(0)}
                                        </span>
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${i < 2 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {activity.action}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {activity.user} • {activity.time}
                                    </p>
                                </div>
                                <Badge 
                                    variant="outline" 
                                    className="text-xs font-normal border-border/50"
                                >
                                    {activity.type}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Top Resources - Right Column */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                    <CardHeader className="pb-3">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                                Trending Resources
                            </CardTitle>
                            <CardDescription>
                                Most accessed this week
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {TOP_RESOURCES.map((resource, i) => (
                                <div 
                                    key={i} 
                                    className="group p-3 rounded-lg border border-border/30 hover:border-primary/30 hover:bg-accent/30 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`
                                                h-8 w-8 rounded-md flex items-center justify-center text-xs font-medium
                                                ${i === 0 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                                                  i === 1 ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400' :
                                                  i === 2 ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                                                  'bg-muted text-muted-foreground'}
                                            `}>
                                                {i + 1}
                                            </div>
                                            <div className="text-sm font-medium text-foreground truncate">
                                                {resource.title}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {resource.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Download className="h-3 w-3" />
                                                {resource.downloads}
                                            </span>
                                        </div>
                                        <Badge 
                                            variant="outline" 
                                            className="text-xs border-border/50 capitalize"
                                        >
                                            {resource.type}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-border/30">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-3 rounded-lg bg-gradient-to-b from-background to-muted/20 border border-border/30">
                                    <div className="text-lg font-bold text-foreground mb-1">
                                        1,245
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Total Views
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-b from-background to-muted/20 border border-border/30">
                                    <div className="text-lg font-bold text-foreground mb-1">
                                        342
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Downloads
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm">
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

                <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm">
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

                <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm">
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
        </div>
    );
}