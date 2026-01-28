import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Lock, User, Mail, Shield, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Settings
                </h1>
                <p className="text-muted-foreground text-sm font-medium">Manage your account settings and preferences.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Profile Section - Spans 2 cols on large screens */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-none rounded-2xl">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Profile Information</CardTitle>
                            </div>
                            <CardDescription>Update your photo and personal details.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Avatar className="h-24 w-24 border-4 border-white/5 shadow-xl">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 text-center sm:text-left">
                                    <h3 className="font-medium text-white">Admin User</h3>
                                    <p className="text-sm text-muted-foreground">Administrator</p>
                                    <div className="flex gap-2 justify-center sm:justify-start">
                                        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">Change Photo</Button>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500 hover:bg-red-500/10">Remove</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-white/80">First name</Label>
                                    <Input id="firstName" defaultValue="Admin" className="bg-black/20 border-white/10 focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-white/80">Last name</Label>
                                    <Input id="lastName" defaultValue="User" className="bg-black/20 border-white/10 focus:border-primary/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/80">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" defaultValue="admin@example.com" className="pl-9 bg-black/20 border-white/10 focus:border-primary/50" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button className="bg-white text-black hover:bg-white/90">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-none rounded-2xl">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Security</CardTitle>
                            </div>
                            <CardDescription>Manage your password and assigned devices.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password" className="text-white/80">Current Password</Label>
                                <Input id="current-password" type="password" className="bg-black/20 border-white/10 focus:border-primary/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password" className="text-white/80">New Password</Label>
                                <Input id="new-password" type="password" className="bg-black/20 border-white/10 focus:border-primary/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password" className="text-white/80">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" className="bg-black/20 border-white/10 focus:border-primary/50" />
                            </div>
                            <div className="flex justify-end pt-2">
                                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white bg-transparent">
                                    Update Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-none rounded-2xl">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Notifications</CardTitle>
                            </div>
                            <CardDescription>Configure how you receive alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium text-white">Email Alerts</div>
                                    <div className="text-xs text-muted-foreground">Receive daily summaries.</div>
                                </div>
                                <Button size="sm" variant="outline" className="h-7 border-emerald-500/50 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20">Enabled</Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium text-white">New Signups</div>
                                    <div className="text-xs text-muted-foreground">Notify when students join.</div>
                                </div>
                                <Button size="sm" variant="outline" className="h-7 border-emerald-500/50 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20">Enabled</Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium text-white">Pending Approvals</div>
                                    <div className="text-xs text-muted-foreground">Alert for new content.</div>
                                </div>
                                <Button size="sm" variant="outline" className="h-7 border-emerald-500/50 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20">Enabled</Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium text-white-500">Marketing</div>
                                    <div className="text-xs text-muted-foreground">Receive product updates.</div>
                                </div>
                                <Button size="sm" variant="ghost" className="h-7 text-muted-foreground bg-white/5 hover:bg-white/10">Disabled</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-white/5 bg-black/40 backdrop-blur-xl shadow-none rounded-2xl">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">System</CardTitle>
                            </div>
                            <CardDescription>Platform preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium text-white">Maintenance Mode</div>
                                    <div className="text-xs text-muted-foreground">Disable student access.</div>
                                </div>
                                <Button size="sm" variant="ghost" className="h-7 text-muted-foreground bg-white/5 hover:bg-white/10">Off</Button>
                            </div>
                            <div className="pt-4">
                                <Button variant="destructive" className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20">Delete All Data</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
