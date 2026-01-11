import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper } from "lucide-react";

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
        .limit(5);

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="newsletter" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading newsletters...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Newspaper className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest Newsletters
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, events, and announcements from NJHS.
          </p>
        </div>

        {newsletters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No newsletters published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {newsletters.map((newsletter) => (
              <article
                key={newsletter.id}
                className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                    {newsletter.title}
                  </h3>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(newsletter.published_at), "MMM d, yyyy")}
                  </time>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="whitespace-pre-wrap">{newsletter.content}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;