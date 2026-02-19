import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Faculty {
    _id: string;
    name: string;
    email: string;
    designation: string;
    department: string;
    collegeName: string;
    subjects: string[];
    isApproved: boolean;
}

export default function FacultyManager() {
    const [pendingFaculty, setPendingFaculty] = useState<Faculty[]>([]);
    const [allFaculty, setAllFaculty] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFaculty = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
            const token = localStorage.getItem('token');

            const [pendingRes, allRes] = await Promise.all([
                fetch(`${API_URL}/admin/faculty/pending`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_URL}/admin/faculty/all`, { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const pendingData = await pendingRes.json();
            const allData = await allRes.json();

            if (pendingData.success) setPendingFaculty(pendingData.data);
            if (allData.success) setAllFaculty(allData.data);

        } catch (error) {
            console.error("Error fetching faculty:", error);
            setError("Failed to load faculty data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaculty();
    }, []);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
            const token = localStorage.getItem('token');

            const res = await fetch(`${API_URL}/admin/faculty/${id}/${action}`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            if (data.success) {
                fetchFaculty(); // Refresh lists
            } else {
                alert(data.message || 'Action failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error performing action');
        }
    };

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading faculty data...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Faculty Management</h2>
            </div>

            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                        Pending Requests
                        {pendingFaculty.length > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                                {pendingFaculty.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="all">All Faculty</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                    {pendingFaculty.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-lg">
                            <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-medium">No Pending Requests</h3>
                            <p className="text-sm text-muted-foreground mt-2">All faculty applications have been verified.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {pendingFaculty.map((faculty) => (
                                <FacultyCard key={faculty._id} faculty={faculty} onAction={handleAction} isPending={true} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="all" className="mt-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {allFaculty.map((faculty) => (
                            <FacultyCard key={faculty._id} faculty={faculty} onAction={handleAction} isPending={false} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function FacultyCard({ faculty, onAction, isPending }: { faculty: Faculty, onAction: any, isPending: boolean }) {
    return (
        <Card className="overflow-hidden border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-lg">{faculty.name}</h3>
                        <p className="text-sm text-muted-foreground">{faculty.email}</p>
                    </div>
                    <Badge variant={faculty.isApproved ? "default" : "secondary"} className={faculty.isApproved ? "bg-green-500/15 text-green-600 hover:bg-green-500/25" : "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25"}>
                        {faculty.isApproved ? "Approved" : "Pending"}
                    </Badge>
                </div>

                <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Designation</span>
                        <span className="font-medium">{faculty.designation}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Department</span>
                        <span className="font-medium">{faculty.department}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">College</span>
                        <span className="font-medium">{faculty.collegeName}</span>
                    </div>
                    <div className="pt-2">
                        <span className="text-muted-foreground block mb-1">Subjects</span>
                        <div className="flex flex-wrap gap-1">
                            {faculty.subjects.map((sub, i) => (
                                <Badge key={i} variant="outline" className="text-xs bg-background/50">
                                    {sub}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {isPending && (
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="w-full border-green-500/30 text-green-600 hover:bg-green-500/10 hover:text-green-700"
                            onClick={() => onAction(faculty._id, 'approve')}
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-700"
                            onClick={() => onAction(faculty._id, 'reject')}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                        </Button>
                    </div>
                )}

                {!isPending && !faculty.isApproved && (
                    <Button
                        variant="outline"
                        className="w-full border-green-500/30 text-green-600 hover:bg-green-500/10 hover:text-green-700 mt-2"
                        onClick={() => onAction(faculty._id, 'approve')}
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Approve Now
                    </Button>
                )}
                {!isPending && faculty.isApproved && (
                    <Button
                        variant="outline"
                        className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-700 mt-2"
                        onClick={() => onAction(faculty._id, 'reject')}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Revoke Access
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
