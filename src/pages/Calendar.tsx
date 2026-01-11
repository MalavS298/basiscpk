import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Calendar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="page-header pt-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Events Calendar</h1>
          <p className="text-white/80">Stay up to date with our chapter meetings and events.</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="content-card">
            <div className="aspect-video w-full">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FChicago"
                style={{ border: 0 }}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                className="rounded-lg min-h-[500px]"
                title="NJHS Calendar"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Note: This is a placeholder calendar. The actual chapter calendar will be embedded here.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Calendar;