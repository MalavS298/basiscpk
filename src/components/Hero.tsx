import { Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden flex items-center justify-center">
      {/* Floating circles */}
      <div className="floating-circle w-64 h-64 -top-32 -left-32 animate-float" style={{ animationDelay: "0s" }} />
      <div className="floating-circle w-48 h-48 top-1/4 -right-24 animate-float" style={{ animationDelay: "2s" }} />
      <div className="floating-circle w-32 h-32 bottom-1/4 left-1/4 animate-float" style={{ animationDelay: "4s" }} />
      <div className="floating-circle w-56 h-56 -bottom-28 right-1/3 animate-float" style={{ animationDelay: "1s" }} />
      <div className="floating-circle w-40 h-40 top-1/3 left-1/3 animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Flame icon with orange dot */}
        <div className="relative inline-block mb-8">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Flame className="w-10 h-10 text-white/80" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-njhs-orange" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          BASIS Cedar Park<br />
          National Junior Honor Society
        </h1>

        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Igniting excellence in scholarship, leadership, service, character, and citizenship among outstanding high school students.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 border-white gap-2 px-6"
            asChild
          >
            <a href="#membership">
              <Sparkles className="w-4 h-4" />
              Learn About Membership
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-white border border-white/30 hover:bg-white/10 gap-2 px-6"
            asChild
          >
            <a href="#activities">
              <Sparkles className="w-4 h-4" />
              View Our Impact
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
