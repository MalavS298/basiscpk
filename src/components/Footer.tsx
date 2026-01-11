import { Flame } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold text-lg">BASIS Cedar Park NJHS</div>
              <div className="text-sm text-muted-foreground">
                National Junior Honor Society
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#pillars" className="hover:text-primary transition-colors">
              Pillars
            </a>
            <a href="#activities" className="hover:text-primary transition-colors">
              Activities
            </a>
            <a href="#membership" className="hover:text-primary transition-colors">
              Membership
            </a>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BASIS Cedar Park National Junior Honor Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
