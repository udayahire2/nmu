import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"


export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col relative bg-background scroll-smooth">
            {/* Accessibility Skip Link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md font-medium transition-colors"
            >
                Skip to main content
            </a>

            {/* Global Grid Pattern - Optimized for Performance & Visibility */}
            <div className="fixed inset-0 -z-10 h-screen w-full bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none select-none" />

            <Navbar />

            {/* Main Content with Responsive Container */}
            <div className="w-full max-w-screen-2xl mx-auto flex-1 flex flex-col">
                <main id="main-content" className="flex-1 w-full relative">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    )
}
