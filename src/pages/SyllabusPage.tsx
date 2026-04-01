import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ExternalLink, FileText, Loader2, RefreshCw, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MarkdownPreview from "@/components/ui/markdown-preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { fetchSyllabus, type SyllabusItem } from "@/services/syllabus-service";

export default function SyllabusPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
  const [viewItem, setViewItem] = useState<SyllabusItem | null>(null);

  const loadSyllabus = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSyllabus();
      setSyllabus(data);
    } catch (loadError) {
      console.error(loadError);
      setError("Failed to load syllabus.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSyllabus();
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  const branchOptions = useMemo(
    () => ["All", ...Array.from(new Set(syllabus.map((item) => item.branch))).sort()],
    [syllabus],
  );

  const semesterOptions = useMemo(
    () => [
      "All",
      ...Array.from(new Set(syllabus.map((item) => item.semester))).sort((a, b) => Number(a) - Number(b)),
    ],
    [syllabus],
  );

  const filteredSyllabus = syllabus.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query);
    const matchesBranch = selectedBranch === "All" || item.branch === selectedBranch;
    const matchesSemester = selectedSemester === "All" || item.semester === selectedSemester;

    return matchesSearch && matchesBranch && matchesSemester;
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const next = new URLSearchParams(searchParams);
    if (value.trim()) {
      next.set("search", value);
    } else {
      next.delete("search");
    }
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSelectedBranch("All");
    setSelectedSemester("All");
    handleSearchChange("");
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedBranch !== "All" || selectedSemester !== "All";

  return (
    <div className="space-y-6 pb-14 pt-6 sm:space-y-8 sm:pt-8">
      <div className="space-y-4 border-b border-border/70 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Syllabus
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
            Student reference
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Search syllabus quickly
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Search by subject or code, then open the correct syllabus in one step.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-border/70 bg-background/70 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_190px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by subject or code"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="h-11 rounded-2xl pl-9"
            />
          </div>

          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="h-11 rounded-2xl">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branchOptions.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch === "All" ? "All branches" : branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="h-11 rounded-2xl">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {semesterOptions.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester === "All" ? "All semesters" : `Semester ${semester}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters ? (
            <Button variant="outline" className="h-11 rounded-2xl" onClick={clearFilters}>
              Clear
            </Button>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {loading ? "Loading syllabus..." : `${filteredSyllabus.length} result${filteredSyllabus.length === 1 ? "" : "s"} found`}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading syllabus...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-background/70 p-12 text-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Unable to load syllabus</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button variant="outline" className="rounded-full" onClick={loadSyllabus}>
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/70">
          {filteredSyllabus.length > 0 ? (
            filteredSyllabus.map((item) => (
              <div
                key={item._id || item.code}
                className="flex flex-col gap-4 border-b border-border/70 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-full font-mono text-[11px]">
                      {item.code}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full text-[11px]">
                      {item.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.credits} credits</span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {item.branch} | Semester {item.semester}
                    </p>
                  </div>
                </div>

                <Button className="rounded-full" onClick={() => setViewItem(item)}>
                  {item.type === "markdown" ? "Open content" : "Open file"}
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 p-12 text-center">
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">No syllabus items found</h2>
                <p className="text-sm text-muted-foreground">Try a different subject name, code, or filter.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
        <DialogContent className="max-w-3xl rounded-3xl border-border/70 bg-background/95">
          <DialogHeader>
            <DialogTitle>{viewItem?.title}</DialogTitle>
          </DialogHeader>

          {viewItem && (
            <div className="space-y-4 py-2">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Course code" value={viewItem.code} />
                <InfoCard label="Credits" value={String(viewItem.credits)} />
                <InfoCard label="Branch" value={viewItem.branch} />
                <InfoCard label="Semester" value={`Semester ${viewItem.semester}`} />
              </div>

              <Separator />

              {viewItem.type === "markdown" ? (
                <MarkdownPreview
                  content={viewItem.contentUrl}
                  className="max-h-[60vh] rounded-2xl border border-border/60 bg-background/75 p-4"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-8 text-center">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Open syllabus document</h3>
                    <p className="text-sm text-muted-foreground">This syllabus item is stored as a file.</p>
                  </div>
                  <Button asChild className="rounded-full">
                    <a href={viewItem.contentUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open file
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
