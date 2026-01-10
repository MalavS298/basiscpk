import { Calendar, Users, Mail, Clock, Award, Sparkles } from "lucide-react";

const events = [
  {
    icon: Calendar,
    title: "Monthly Chapter Meetings",
    date: "Every 2nd Tuesday",
    description: "Connect with fellow members and plan upcoming initiatives",
  },
  {
    icon: Users,
    title: "Community Service Projects",
    date: "Ongoing",
    description: "Make a difference through various volunteer opportunities",
  },
  {
    icon: Mail,
    title: "Honor Society Invitations",
    date: "March 12th, 2025",
    description: "Eligible students receive membership invitations",
  },
  {
    icon: Clock,
    title: "Application Deadline",
    date: "March 25th, 2025",
    description: "Final date to submit completed membership applications",
  },
  {
    icon: Award,
    title: "Membership Decisions",
    date: "April 18th, 2025",
    description: "New member selections announced to applicants",
  },
  {
    icon: Sparkles,
    title: "Induction Ceremony",
    date: "May 2nd, 2025",
    description: "Formal ceremony welcoming new Honor Society members",
  },
];

const Events = () => {
  return (
    <section id="activities" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events & Opportunities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay connected with our chapter activities and important dates throughout the academic year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.title} className="event-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <event.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-2">
                    {event.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
