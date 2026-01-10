import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const requirements = [
  {
    title: "Academic Excellence",
    description: "Maintain a minimum cumulative GPA of 3.6 throughout your high school career",
  },
  {
    title: "Leadership & Character",
    description: "Demonstrate outstanding leadership qualities, exemplary character, and commitment to service",
  },
  {
    title: "Grade Level",
    description: "Currently enrolled in grades 10-12 at BASIS Cedar Park",
  },
  {
    title: "Application Process",
    description: "Complete the comprehensive membership application during the designated submission period",
  },
  {
    title: "Service Commitment",
    description: "Complete at least 20 hours of community service annually as an active member",
  },
];

const Membership = () => {
  return (
    <section id="membership" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Join Our Honor Society
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Requirements */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Membership Requirements
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Becoming a member of the National Honor Society is a prestigious honor that recognizes students who excel in all areas of their academic and personal development.
            </p>
            <div className="space-y-4">
              {requirements.map((req) => (
                <div key={req.title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{req.title}:</span>{" "}
                    <span className="text-muted-foreground">{req.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Ready to Apply?
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our faculty advisor is here to guide you through the membership process and answer any questions about our chapter's activities, requirements, and expectations.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Application Period</span>
                <span className="font-medium text-foreground">March 12-25, 2025</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Faculty Advisor</span>
                <span className="font-medium text-foreground">Ms. Grace Carlock</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Meeting Location</span>
                <span className="font-medium text-foreground">Room 204</span>
              </div>
            </div>

            <Button className="w-full gap-2" size="lg" asChild>
              <a href="mailto:grace.carlock@basised.com">
                <Mail className="w-4 h-4" />
                Contact Our Advisor
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
