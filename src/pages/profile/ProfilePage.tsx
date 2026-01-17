
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { User, Mail, BookOpen, GraduationCap, MapPin, Camera, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h2 className="text-2xl font-bold">Please login to view your profile</h2>
                <Button onClick={() => navigate('/login')}>Go to Login</Button>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="relative">
                {/* Cover Image */}
                <div className="h-48 md:h-64 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute -bottom-16 left-6 md:left-10 flex items-end gap-6">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full border-4 border-white dark:border-[#121212] bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-xl">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-3xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="mb-4 space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-16 md:mt-0">{user.name}</h1>
                        <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs uppercase tracking-wide">
                                {user.year}
                            </span>
                            • {user.branch}
                        </p>
                    </div>
                </div>

                <div className="absolute top-4 right-4 md:top-auto md:bottom-4 md:right-4">
                    <Button variant="outline" className="bg-white/90 dark:bg-black/50 backdrop-blur-md" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </Button>
                </div>
            </div>

            {/* Spacer for absolute positioned avatar */}
            <div className="h-16" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar Info */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg">Student Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                            <Hash className="h-4 w-4" />
                            <span>{user.studentId}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                            <GraduationCap className="h-4 w-4" />
                            <span>Batch 2023-2027</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                            <MapPin className="h-4 w-4" />
                            <span>North Maharashtra University</span>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                            <Button variant="danger" className="w-full" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Area */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-xl">{isEditing ? 'Edit Profile' : 'Academic Overview'}</CardTitle>
                        <CardDescription>
                            {isEditing ? 'Update your personal information' : 'Your academic performance and activities'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Full Name" defaultValue={user.name} icon={<User className="h-4 w-4" />} />
                                    <Input label="Email" defaultValue={user.email} icon={<Mail className="h-4 w-4" />} disabled />
                                </div>
                                <Input label="Bio" placeholder="Tell us about yourself..." />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub Profile</label>
                                        <Input placeholder="https://github.com/..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn Profile</label>
                                        <Input placeholder="https://linkedin.com/in/..." />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button>Save Changes</Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                                        <div className="text-sm text-slate-500 mb-1">Current Semester</div>
                                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Sem V</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                                        <div className="text-sm text-slate-500 mb-1">CGPA</div>
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">8.9</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Recent Activity</h3>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                                    <div className="text-sm">Accessed <span className="font-medium">Data Structures Unit {i}</span></div>
                                                </div>
                                                <div className="text-xs text-slate-400">2h ago</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
