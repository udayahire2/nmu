import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

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
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
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
                // Update local storage and state
                const updatedUser = { ...user, ...data.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setIsEditing(false);
                // Trigger navbar update by forcing a small event or reload
                // For simplicity, we can reload or dispatch event. 
                // Since navbar reads from localStorage on mount, reload is safest for MVP without context.
                window.location.reload();
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

    if (!user) return <div className="flex justify-center p-10">Loading...</div>;

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xl">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle>{isEditing ? "Edit Profile" : "My Profile"}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isEditing ? (
                        <form id="profile-form" onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="branch">Branch</Label>
                                <select
                                    id="branch"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                >
                                    <option value="" disabled>Select Branch</option>
                                    <option value="Computer">Computer</option>
                                    <option value="IT">IT</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="ENTC">ENTC</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <select
                                    id="year"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    <option value="" disabled>Select Year</option>
                                    <option value="FE">FE</option>
                                    <option value="SE">SE</option>
                                    <option value="TE">TE</option>
                                    <option value="BE">BE</option>
                                </select>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium text-muted-foreground">Name</p>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Role</p>
                                    <p className="capitalize">{user.role}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Branch</p>
                                    <p>{user.branch}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Year</p>
                                    <p>{user.year}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Status</p>
                                    <p className={user.isVerified ? "text-green-600" : "text-red-600"}>
                                        {user.isVerified ? "Verified" : "Unverified"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button type="submit" form="profile-form" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
