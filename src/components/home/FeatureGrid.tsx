import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookText, FileQuestion, Library, ArrowUpRight } from "lucide-react"

const features = [
    {
        title: "Syllabus-wise Notes",
        description: "Structured content perfectly matching your university requirements.",
        icon: BookText,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Previous Papers",
        description: "Access years of past question papers and exam patterns.",
        icon: FileQuestion,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Reference Resources",
        description: "Curated collection of standard reference books and essential links.",
        icon: Library,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
]

export function FeatureGrid() {
    return (
        <section className="container mx-auto py-12 md:py-24 lg:py-32 px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">Everything You Need</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We've curated the most essential resources to help you excel in your academic journey.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                    <Card key={index} className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20">
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-${feature.color.split('-')[1]}-500/5 pointer-events-none`} />

                        <CardHeader>
                            <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                                <feature.icon className={`h-6 w-6 ${feature.color}`} />
                            </div>
                            <CardTitle className="flex items-center gap-2">
                                {feature.title}
                                <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base leading-relaxed">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
