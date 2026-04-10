import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SheetClose } from "@/components/ui/sheet";
import { GitBranch, GraduationCap, RotateCcw } from "lucide-react";

export const SEMESTERS = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

export const BRANCHES = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
];

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
    <div className="flex h-full flex-col px-4">
      {/* Filters */}
      <div className="flex-1 space-y-6 py-4">
        {/* Branch */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            Branch
          </Label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="h-10 w-full rounded-md border-border/40 bg-transparent">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Branches</SelectItem>
              {BRANCHES.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Semester */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            Semester
          </Label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="h-10 w-full rounded-md border-border/40 bg-transparent">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Semesters</SelectItem>
              {SEMESTERS.map((sem) => (
                <SelectItem key={sem} value={sem}>
                  {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="mt-auto space-y-3 border-t border-border/40 pb-4 pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Active filters</span>
          <Badge variant="outline" className="rounded-md border-border/40 text-xs font-normal">
            {activeFiltersCount}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            onClick={onClearFilters}
            disabled={activeFiltersCount === 0}
            className="h-9 rounded-md border border-border/40 text-sm font-normal"
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Reset
          </Button>
          <SheetClose asChild>
            <Button className="h-9 rounded-md text-sm font-normal">Apply</Button>
          </SheetClose>
        </div>
      </div>
    </div>
  );
}