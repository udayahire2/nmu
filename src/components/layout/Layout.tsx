import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const isResourcesPage = location.pathname.startsWith("/resources");

  return (
    <div className="relative flex min-h-screen flex-col bg-transparent">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/60 to-transparent dark:from-white/5" />
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,hsl(var(--border)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.22)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      </div>

      <Navbar />

      <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <main id="main-content" className="relative flex-1">
          {children || <Outlet />}
        </main>
      </div>

      {!isResourcesPage && <Footer />}
    </div>
  );
}
