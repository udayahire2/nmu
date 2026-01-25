"use client";
import image from '../../assets/team.png'
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
    MarqueeFade,
    MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { Button } from "@/components/ui/button";
import {
    VideoPlayer,
    VideoPlayerContent,
    VideoPlayerControlBar,
    VideoPlayerMuteButton,
    VideoPlayerPlayButton,
    VideoPlayerSeekBackwardButton,
    VideoPlayerSeekForwardButton,
    VideoPlayerTimeDisplay,
    VideoPlayerTimeRange,
    VideoPlayerVolumeRange,
} from "@/components/kibo-ui/video-player";
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
    <div className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20" />
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 flex flex-col items-center gap-8 px-4 text-center sm:px-8">

            {/* Announcement */}
            <Link to="#" className="animate-fade-in-up [--animation-delay:200ms]">
                <Announcement className="mx-auto max-w-fit border-primary/20 bg-primary/10 transition-all hover:bg-primary/15 hover:border-primary/30">
                    <AnnouncementTag className="bg-primary/20 text-primary">New</AnnouncementTag>
                    <AnnouncementTitle className="text-sm font-medium">Introducing Syllabus Components</AnnouncementTitle>
                </Announcement>
            </Link>

            {/* Heading */}
            <div className="max-w-4xl space-y-4 animate-fade-in-up [--animation-delay:400ms]">
                <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    The <span className="text-primary">Ultimate</span> Platform for <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        University Resources
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
                    Access premium study materials, syllabus-wise notes, and previous year papers.
                    Everything you need to ace your exams in one place.
                </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up [--animation-delay:600ms]">
                <Button size="lg" className="h-12 min-w-[160px] text-base px-8 " asChild>
                    <Link to="/resources">Start Learning</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 min-w-[160px] text-base px-8 " asChild>
                    <Link to="/about">
                        How it works
                    </Link>
                </Button>
            </div>

            {/* Social Proof */}
            <section className="mt-16 flex w-full flex-col items-center gap-6 animate-fade-in-up [--animation-delay:800ms]">
                <p className="text-sm font-medium text-muted-foreground/60 uppercase tracking-widest">
                    Trusted by students from
                </p>
                <div className="w-full max-w-[90vw] overflow-hidden opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                    <Marquee pauseOnHover speed={40} className="[--gap:3rem]">
                        <MarqueeContent>
                            {logos.map((logo) => (
                                <MarqueeItem className="mx-8 size-8 md:size-10" key={logo.name}>
                                    <logo.icon className="h-full w-full" />
                                </MarqueeItem>
                            ))}
                        </MarqueeContent>
                    </Marquee>
                </div>
            </section>

           

            {/* Team Collaboration Image */}
            <div className="mt-12 w-full max-w-5xl animate-fade-in-up [--animation-delay:1200ms]">
                <div className="relative rounded-xl border border-border/50 bg-background/50 p-1 backdrop-blur-3xl shadow-2xl overflow-hidden">
                    <div className="absolute -inset-1 z-[-1] rounded-xl bg-gradient-to-r from-primary/30 to-purple-600/30 blur-lg opacity-50" />
                    <img 
                    src={image}
                        alt="Team Collaboration" 
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>
            </div>
        </div>
    </div>
);

export { Hero };
export default Hero;
