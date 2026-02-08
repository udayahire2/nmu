import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

const testimonials = [
  {
    name: "Aarav Patel",
    role: "Computer Science",
    content:
      "This platform saved my semester! The notes are concise and exactly what I needed for exams.",
    avatar: "",
  },
  {
    name: "Sneha Reddy",
    role: "Engineering",
    content:
      "Finally, a place where I can find all previous year papers organized properly. Highly recommended!",
    avatar: "",
  },
  {
    name: "Mohit Verma",
    role: "Data Science",
    content:
      "The video lectures are explained so well. It's like having a personal tutor 24/7.",
    avatar: "",
  },
  {
    name: "Ishita Kaur",
    role: "Information Tech",
    content:
      "Love the UI! It's so clean and easy to navigate. Everything loads instantly.",
    avatar: "",
  },
  {
    name: "Rahul Mehta",
    role: "Mathematics",
    content:
      "A must-have resource for every university student. The community is great too.",
    avatar: "",
  },
];

interface TestimonialsSectionProps {
  compact?: boolean;
}

export function TestimonialsSection({ compact = false }: TestimonialsSectionProps) {
  if (compact) {
    return (
      <section className="py-2 overflow-hidden bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
            Endorsed by 10,000+ Students
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-16 text-center space-y-3">
        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-foreground">
          Student Feedback
        </h2>
        <p className="text-sm font-medium text-muted-foreground max-w-lg mx-auto leading-relaxed text-balance">
          Insights from peers across various engineering branches who have utilized these resources.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />

        <Marquee pauseOnHover speed={20} className="[--gap:1.5rem] py-2">
          <MarqueeContent>
            {testimonials.map((testimonial, i) => (
              <MarqueeItem key={i} className="mx-2">
                <Card className="w-[80vw] max-w-[340px] border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 rounded-lg">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm font-medium mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border/50">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-bold">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-xs text-foreground uppercase tracking-wider">
                          {testimonial.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}
