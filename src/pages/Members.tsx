import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Users, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const requirements = [
  {
    title: "Academic Excellence",
    description: "Maintain a minimum cumulative GPA of 3.5 throughout your middle school career"
  },
  {
    title: "Leadership & Character",
    description: "Demonstrate outstanding leadership qualities, exemplary character, and commitment to service"
  },
  {
    title: "Grade Level",
    description: "Currently enrolled in grades 6-8 at BASIS Cedar Park"
  },
  {
    title: "Application Process",
    description: "Complete the comprehensive membership application during the designated submission period"
  },
  {
    title: "Service Commitment",
    description: "Complete at least 15 hours of community service annually as an active member"
  }
];

const Members = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="page-header pt-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Join Our Honor Society</h1>
          <p className="text-white/80">Learn about our membership requirements and application process.</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Membership Requirements */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-display mb-6">
                Membership Requirements
              </h2>
              <p className="text-muted-foreground mb-8">
                Becoming a member of the National Junior Honor Society is a prestigious honor that recognizes students who excel in all areas of their academic and personal development.
              </p>
              
              <div className="space-y-6">
                {requirements.map((req, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-secondary">{req.title}:</span>{" "}
                      <span className="text-muted-foreground">{req.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready to Apply Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary/10 rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-primary font-display mb-4 text-center">
                  Ready to Apply?
                </h3>
                <p className="text-muted-foreground text-sm text-center mb-6">
                  Our faculty advisor is here to guide you through the membership process and answer any questions about our chapter's activities, requirements, and expectations.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Application Period: Spring 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Faculty Advisor: TBA</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Meeting Location: TBA</span>
                  </div>
                </div>

                <Button className="w-full gap-2 bg-primary text-secondary hover:bg-primary/90">
                  <Mail className="w-4 h-4" />
                  Contact Our Advisor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Members;
