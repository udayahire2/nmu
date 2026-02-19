import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <div className="p-8">Loading...</div>;

    if (!user.isApproved) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-yellow-600">Account Pending Approval</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Your faculty account is currently under review by the administration.
                            You will not be able to manage resources until your account is approved.
                        </p>
                        <p className="text-sm">
                            Please check back later or contact the college administration.
                        </p>
                        <Button asChild className="mt-6 w-full">
                            <Link to="/profile">Go to Profile</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.designation} {user.name}</p>
                </div>
                <Button>Upload New Resource</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Resources shared</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Awaiting admin review</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user.department}</div>
                        <p className="text-xs text-muted-foreground">{user.collegeName}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Resources</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        No resources uploaded yet.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FacultyDashboard;
