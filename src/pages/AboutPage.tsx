import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Award, Users, Target, CheckCircle2, ArrowRight } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground space-y-24 pb-20">

            {/* 1. Hero Section - Centered & Clean */}
            <section className="relative pt-24 pb-12 px-6 text-center space-y-6 max-w-4xl mx-auto">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full bg-secondary/50 backdrop-blur-sm border-border/50">
                    Established 2024
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent pb-2">
                    Empowering Future <br /> Innovators
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                    We're building the most accessible and comprehensive digital learning ecosystem for specialized engineering disciplines.
                </p>
            </section>

            {/* 2. Stats Grid - Minimal Cards */}
            <section className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                    { label: "Students", value: "10k+" },
                    { label: "Resources", value: "500+" },
                    { label: "Institutions", value: "50+" },
                    { label: "Satisfaction", value: "99%" }
                ].map((stat, i) => (
                    <Card key={i} className="bg-muted/30 border-none shadow-none text-center py-6">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                    </Card>
                ))}
            </section>

            <Separator className="max-w-6xl mx-auto bg-border/40" />

            {/* 3. Mission & Vision - Side by Side */}
            <section className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        To democratize access to high-quality educational resources. We believe that financial constraints or geographical location should never be a barrier to learning.
                    </p>
                    <ul className="space-y-3">
                        {['Open Access Materials', 'Community Driven Content', 'Expert Verified Resources'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative h-[400px] w-full bg-linear-to-br from-primary/20 to-secondary rounded-2xl overflow-hidden shadow-2xl skew-y-3 md:skew-y-0">
                    {/* Abstract visual/placeholder for mission image */}
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Target className="h-32 w-32 text-primary/40" />
                    </div>
                </div>
            </section>

            {/* 4. Values - Detailed Cards */}
            <section className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Core Values</h2>
                    <p className="text-muted-foreground text-lg">The principles that drive every decision we make.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: Lightbulb, title: "Innovation", desc: "Constantly pushing the boundaries of ed-tech." },
                        { icon: Users, title: "Community", desc: "Built by students, for students." },
                        { icon: Award, title: "Quality", desc: "Uncompromising standards for our content." }
                    ].map((val, i) => (
                        <Card key={i} className="group hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/50">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <val.icon className="h-6 w-6" />
                                </div>
                                <CardTitle>{val.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {val.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 5. Team Section - Avatars */}
            <section className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Meet the Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { name: "Alex J.", role: "Founder", color: "bg-chart-1" },
                        { name: "Sarah C.", role: "Lead Dev", color: "bg-chart-2" },
                        { name: "Mike R.", role: "Product", color: "bg-chart-3" },
                        { name: "Emma W.", role: "Design", color: "bg-chart-4" }
                    ].map((member, i) => (
                        <div key={i} className="group cursor-pointer">
                            <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-background shadow-xl group-hover:scale-105 transition-transform">
                                <AvatarFallback className={`text-white text-xl font-bold ${member.color}`}>
                                    {member.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. FAQ - Accordion */}
            <section className="container mx-auto px-6 max-w-3xl">
                <Card className="border-none shadow-sm bg-muted/20">
                    <CardHeader>
                        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                        <CardDescription>Everything you need to know about our platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is the content free?</AccordionTrigger>
                                <AccordionContent>
                                    Yes! Our core mission is accessibility. Most resources are completely free to use.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Can I contribute notes?</AccordionTrigger>
                                <AccordionContent>
                                    Absolutely. We encourage students to submit their own high-quality notes for review.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>How often is content updated?</AccordionTrigger>
                                <AccordionContent>
                                    We update our databases weekly with new lecture notes, video tutorials, and past papers.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </section>

            {/* 7. CTA */}
            <section className="text-center py-12 px-6">
                <h2 className="text-3xl font-semibold mb-4">Start learning today</h2>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="rounded-full px-8">Browse Resources</Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 group">
                        Join Community <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </section>

        </div>
    )
}
