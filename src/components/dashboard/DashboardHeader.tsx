import { Button } from "@/components/ui/button";
import { LogOut, Award, Shield } from "lucide-react";

interface DashboardHeaderProps {
  userName: string | null | undefined;
  isAdmin: boolean;
  onSignOut: () => void;
}

const DashboardHeader = ({ userName, isAdmin, onSignOut }: DashboardHeaderProps) => {
  const displayName = userName || "Member";
  const firstName = displayName.split(" ")[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-6 md:p-8">
      {/* Background decoration */}
      <div className="absolute right-4 top-4 opacity-20">
        <Award className="w-24 h-24 md:w-32 md:h-32 text-white" />
      </div>
      
      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display">
          Welcome back, {firstName}!
        </h1>
        
        <p className="text-white/80 text-sm md:text-base mb-3">
          NJHS Member Dashboard
        </p>
        
        <div className="flex items-center gap-3">
          {isAdmin && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              <Shield className="w-3 h-3" />
              Admin
            </span>
          )}
        </div>
      </div>

      {/* Sign out button */}
      <Button 
        variant="ghost" 
        onClick={onSignOut} 
        className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden md:inline">Sign Out</span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
