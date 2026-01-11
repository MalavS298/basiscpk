import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const officers = [
  {
    name: "Jane Doe",
    role: "President",
    initials: "JD",
    quote: "Excited to lead the chapter this year!",
  },
];

const Members = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="page-header pt-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Our Chapter</h1>
          <p className="text-white/80">Meet the students leading our community in scholarship and service.</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Chapter Officers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-secondary font-display text-center mb-8">Chapter Officers</h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {officers.map((officer, index) => (
                <div key={index} className="officer-card w-64">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{officer.initials}</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-1">{officer.name}</h3>
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded mb-3">
                    {officer.role}
                  </span>
                  <p className="text-muted-foreground text-sm italic">"{officer.quote}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Members */}
          <div>
            <h2 className="text-3xl font-bold text-secondary font-display text-center mb-8">Current Members</h2>
            <div className="content-card text-center">
              <p className="text-muted-foreground">Member roster updating soon.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Members;