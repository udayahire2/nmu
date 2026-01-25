import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion";

const features = [
    {
        title: "Course Notes",
        description: "Notes organized by syllabus.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        // Custom path for Book icon
        path: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
    },
    {
        title: "Question Papers",
        description: "Old exam papers for practice.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        // Custom path for File icon
        path: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z M14 2v6h6"
    }
]

export function FeatureGrid() {
    return (
        <section className="container mx-auto py-24 md:py-32 px-4">
            <div className="text-center mb-20">
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6">Resources</h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    We have collected notes and papers for your studies.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        className="h-full"
                    >
                        <Card className="group relative overflow-hidden h-full border-border/40 bg-background/40 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-2 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-primary/20">
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${feature.color.split('-')[1]}-500/5 to-transparent pointer-events-none`} />

                            <CardHeader className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 transition-transform duration-500 shadow-inner ring-1 ring-inset ring-black/5`}>
                                    <svg
                                        className={`h-8 w-8 ${feature.color}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <motion.path
                                            d={feature.path}
                                            variants={{
                                                rest: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } },
                                                hover: { pathLength: 1.1, opacity: 1, transition: { duration: 1, repeat: Infinity, repeatType: "mirror" } } // Simple pulse not path drawing for now to keep it safe, actually lets do drawing
                                            }}
                                        />
                                        <motion.path
                                            d={feature.path}
                                            initial={{ pathLength: 1 }}
                                            variants={{
                                                rest: { pathLength: 1 },
                                                hover: { pathLength: [0, 1], transition: { duration: 1.5, ease: "easeInOut" } }
                                            }}
                                        />
                                    </svg>
                                </div>
                                <CardTitle className="flex items-center gap-2 text-2xl mb-2">
                                    {feature.title}
                                    <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <CardDescription className="text-lg leading-relaxed text-muted-foreground/80">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
