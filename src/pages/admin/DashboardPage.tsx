import { GraduationCap, BookOpenText, ScrollText, MonitorPlay, ArrowUpRight, ArrowRight } from 'lucide-react';
import AdminStatsCard from './components/AdminStatsCard';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    // Mock Data
    const stats = [
        { title: 'Total Students', value: '12,450', icon: GraduationCap, color: 'indigo', trend: '+12%', trendUp: true },
        { title: 'Total Syllabus', value: '45', icon: BookOpenText, color: 'blue', trend: '+2', trendUp: true },
        { title: 'Total Notes', value: '3,204', icon: ScrollText, color: 'emerald', trend: '+24%', trendUp: true },
        { title: 'Total Videos', value: '542', icon: MonitorPlay, color: 'red', trend: '+5%', trendUp: true },
    ];

    const recentActivities = [
        { id: 1, action: 'New Student Registered', detail: 'John Doe joined BCA Sem 1', time: '2 mins ago', icon: GraduationCap, color: 'bg-indigo-500' },
        { id: 2, action: 'Syllabus Updated', detail: 'B.Sc Computer Science - Sem 5', time: '15 mins ago', icon: BookOpenText, color: 'bg-blue-500' },
        { id: 3, action: 'New Note Added', detail: 'Data Structures - Unit 2', time: '1 hour ago', icon: ScrollText, color: 'bg-emerald-500' },
        { id: 4, action: 'Video Uploaded', detail: 'React JS Full Course - Part 1', time: '3 hours ago', icon: MonitorPlay, color: 'bg-red-500' },
        { id: 5, action: 'New Student Registered', detail: 'Sarah Smith joined B.Tech Sem 3', time: '5 hours ago', icon: GraduationCap, color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Dashboard</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
                        Download Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="h-full">
                        <AdminStatsCard {...stat} delay={index * 0.1} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="xl:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-6 shadow-sm h-full"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Recent Activities</h2>
                        <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
                            View All <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-px before:-translate-x-1/2 before:bg-zinc-200 dark:before:bg-zinc-800 before:h-full">
                        {recentActivities.map((activity, index) => (
                            <div key={activity.id} className="relative flex gap-4 items-start group">
                                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-[3px] border-white dark:border-zinc-900 shadow-sm shrink-0 ${activity.color} text-white ring-2 ring-transparent group-hover:ring-zinc-100 dark:group-hover:ring-zinc-800 transition-all duration-300`}>
                                    <activity.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 pt-0.5">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activity.action}</h4>
                                        <span className="text-xs text-zinc-400 font-medium tabular-nums">{activity.time}</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{activity.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-900 dark:via-violet-900/50 dark:to-fuchsia-900/50 rounded-xl p-6 text-white relative overflow-hidden group shadow-xl shadow-indigo-500/20 dark:shadow-indigo-900/20"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/15 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/30 rounded-full -ml-8 -mb-8 blur-2xl"></div>

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white backdrop-blur-md border border-white/10 shadow-inner">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">System Status</h3>
                            <p className="text-indigo-100/80 text-sm leading-relaxed">All systems are running smoothly. Database backup completed 2 hours ago.</p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between text-sm mb-3">
                                <span className="text-indigo-100/70 font-medium">Server Load</span>
                                <span className="font-bold tracking-wide">24%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                                <div className="bg-white h-full rounded-full w-1/4 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
