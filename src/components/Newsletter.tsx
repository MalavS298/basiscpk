import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Newsletter {
  id: string;
  title: string;
  content: string;
  published_at: string;
}

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

  const latestNewsletter = newsletters[0];

  return (
    <section id="newsletter" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="news-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-secondary font-display">Chapter News</h2>
            </div>
            <Link to="/newsletter">
              <Button variant="outline" size="sm" className="text-secondary border-secondary hover:bg-secondary hover:text-white">
                Updates
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : latestNewsletter ? (
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-secondary">{latestNewsletter.title}</h3>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded">
                  {new Date(latestNewsletter.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {latestNewsletter.content}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No newsletters published yet. Check back soon!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;