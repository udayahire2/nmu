import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NavbarSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      navigate("/resources");
      return;
    }

    navigate(`/syllabus?search=${encodeURIComponent(normalizedQuery)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[280px] items-center gap-2 rounded-2xl border border-border/70 bg-card/80 p-1.5 shadow-sm xl:w-[320px]"
      role="search"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search subject or code"
          className="h-9 rounded-xl border-0 bg-transparent pl-9 pr-2 shadow-none focus-visible:ring-0"
          aria-label="Search syllabus"
        />
      </div>
      <Button type="submit" size="sm" className="rounded-xl px-4">
        Search
      </Button>
    </form>
  );
}
