import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DUMMY_STATS, TOP_RESOURCES, RECENT_ACTIVITY } from "@/lib/dummy-data";
import { ArrowUpRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening with your content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {DUMMY_STATS.map((stat, i) => (
                    <Card key={i} className="group overflow-hidden transition-all hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                {stat.label}
                            </CardTitle>
                            <div className="p-2 rounded-full bg-primary/10 text-primary opacity-80 group-hover:scale-110 transition-transform">
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <span className="text-emerald-500 font-medium flex items-center">
                                    {stat.change}
                                </span>
                                from last month
                            </p>
                            {/* Decorative gradient blur */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Activity */}
                <Card className="col-span-4 border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Latest actions performed across the platform.
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {RECENT_ACTIVITY.map((activity, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/10" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                                        <p className="text-sm text-muted-foreground">
                                            by <span className="text-foreground font-medium">{activity.user}</span>
                                        </p>
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Resources */}
                <Card className="col-span-3 border-border/50 shadow-sm flex flex-col">
                    <CardHeader>
                        <CardTitle>Top Performing Content</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Most accessed resources this week.
                        </p>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-4">
                            {TOP_RESOURCES.map((resource, i) => (
                                <div key={i} className="flex items-center justify-between bg-muted/30 p-3 rounded-xl hover:bg-muted/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center font-bold text-xs shadow-sm">
                                            #{i + 1}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                                                {resource.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {resource.views} views
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
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
