import { BookOpen, Heart, Star, Users, Award } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Scholarship",
    description: "Commitment to learning and academic excellence.",
  },
  {
    icon: Heart,
    title: "Service",
    description: "Voluntary contributions to the school and community.",
  },
  {
    icon: Star,
    title: "Leadership",
    description: "Taking initiative and inspiring others to succeed.",
  },
  {
    icon: Users,
    title: "Character",
    description: "Demonstrating integrity, respect, and responsibility.",
  },
  {
    icon: Award,
    title: "Citizenship",
    description: "Understanding civic involvement and duty.",
  },
];

const Pillars = () => {
  return (
    <section id="pillars" className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">The Five Pillars</h2>
          <div className="section-underline" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="pillar-card group"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                <pillar.icon className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;