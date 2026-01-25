import { Card } from "@/components/ui/card"
import { Lightbulb, Award, Users, Target } from "lucide-react"

export default function AboutPage() {
    const values = [
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "We embrace creative solutions and stay ahead of the curve, constantly pushing boundaries."
        },
        {
            icon: Award,
            title: "Quality",
            description: "Excellence is not an act but a habit in everything we do, every single day."
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "We believe the best results come from teamwork and open communication."
        },
        {
            icon: Target,
            title: "Impact",
            description: "We measure success by the positive impact we create for our users and community."
        }
    ]

    const teamMembers = [
        { name: "Alex Johnson", role: "Founder & CEO", image: "👨‍💼" },
        { name: "Sarah Chen", role: "Lead Designer", image: "👩‍🎨" },
        { name: "Mike Rodriguez", role: "CTO", image: "👨‍💻" },
        { name: "Emma Wilson", role: "Product Manager", image: "👩‍💼" }
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative overflow-hidden py-20 px-4 sm:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
                <div className="relative container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        About Our Mission
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        We're building the future of digital experiences by combining innovation, quality, and a passion for solving real problems.
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-16 space-y-20">
                {/* Mission Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            We're committed to creating exceptional digital experiences that empower users and solve real-world problems.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Our mission is to build products that are not only functional but delightful to use, making a tangible difference in people's lives.
                        </p>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                        <div className="text-6xl">🎯</div>
                    </div>
                </section>

                {/* Values Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            These principles guide everything we do and how we work together.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                {/* Team Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Talented individuals united by a shared vision and passion for excellence.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                    <div className="text-7xl">{member.image}</div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                                    <p className="text-muted-foreground text-sm">{member.role}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-primary/5 rounded-2xl p-12">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">500+</div>
                            <p className="text-muted-foreground">Happy Customers</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">50+</div>
                            <p className="text-muted-foreground">Projects Delivered</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">5+</div>
                            <p className="text-muted-foreground">Years of Excellence</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center py-8">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                        Join us on our journey to create exceptional digital experiences.
                    </p>
                    <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
                        Get Started Today
                    </button>
                </section>
            </div>
        </div>
    )
}
