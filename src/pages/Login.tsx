import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-6">
            Login page coming soon. Tell me what you'd like here!
          </p>
          <Button className="w-full" disabled>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
