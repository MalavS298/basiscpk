import { GraduationCap, Award, Users, Heart, BookOpen, Globe } from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "College Recognition",
    description: "NJHS membership is highly valued by college admissions committees and demonstrates your commitment to excellence and service.",
  },
  {
    icon: Award,
    title: "Scholarship Opportunities",
    description: "Access to exclusive NJHS scholarships and awards, including the National Junior Honor Society Scholarship Program.",
  },
  {
    icon: Users,
    title: "Leadership Development",
    description: "Participate in leadership workshops, conferences, and opportunities to develop essential life skills.",
  },
  {
    icon: Heart,
    title: "Service Projects",
    description: "Make a meaningful impact through organized community service projects and volunteer opportunities.",
  },
  {
    icon: BookOpen,
    title: "Academic Support",
    description: "Access to tutoring programs, study groups, and academic mentorship from fellow members and alumni.",
  },
  {
    icon: Globe,
    title: "National Network",
    description: "Join a prestigious national network of over one million NJHS alumni across the United States.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Member Benefits & Opportunities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Being a member of our Honor Society opens doors to exclusive opportunities and lifelong benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="benefit-card">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
