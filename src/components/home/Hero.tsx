"use client";
import video from '../../assets/video.mp4'
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
            <div className="mt-16 w-full max-w-5xl animate-fade-in-up [--animation-delay:1200ms]">
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl">
                    {/* Premium Gradient Border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/60 via-purple-600/40 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '2px' }} />

                    {/* Inner Container */}
                    <div className="relative rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 overflow-hidden">
                        {/* Animated Background Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-primary/20 to-transparent blur-3xl pointer-events-none" />
                        </div>

                        <VideoPlayer className="relative">
                            <VideoPlayerContent src={video} className="rounded-xl w-full" loop autoPlay muted />


                            <VideoPlayerControlBar className="!flex-row !gap-2 !p-4 !bg-gradient-to-t !from-black/90 !via-black/50 !to-transparent">
                                {/* Play Button */}
                                <VideoPlayerPlayButton />

                                {/* Seek Buttons */}
                                <div className="flex items-center gap-1">
                                    <VideoPlayerSeekBackwardButton />
                                    <VideoPlayerSeekForwardButton />
                                </div>

                                {/* Progress Bar */}
                                <div className="flex-1">
                                    <VideoPlayerTimeRange />
                                </div>

                                {/* Time Display */}
                                <VideoPlayerTimeDisplay />

                                {/* Volume Control */}
                                <div className="flex items-center gap-1 group/volume">
                                    <VideoPlayerMuteButton />
                                    <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-200">
                                        <VideoPlayerVolumeRange />
                                    </div>
                                </div>
                            </VideoPlayerControlBar>
                        </VideoPlayer>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export { Hero };
export default Hero;
