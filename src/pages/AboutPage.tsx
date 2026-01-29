import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import { Lightbulb, Award, Users, CheckCircle2, ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import student_image from '../assets/students.png'

export default function AboutPage() {
    const stats = [
        { label: "Active Students", value: "10K+", icon: Users },
        { label: "Resources", value: "500+", icon: BookOpen },
        { label: "Partner Colleges", value: "50+", icon: GraduationCap },
        { label: "Success Rate", value: "100%", icon: Award }
    ];

    const values = [
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Always finding new ways to help you learn."
        },
        {
            icon: Users,
            title: "Community",
            description: "Built by students, for students."
        },
        {
            icon: Award,
            title: "Quality",
            description: "We ensure all notes are correct and useful."
        }
    ];

    const team = [
        { name: "Uday Ahire", role: "Founder & Developer", initials: "UA" },
        { name: "Hitesh Mayche", role: "Frontend Developer", initials: "HM" },
        { name: "Raj Deore", role: "UI/UX Designer", initials: "RD" }
    ];

    const faqs = [
        {
            question: "Is it free?",
            answer: "Yes, all our resources are completely free for students."
        },
        {
            question: "Can I upload my notes?",
            answer: "Yes, you can share your notes with others after signing up and verification."
        },
        {
            question: "Is the content updated regularly?",
            answer: "We add new papers and notes every week to keep up with curriculum changes."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Established 2024</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Empowering <span className="text-primary">Engineering</span> Students
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            We provide high-quality study materials and resources curated specifically for
                            engineering students across all branches and years.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-border/40 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6 pb-5">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-3 rounded-xl bg-primary/5">
                                                <stat.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-foreground mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-muted-foreground font-medium">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">
                                    Our Mission & Vision
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We're dedicated to democratizing access to quality education by providing
                                    comprehensive study resources that help engineering students excel in their
                                    academic journey.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">What We Offer</h3>
                                <ul className="space-y-3">
                                    {['Free access to curated notes', 'Community-driven content', 'Quality verification by experts'].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="h-3 w-3 text-primary" />
                                            </div>
                                            <span className="text-foreground/90">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-background to-muted/30 shadow-lg">
                                <img
                                    src={student_image}
                                    alt="Students collaborating"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                                    <CardContent className="pt-8 pb-8 px-6">
                                        <div className="flex flex-col items-center text-center space-y-6">
                                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                <value.icon className="h-8 w-8 text-primary" />
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-semibold">{value.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-muted-foreground">
                            The passionate individuals behind the platform
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex-1 max-w-xs"
                            >
                                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-b from-background to-muted/20 border border-border/40 hover:border-primary/30 transition-all duration-300">
                                    <Avatar className="h-20 w-20 border-2 border-background shadow-md">
                                        <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-foreground text-lg font-semibold">
                                            {member.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground">
                            Find answers to common questions about our platform
                        </p>
                    </motion.div>

                    <Card className="border-border/50 bg-background/60 backdrop-blur-sm shadow-sm">
                        <CardContent className="p-0">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border-border/30 px-6"
                                    >
                                        <AccordionTrigger className="text-left py-4 hover:no-underline hover:text-primary">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pb-4">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Ready to Elevate Your Learning?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Join thousands of engineering students who are already acing their exams with our resources.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                size="lg"
                                className="h-12 px-8 font-medium"
                                asChild
                            >
                                <Link to="/resources">
                                    Browse Resources
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-8 font-medium border-border hover:border-primary/50"
                                asChild
                            >
                                <Link to="/signup">
                                    Create Free Account
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}