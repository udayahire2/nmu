import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Award, Users, Target, CheckCircle2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent space-y-20 pb-20">

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 px-6 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl space-y-6"
                >
                    <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/5 text-primary mb-4 backdrop-blur-sm">
                        Since 2024
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We provide study materials and resources for engineering students.
                    </p>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                >
                    {[
                        { label: "Students", value: "10,000+" },
                        { label: "Resources", value: "500+" },
                        { label: "Colleges", value: "50+" },
                        { label: "Happy Users", value: "100%" }
                    ].map((stat, i) => (
                        <Card key={i} className="bg-background/40 backdrop-blur-sm border-border/40 text-center py-8 hover:bg-background/60 transition-colors">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                        </Card>
                    ))}
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold tracking-tight">Our Goal</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We want to make learning easy for everyone. We believe that good study material should be available to all students, anytime.
                        </p>
                        <ul className="space-y-4">
                            {['Free access to notes', 'Content by students', 'Verified by teachers'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-foreground/80">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] w-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-3xl border border-border/40 overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Target className="h-32 w-32 text-primary/20" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
                    <p className="text-muted-foreground text-lg">What matters to us.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: Lightbulb, title: "Innovation", desc: "Always finding new ways to help you learn." },
                        { icon: Users, title: "Community", desc: "Built by students, for students." },
                        { icon: Award, title: "Quality", desc: "We ensure all notes are correct and useful." }
                    ].map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-border/40 bg-background/40 backdrop-blur-sm hover:border-primary/50 transition-all hover:-translate-y-1">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <val.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{val.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {val.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Our Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { name: "Uday Ahire", role: "Founder & Developer", color: "bg-blue-500" },
                        { name: "Hitesh Mayche", role: "Frontend Developer", color: "bg-purple-500" },
                        { name: "Raj Deore", role: "UI/UX Designer", color: "bg-green-500" }
                    ].map((member, i) => (
                        <motion.div
                            key={i}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-background shadow-xl group-hover:scale-105 transition-transform ring-2 ring-border">
                                <AvatarFallback className={`text-white text-xl font-bold ${member.color}`}>
                                    {member.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-6 max-w-3xl">
                <Card className="border-border/40 bg-background/40 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Common Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-border/40">
                                <AccordionTrigger className="text-left">Is it free?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Yes, most of our resources are free for students.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-border/40">
                                <AccordionTrigger className="text-left">Can I upload my notes?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    Yes, you can share your notes with others after signing up.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border-border/40">
                                <AccordionTrigger className="text-left">Is the content updated?</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    We add new papers and notes every week.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </section>

            {/* CTA Section */}
            <section className="text-center py-12 px-6">
                <h2 className="text-3xl font-bold mb-6">Start Learning</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base" asChild>
                        <Link to="/resources">View Resources</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                        <Link to="/signup">
                            Join Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}
