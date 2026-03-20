import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";

interface AuthShellProps {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  children: ReactNode;
}

export function AuthShell({
  badge,
  title,
  description,
  highlights,
  children,
}: AuthShellProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_28%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,420px)] lg:items-center lg:gap-12 lg:px-8 lg:py-16">
        <div className="hidden lg:flex flex-col gap-8 pr-6">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              {badge}
            </Badge>

            <div className="space-y-5">
              <Logo />
              <div className="space-y-3">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground xl:text-5xl">
                  {title}
                </h1>
                <p className="max-w-lg text-base leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/70 p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary">
                  <CheckCircle2 className="size-4" />
                </div>
                <p className="text-sm font-medium leading-6 text-foreground/90">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </section>
  );
}
