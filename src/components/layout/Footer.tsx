import { Github, Twitter, Linkedin } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Link } from "react-router-dom"

const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
]

const resourceLinks = [
    { label: "Syllabus", to: "/syllabus" },
    { label: "Question Papers", to: "/resources" },
    { label: "Notes", to: "/resources" },
]

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background pt-14 pb-8">
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4 sm:col-span-2">
                        <Logo />
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Dedicated to providing clear, organized, and reliable study resources for university students.
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-150"
                                >
                                    <Icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <nav aria-label="Resources">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-2.5">
                            {resourceLinks.map(({ label, to }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <nav aria-label="Contact">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href="mailto:contribute@example.com"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                                >
                                    Contribute
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                    <p>© 2026 NMU Study Hub. Open Source.</p>
                    <p>Designed by Uday Ahire</p>
                </div>
            </div>
        </footer>
    )
}
