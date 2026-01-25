import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { GridLine } from "@/components/ui/GridLine"

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col relative max-w-[1400px] mx-auto bg-background">
            <GridLine direction="vertical" className="absolute left-0 top-0 bottom-0 h-full z-50" />
            <GridLine direction="vertical" className="absolute right-0 top-0 bottom-0 h-full z-50" />

            {/* Global Grid Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <Navbar />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
