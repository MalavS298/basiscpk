import { GraduationCap, Heart, Users, Shield, Globe } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Scholarship",
    description: "Pursuing academic excellence through dedication to learning and intellectual growth",
  },
  {
    icon: Heart,
    title: "Service",
    description: "Contributing meaningfully to our school, community, and society through volunteer work",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Inspiring and guiding others through positive example and collaborative action",
  },
  {
    icon: Shield,
    title: "Character",
    description: "Demonstrating integrity, honesty, and respect in all interactions and decisions",
  },
  {
    icon: Globe,
    title: "Citizenship",
    description: "Being a responsible and engaged member of our school and community",
  },
];

const Pillars = () => {
  return (
    <section id="pillars" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Five Pillars of Honor Society
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our members embody these core values in their daily lives, both in and out of school.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`pillar-card ${index === 4 ? "lg:col-start-2" : ""}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
