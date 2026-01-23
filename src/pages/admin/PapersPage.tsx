import { useState } from 'react';
import { Plus, Search, FileText, Trash2, Edit, UploadCloud, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';

export default function PapersPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const papersList = [
        { id: 1, course: 'BCA', semester: 'Sem 1', subject: 'C Programming', year: '2023', type: 'Final', fileName: 'bca_c_prog_2023.pdf' },
        { id: 2, course: 'BCA', semester: 'Sem 1', subject: 'Mathematics', year: '2022', type: 'Mid-term', fileName: 'bca_math_2022_mid.pdf' },
        { id: 3, course: 'B.Sc CS', semester: 'Sem 5', subject: 'Operating Systems', year: '2023', type: 'Final', fileName: 'bsc_os_2023.pdf' },
    ];

    const courseOptions = [
        { label: 'BCA', value: 'bca' },
        { label: 'B.Sc Computer Science', value: 'bsc' },
    ];

    const semesterOptions = [
        { label: 'Semester 1', value: '1' },
        { label: 'Semester 2', value: '2' },
    ];

    const yearOptions = [
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
    ];

    const typeOptions = [
        { label: 'Mid-term', value: 'mid' },
        { label: 'Final / End-sem', value: 'final' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Previous Year Papers</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Upload and manage past exam papers.</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Paper
                </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by subject code, name or year..."
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <select className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                        <option value="">All Years</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                            <th className="px-6 py-4 font-medium">Subject Name</th>
                            <th className="px-6 py-4 font-medium">Exam Details</th>
                            <th className="px-6 py-4 font-medium">File</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                        {papersList.map((item) => (
                            <tr key={item.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">{item.subject}</div>
                                    <div className="text-xs text-zinc-500 mt-1 font-medium">{item.course} • {item.semester}</div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${item.type === 'Final'
                                        ? 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20'
                                        : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20'
                                        }`}>
                                        <Calendar className="w-3 h-3" />
                                        {item.type} {item.year}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2.5 group/file cursor-pointer">
                                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover/file:bg-indigo-50 group-hover/file:text-indigo-600 dark:group-hover/file:bg-indigo-500/20 dark:group-hover/file:text-indigo-400 transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-zinc-600 dark:text-zinc-400 font-medium group-hover/file:text-indigo-600 dark:group-hover/file:text-indigo-400 transition-colors">{item.fileName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all" title="Delete">
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
                title="Upload Previous Paper"
                description="Add a new question paper to the database."
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button>Upload Paper</Button>
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
                        <Input placeholder="e.g. Mathematics II" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Exam Year</label>
                            <Select
                                placeholder="Select Year"
                                options={yearOptions}
                                value={selectedYear}
                                onChange={setSelectedYear}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Exam Type</label>
                            <Select
                                placeholder="Link Mid-term / Final"
                                options={typeOptions}
                                value={selectedType}
                                onChange={setSelectedType}
                            />
                        </div>
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
