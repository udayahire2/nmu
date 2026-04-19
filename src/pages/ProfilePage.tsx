import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
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
import { CalendarDays, BookOpen, Edit2, Save, X, User, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { buildApiUrl, getErrorMessage, parseApiData } from "@/services/api";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
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
            navigate("/login");
        }
    }, [navigate]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(buildApiUrl("/auth/updatedetails"), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, branch, year }),
            });

            const data = await res.json();
            const updatedPayload = parseApiData<Record<string, unknown> | null>(data, null) ?? data.user;

            if (res.ok && data.success && updatedPayload) {
                const updatedUser = { ...user, ...updatedPayload };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                setIsEditing(false);
            } else {
                alert(getErrorMessage(data, "Update failed"));
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (!user) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
            {/* Header with avatar and edit button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-semibold">{user.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">
                                {user.role === "admin" ? "Administrator" : "Student"}
                            </Badge>
                            {user.isVerified && (
                                <Badge variant="outline" className="gap-1">
                                    <ShieldCheck className="h-3 w-3" /> Verified
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
                {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                )}
            </div>

            {/* Main content card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Manage your profile details</CardDescription>
                        </div>
                        {isEditing && (
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                                <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch">Academic Branch</Label>
                                    <Select value={branch} onValueChange={(val) => setBranch(val || "")} required>
                                        <SelectTrigger id="branch">
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
                                    <Label htmlFor="year">Current Year</Label>
                                    <Select value={year} onValueChange={(val) => setYear(val || "")} required>
                                        <SelectTrigger id="year">
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
                            <div className="flex justify-end pt-4 border-t">
                                <Button type="submit" disabled={loading}>
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
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3 p-3 rounded-lg border">
                                <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Branch</p>
                                    <p className="font-medium">{user.branch || "—"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg border">
                                <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Year</p>
                                    <p className="font-medium">{user.year || "—"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg border">
                                <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Status</p>
                                    <p className="font-medium">{user.isVerified ? "Verified" : "Pending"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg border">
                                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Member Since</p>
                                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}