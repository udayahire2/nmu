import { useState } from 'react';
import { Plus, Search, Youtube, Trash2, Edit, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';

export default function VideosPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    const videosList = [
        { id: 1, course: 'BCA', semester: 'Sem 1', subject: 'C Programming', title: 'Introduction to Pointers', url: 'https://youtube.com/...', description: 'Basic concepts of pointers in C.' },
        { id: 2, course: 'B.Sc CS', semester: 'Sem 3', subject: 'Data Structures', title: 'Linked List Implementation', url: 'https://youtube.com/...', description: 'Step by step guide to Linked Lists.' },
        { id: 3, course: 'BCA', semester: 'Sem 2', subject: 'Web Technologies', title: 'CSS Flexbox Guide', url: 'https://youtube.com/...', description: 'Complete guide to Flexbox layout.' },
    ];

    const courseOptions = [
        { label: 'BCA', value: 'bca' },
        { label: 'B.Sc Computer Science', value: 'bsc' },
    ];

    const semesterOptions = [
        { label: 'Semester 1', value: '1' },
        { label: 'Semester 2', value: '2' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">YouTube Videos</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage educational video content and links.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Video
                </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by title or subject..."
                        className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosList.map((video) => (
                    <div key={video.id} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 relative flex items-center justify-center">
                            <Youtube className="w-12 h-12 text-red-500 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                    {video.course} • {video.semester}
                                </span>
                                <div className="flex gap-2">
                                    <button className="text-zinc-400 hover:text-indigo-500 transition-colors"><Edit className="w-4 h-4" /></button>
                                    <button className="text-zinc-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{video.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">{video.description}</p>
                            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <span className="text-xs text-zinc-400 font-medium">{video.subject}</span>
                                <a href={video.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                                    Watch Video <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add YouTube Video"
                description="Link a new YouTube video for students."
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button>Add Video</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Course Name</label>
                            <Select
                                placeholder="Select Course"
                                options={courseOptions}
                                value={selectedCourse}
                                onChange={setSelectedCourse}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Semester</label>
                            <Select
                                placeholder="Select Semester"
                                options={semesterOptions}
                                value={selectedSemester}
                                onChange={setSelectedSemester}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject Name</label>
                        <Input placeholder="e.g. C Programming" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Video Title</label>
                        <Input placeholder="e.g. Introduction to Variables" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">YouTube URL</label>
                        <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <Input placeholder="https://youtube.com/watch?v=..." className="pl-10" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
