
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { Mail, Lock, User, Hash } from 'lucide-react';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        branch: '',
        year: ''
    });

    // Simplified registration logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login({
                id: '2',
                name: 'New Student',
                email: 'new@nmu.ac.in',
                branch: formData.branch || 'Computer',
                studentId: 'PRN87654321',
                year: formData.year || 'First Year'
            });
            setIsLoading(false);
            navigate('/profile');
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-[90vh] py-10 px-4">
            <Card className="w-full max-w-[500px] border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Full Name" icon={<User className="h-4 w-4" />} placeholder="John Doe" required />
                            <Input label="Student ID (PRN)" icon={<Hash className="h-4 w-4" />} placeholder="PRN..." required />
                        </div>

                        <Input label="Email" type="email" icon={<Mail className="h-4 w-4" />} placeholder="student@nmu.ac.in" required />

                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Branch"
                                placeholder="Select Branch"
                                value={formData.branch}
                                onChange={(val) => setFormData({ ...formData, branch: val })}
                                options={[
                                    { label: 'Computer', value: 'Computer' },
                                    { label: 'Civil', value: 'Civil' },
                                    { label: 'Mechanical', value: 'Mechanical' },
                                    { label: 'Electrical', value: 'Electrical' },
                                    { label: 'E&TC', value: 'E&TC' },
                                ]}
                            />
                            <Select
                                label="Year"
                                placeholder="Select Year"
                                value={formData.year}
                                onChange={(val) => setFormData({ ...formData, year: val })}
                                options={[
                                    { label: 'First Year', value: 'First Year' },
                                    { label: 'Second Year', value: 'Second Year' },
                                    { label: 'Third Year', value: 'Third Year' },
                                    { label: 'Final Year', value: 'Final Year' },
                                ]}
                            />
                        </div>

                        <Input label="Password" type="password" icon={<Lock className="h-4 w-4" />} required />
                        <Input label="Confirm Password" type="password" icon={<Lock className="h-4 w-4" />} required />

                        <Button className="w-full mt-6" size="lg" isLoading={isLoading}>
                            Register
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-slate-500 dark:text-slate-400">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline-offset-4 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
