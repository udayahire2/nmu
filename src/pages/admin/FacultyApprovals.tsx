import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const FacultyApprovals = () => {
    const [faculty, setFaculty] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingFaculty = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/faculty/pending`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setFaculty(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch pending faculty", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/faculty/${id}/${action}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                // Refresh list
                setFaculty(prev => prev.filter(f => f._id !== id));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(`Failed to ${action} faculty`, error);
        }
    };

    useEffect(() => {
        fetchPendingFaculty();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Faculty Approvals</h1>

            {faculty.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No pending approvals.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {faculty.map((user) => (
                        <Card key={user._id}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold text-lg">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                    <div className="mt-2 text-sm space-y-1">
                                        <p><span className="font-medium">Designation:</span> {user.designation}</p>
                                        <p><span className="font-medium">Department:</span> {user.department}</p>
                                        <p><span className="font-medium">College:</span> {user.collegeName}</p>
                                        <p><span className="font-medium">Subjects:</span> {user.subjects?.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                        onClick={() => handleAction(user._id, 'reject')}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleAction(user._id, 'approve')}
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FacultyApprovals;
