import { Github, Twitter, Linkedin } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { GridLine } from "@/components/ui/grid-line"
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="w-full bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 pt-16 pb-8 relative">
            <GridLine className="absolute top-0 left-0" />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
                        <Logo />
                        <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-sm">
                            Dedicated to providing clear, organized, and reliable study resources for university students.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors group">
                                <Github className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors group">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors group">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link to="/syllabus" className="hover:text-primary transition-colors">Syllabus</Link></li>
                            <li><Link to="/resources" className="hover:text-primary transition-colors">Question Papers</Link></li>
                            <li><Link to="/resources" className="hover:text-primary transition-colors">Notes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="mailto:contribute@example.com" className="hover:text-primary transition-colors">Contribute</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© 2026 NMU Study Hub. Open Source.</p>
                    <p>Designed by Uday Ahire</p>
                </div>
            </div>
        </footer>
    )
}
