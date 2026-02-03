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
          <p className="text-sm text-muted-foreground">
            Trusted by 10,000+ students
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Loved by Students
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Don't just take our word for it. Here's what your peers are saying.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <Marquee pauseOnHover speed={30} className="[--gap:2rem] py-4">
          <MarqueeContent>
            {testimonials.map((testimonial, i) => (
              <MarqueeItem key={i} className="mx-4">
                <Card className="w-[85vw] max-w-[380px] border-border/40 bg-background/40 backdrop-blur-sm hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-amber-500 fill-amber-500"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-border/50">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">
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
