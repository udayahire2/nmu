import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyOtpPage() {
    const [searchParams] = useSearchParams();
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
            const res = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (data.success) {
                // Store token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Reload or redirect to trigger auth state update
                // Redirect based on role
                if (data.user.role === 'admin') {
                    window.location.href = '/admin/dashboard';
                } else if (data.user.role === 'faculty') {
                    window.location.href = '/dashboard/faculty';
                } else {
                    window.location.href = '/';
                }
            } else {
                alert(data.message || 'Verification failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify Your Account</CardTitle>
                    <CardDescription>
                        Enter the OTP sent to {email}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleVerify}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">One-Time Password (OTP)</Label>
                            <Input
                                id="otp"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
