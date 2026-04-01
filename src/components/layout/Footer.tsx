import { BookOpen, FileText, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/ui/logo";

const studyLinks = [
  { label: "Study Materials", to: "/resources", icon: BookOpen },
  { label: "Syllabus", to: "/syllabus", icon: FileText },
  { label: "Profile", to: "/profile", icon: UserCircle },
];

export function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-border/70 bg-card/60 py-10 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              A lighter study space for students who want notes, syllabus details, and previous papers without extra clutter.
            </p>
            <p className="text-sm text-muted-foreground">Built for quick study sessions on phone and laptop.</p>
          </div>

          <nav aria-label="Study links">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-foreground">
              Study
            </h3>
            <ul className="space-y-3">
              {studyLinks.map(({ label, to, icon: Icon }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-foreground">
              Help
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Choose the subject, open the topic, and start reading in a clean layout.</p>
              <a href="mailto:contribute@example.com" className="inline-flex text-foreground underline underline-offset-4">
                Contact support
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 NMU Study Hub</p>
          <p>Simple, calm, student-first learning UI</p>
        </div>
      </div>
    </footer>
  );
}
