import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";

interface AuthShellProps {
  badge: string;
  title: string;
  description: string;
  highlights?: string[];
  children: ReactNode;
}

export function AuthShell({
  badge,
  title,
  description,
  highlights = [],
  children,
}: AuthShellProps) {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
        <div className="mb-8 space-y-5 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="space-y-3">
            <Badge
              variant="outline"
              className="rounded-full border-border/60 bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              {badge}
            </Badge>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                {description}
              </p>
            </div>
          </div>

          {highlights.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {highlights.slice(0, 2).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
