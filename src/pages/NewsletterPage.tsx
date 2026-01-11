import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Newsletter {
  id: string;
  title: string;
  content: string;
  published_at: string;
}

const NewsletterPage = () => {
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
        .order("published_at", { ascending: false });

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="page-header pt-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Chapter Newsletter</h1>
          <p className="text-white/80">Stay informed with the latest updates from our chapter.</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading newsletters...</div>
          ) : newsletters.length === 0 ? (
            <div className="content-card text-center">
              <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No newsletters published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {newsletters.map((newsletter) => (
                <div key={newsletter.id} className="news-card">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-secondary font-display">{newsletter.title}</h2>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded whitespace-nowrap ml-4">
                      {new Date(newsletter.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {newsletter.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsletterPage;