import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DUMMY_STATS, TOP_RESOURCES, RECENT_ACTIVITY } from "@/lib/dummy-data";
import { ArrowUpRight, Activity, TrendingUp, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function DashboardPage() {
    // Enhanced stats with colors
    const enrichedStats = [
        { ...DUMMY_STATS[0], color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: Users },
        { ...DUMMY_STATS[1], color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: Activity },
        { ...DUMMY_STATS[2], color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: TrendingUp },
        { ...DUMMY_STATS[3], color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: BarChart3 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Dashboard Overview
                </h1>
                <p className="text-muted-foreground text-lg">Welcome back, Admin.</p>
            </div>

            {/* Bento Grid Stats */}
            <div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
                {enrichedStats.map((stat, i) => (
                    <div key={i}>
                        <Card className={`group overflow-hidden relative border ${stat.border} bg-black/40 backdrop-blur-xl`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    {stat.label}
                                </CardTitle>
                                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                                    <span className={`${stat.color} font-bold flex items-center bg-white/5 px-1.5 py-0.5 rounded-md`}>
                                        {stat.change}
                                    </span>
                                    <span className="opacity-60">vs last month</span>
                                </p>
                            </CardContent>
                            {/* Glow Effect - Static now */}
                            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${stat.bg} blur-[60px] opacity-20`} />
                        </Card>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 h-full">
                {/* Recent Activity - Large Card */}
                <Card className="col-span-4 border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/5 p-6">
                        <div>
                            <CardTitle className="text-xl">Live Activity</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Real-time platform updates
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="hidden sm:flex border-white/10 bg-black/20 hover:bg-white/10 text-xs uppercase tracking-wider font-bold">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-y-auto">
                        <div className="divide-y divide-white/5">
                            {RECENT_ACTIVITY.map((activity, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                                    <div className="flex-shrink-0 relative">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                                            <span className="text-xs font-bold text-muted-foreground group-hover:text-white transition-colors">{activity.user.charAt(0)}</span>
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 rounded-full border-2 border-black" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            by <span className="text-foreground/80">{activity.user}</span>
                                        </p>
                                    </div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap bg-white/5 px-2 py-1 rounded-md font-mono">
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Resources - Widget Card */}
                <Card className="col-span-3 border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden h-full flex flex-col">
                    <CardHeader className="border-b border-white/5 bg-white/5 p-6">
                        <CardTitle className="text-xl">Trending Content</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Most accessed this week
                        </p>
                    </CardHeader>
                    <CardContent className="p-6 flex-1">
                        <div className="space-y-4">
                            {TOP_RESOURCES.map((resource, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className={`
                                            h-8 w-8 rounded-md flex items-center justify-center font-mono font-medium text-sm
                                            ${i === 0 ? 'text-yellow-500 bg-yellow-500/10' :
                                                i === 1 ? 'text-gray-400 bg-white/5' :
                                                    i === 2 ? 'text-orange-500 bg-orange-500/10' :
                                                        'text-muted-foreground bg-white/5'}
                                        `}>
                                            #{i + 1}
                                        </div>
                                        <div className="space-y-1 min-w-0">
                                            <p className="text-sm font-medium leading-none truncate text-foreground">
                                                {resource.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {resource.views} views
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
