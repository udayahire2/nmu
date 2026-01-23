import { useState } from 'react';
import { Plus, Search, NotebookPen, Trash2, Edit, UploadCloud } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';

export default function NotesPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    const notesList = [
        { id: 1, course: 'BCA', semester: 'Sem 3', subject: 'Java Programming', topic: 'Exception Handling', fileName: 'java_exceptions.pdf' },
        { id: 2, course: 'BCA', semester: 'Sem 3', subject: 'Java Programming', topic: 'Multithreading', fileName: 'java_threads.pdf' },
        { id: 3, course: 'B.Sc CS', semester: 'Sem 1', subject: 'Digital Electronics', topic: 'Logic Gates', fileName: 'digital_logic_gates.pdf' },
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
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Study Notes</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage study materials and topic-wise notes.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Notes
                </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by topic or subject..."
                        className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                            <th className="px-6 py-4 font-medium">Topic Name</th>
                            <th className="px-6 py-4 font-medium">Subject</th>
                            <th className="px-6 py-4 font-medium">Course Info</th>
                            <th className="px-6 py-4 font-medium">File</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {notesList.map((item) => (
                            <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{item.topic}</td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{item.subject}</td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">
                                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700">
                                        {item.course} • {item.semester}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 cursor-pointer transition-colors">
                                        <NotebookPen className="w-4 h-4" />
                                        <span className="underline decoration-dotted">{item.fileName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add Study Notes"
                description="Upload new study notes for a specific topic."
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button>Upload Notes</Button>
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
                        <Input placeholder="e.g. Java Programming" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Topic Name</label>
                        <Input placeholder="e.g. Exception Handling Implementation" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Upload PDF</label>
                        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-6 h-6 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Click to upload or drag and drop</p>
                            <input type="file" className="hidden" accept=".pdf" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
