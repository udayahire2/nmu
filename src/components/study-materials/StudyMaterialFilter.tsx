import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SheetClose } from "@/components/ui/sheet";
import { GitBranch, GraduationCap, RotateCcw } from "lucide-react";

export const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
export const BRANCHES = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];

interface StudyMaterialFilterProps {
    selectedBranch: string;
    setSelectedBranch: (value: string) => void;
    selectedSemester: string;
    setSelectedSemester: (value: string) => void;
    activeFiltersCount: number;
    onClearFilters: () => void;
}

export function StudyMaterialFilter({
    selectedBranch,
    setSelectedBranch,
    selectedSemester,
    setSelectedSemester,
    activeFiltersCount,
    onClearFilters,
}: StudyMaterialFilterProps) {
    return (
        <div className="flex flex-col h-full px-4">
            <div className="flex-1 py-4 space-y-6">
                <div className="space-y-3">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <GitBranch className="h-3.5 w-3.5" />
                        Branch
                    </Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                        <SelectTrigger className="w-full h-12 bg-secondary/30 border-border/50 focus:ring-primary/20 transition-all hover:bg-secondary/50 hover:border-border">
                            <div className="flex items-center gap-2">
                                <SelectValue placeholder="Select Branch" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All" className="font-medium text-primary">All Branches</SelectItem>
                            {BRANCHES.map(branch => (
                                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Semester
                    </Label>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-full h-12 bg-secondary/30 border-border/50 focus:ring-primary/20 transition-all hover:bg-secondary/50 hover:border-border">
                            <div className="flex items-center gap-2">
                                <SelectValue placeholder="Select Semester" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All" className="font-medium text-primary">All Semesters</SelectItem>
                            {SEMESTERS.map(sem => (
                                <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="pt-6 border-t border-border/40 mt-auto space-y-4 pb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Active Filters</span>
                    <Badge variant="secondary" className="px-2.5 h-6 font-mono bg-secondary border border-border/50">
                        {activeFiltersCount}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        onClick={onClearFilters}
                        className="h-10 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                        disabled={activeFiltersCount === 0}
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>
                    <SheetClose asChild>
                        <Button className="h-10 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                            Apply
                        </Button>
                    </SheetClose>
                </div>
            </div>
        </div>
    );
}
