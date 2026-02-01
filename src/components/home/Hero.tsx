"use client";

import {
    SiApple,
    SiFacebook,
    SiGithub,
    SiGoogle,
    SiInstagram,
    SiX,
    SiYoutube,
} from "@icons-pack/react-simple-icons";
import {
    Announcement,
    AnnouncementTag,
    AnnouncementTitle,
} from "@/components/kibo-ui/announcement";
import {
    Marquee,
    MarqueeContent,
    // MarqueeFade,
    MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const logos = [
    {
        name: "GitHub",
        icon: SiGithub,
        url: "https://github.com",
    },
    {
        name: "Facebook",
        icon: SiFacebook,
        url: "https://facebook.com",
    },
    {
        name: "Google",
        icon: SiGoogle,
        url: "https://google.com",
    },
    {
        name: "X",
        icon: SiX,
        url: "https://x.com",
    },
    {
        name: "Apple",
        icon: SiApple,
        url: "https://apple.com",
    },
    {
        name: "Instagram",
        icon: SiInstagram,
        url: "https://instagram.com",
    },
    {
        name: "YouTube",
        icon: SiYoutube,
        url: "https://youtube.com",
    },
];

const Hero = () => (
    <div className="relative flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background Effects */}


        <div className="container relative z-10 flex flex-col items-center gap-8 px-4 text-center sm:px-8">

            {/* Announcement */}
            <Link to="#" className="animate-fade-in-up [--animation-delay:200ms]">
                <Announcement className="mx-auto max-w-fit border-primary/20 bg-primary/5 backdrop-blur-sm transition-all hover:bg-primary/10 hover:border-primary/40 shadow-sm">
                    <AnnouncementTag className="bg-primary/20 text-primary">Update</AnnouncementTag>
                    <AnnouncementTitle className="text-sm font-medium">Content is organized by syllabus</AnnouncementTitle>
                </Announcement>
            </Link>

            {/* Heading */}
            <div className="max-w-5xl space-y-6 animate-fade-in-up [--animation-delay:400ms]">
                <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                    University <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        Study Resources
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed">
                    Download notes, previous question papers, and other study materials for your exams.
                </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up [--animation-delay:600ms]">
                <Button size="lg" className="h-14 min-w-[180px] text-lg px-8 transition-all hover:-translate-y-0.5" asChild>
                    <Link to="/resources">View Resources</Link>
                </Button>
            </div>

            {/* Social Proof */}
            <section className="mt-20 flex w-full flex-col items-center gap-8 animate-fade-in-up [--animation-delay:800ms]">
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em]">
                    Used by students from
                </p>
                <div className="w-full max-w-[90vw] overflow-hidden opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                    <Marquee pauseOnHover speed={40} className="[--gap:4rem]">
                        <MarqueeContent>
                            {logos.map((logo) => (
                                <MarqueeItem className="mx-8 size-8 md:size-12" key={logo.name}>
                                    <logo.icon className="h-full w-full" />
                                </MarqueeItem>
                            ))}
                        </MarqueeContent>
                    </Marquee>
                </div>
            </section>



            {/* Video Player Removed */}
        </div>
    </div>
);

export { Hero };
export default Hero;
