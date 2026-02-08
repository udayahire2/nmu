import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    GraduationCap,
    BookOpen,
    Trophy,
    Edit2,
    Save,
    X,
    User,
    Mail,
    ShieldCheck,
    ChevronRight,
    Loader2
} from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setName(parsedUser.name);
            setBranch(parsedUser.branch);
            setYear(parsedUser.year);
        } catch (e) {
            console.error(e);
            navigate('/login');
        }
    }, [navigate]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
            const res = await fetch(`${API_URL}/auth/updatedetails`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, branch, year }),
            });

            const data = await res.json();

            if (data.success) {
                const updatedUser = { ...user, ...data.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setIsEditing(false);
                // Use a smoother update instead of full reload
                setUser(updatedUser);
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-muted/20">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-sm" />
                            <Avatar className="h-20 w-20 relative border-2 border-background shadow-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-linear-to-br from-primary/10 to-primary/5 text-foreground">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold">{user.name}</h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="font-normal bg-primary/5 text-primary hover:bg-primary/10">
                                    {user.role === 'admin' ? 'Administrator' : 'Student'}
                                </Badge>
                                {user.isVerified && (
                                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
                                        <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {!isEditing && (
                        <Button
                            onClick={() => setIsEditing(true)}
                            variant="outline"
                            className="border-border bg-background shadow-sm hover:bg-accent"
                        >
                            <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stats Card */}
                    <Card className="lg:col-span-1 border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                Academic Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Member since</span>
                                        <span className="font-medium">{formatDate(user.createdAt || new Date().toISOString())}</span>
                                    </div>
                                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-linear-to-r from-primary/30 to-primary/10" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border border-border/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                                                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <span className="text-xs text-muted-foreground">Resources</span>
                                        </div>
                                        <div className="text-2xl font-semibold">12</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border border-border/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-1.5 rounded-md bg-violet-100 dark:bg-violet-900/30">
                                                <GraduationCap className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                                            </div>
                                            <span className="text-xs text-muted-foreground">Avg. Score</span>
                                        </div>
                                        <div className="text-2xl font-semibold">85%</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Details / Edit Form */}
                    <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        Personal Information
                                    </CardTitle>
                                    <CardDescription>Manage your profile details</CardDescription>
                                </div>
                                {isEditing && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditing(false)}
                                        className="h-8"
                                    >
                                        <X className="h-4 w-4 mr-1" /> Cancel
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="border-border/70 focus:border-primary/50"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="branch" className="text-sm">Academic Branch</Label>
                                            <Select value={branch} onValueChange={setBranch} required>
                                                <SelectTrigger id="branch" className="h-10 w-full border-border/70 bg-background px-3 py-2 text-sm ring-offset-background focus:ring-primary/20 focus:border-primary/50">
                                                    <SelectValue placeholder="Select Branch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Computer">Computer Engineering</SelectItem>
                                                    <SelectItem value="IT">Information Technology</SelectItem>
                                                    <SelectItem value="Civil">Civil Engineering</SelectItem>
                                                    <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                                                    <SelectItem value="Electrical">Electrical Engineering</SelectItem>
                                                    <SelectItem value="ENTC">E&TC Engineering</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="year" className="text-sm">Current Year</Label>
                                            <Select value={year} onValueChange={setYear} required>
                                                <SelectTrigger id="year" className="h-10 w-full border-border/70 bg-background px-3 py-2 text-sm ring-offset-background focus:ring-primary/20 focus:border-primary/50">
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="FE">First Year (FE)</SelectItem>
                                                    <SelectItem value="SE">Second Year (SE)</SelectItem>
                                                    <SelectItem value="TE">Third Year (TE)</SelectItem>
                                                    <SelectItem value="BE">Final Year (BE)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4 border-t border-border/30">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="min-w-[100px] bg-primary hover:bg-primary/90"
                                        >
                                            {loading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4 mr-2" /> Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 rounded-lg bg-linear-to-br from-background to-muted/20 border border-border/50">
                                            <p className="text-xs font-medium text-muted-foreground">Branch</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="p-1.5 rounded-md bg-violet-100 dark:bg-violet-900/30">
                                                    <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                                </div>
                                                <p className="font-medium">{user.branch} Engineering</p>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-linear-to-br from-background to-muted/20 border border-border/50">
                                            <p className="text-xs font-medium text-muted-foreground">Current Year</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="p-1.5 rounded-md bg-fuchsia-100 dark:bg-fuchsia-900/30">
                                                    <CalendarDays className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                                                </div>
                                                <p className="font-medium">{user.year}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-linear-to-br from-background to-muted/20 border border-border/50">
                                            <p className="text-xs font-medium text-muted-foreground">Email Status</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className={`p-1.5 rounded-md ${user.isVerified ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                                                    <ShieldCheck className={`h-4 w-4 ${user.isVerified ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} />
                                                </div>
                                                <p className="font-medium">{user.isVerified ? "Verified Account" : "Verification Pending"}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-linear-to-br from-background to-muted/20 border border-border/50">
                                            <p className="text-xs font-medium text-muted-foreground">Member Since</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                                                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <p className="font-medium">{formatDate(user.createdAt || new Date().toISOString())}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info Section */}
                                    <div className="pt-4 border-t border-border/30">
                                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-md bg-muted">
                                                    <GraduationCap className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">Academic Progress</p>
                                                    <p className="text-xs text-muted-foreground">View your course completion status</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}