import { useState } from "react";
import { Menu, X, Users, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Pillars", href: "#pillars" },
    { name: "Activities", href: "#activities" },
    { name: "Membership", href: "#membership" },
    { name: "Newsletter", href: "#newsletter" },
    { name: "Member Dashboard", href: "#dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="font-semibold text-foreground text-lg">BASIS Cedar Park NHS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              NHS
            </Button>
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Sun className="w-4 h-4" />
            </Button>
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <Link to="/login">
                <Button className="w-full">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
