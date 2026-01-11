import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="page-header pt-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">About Our Chapter</h1>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Statement */}
          <div className="content-card">
            <h2 className="text-2xl font-bold text-secondary font-display mb-4">Mission Statement</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The National Junior Honor Society (NJHS) elevates a school's commitment to the values 
              of scholarship, service, leadership, character, and citizenship. These five pillars have 
              been associated with membership in the organization since its inception in 1929.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              At BASIS Cedar Park, our chapter empowers students to apply these principles in their 
              daily lives, fostering a culture of academic excellence and civic engagement within our 
              school community.
            </p>
          </div>

          {/* Two column section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="content-card">
              <h2 className="text-2xl font-bold text-secondary font-display mb-4">History</h2>
              <p className="text-muted-foreground leading-relaxed">
                Established in 1929, the National Junior Honor Society (NJHS) is one of the nation's 
                premier organizations established to recognize outstanding middle level students. 
                More than just an honor roll, NJHS serves to honor those students who have 
                demonstrated excellence in the areas of scholarship, service, leadership, character, 
                and citizenship.
              </p>
            </div>

            <div className="content-card">
              <h2 className="text-2xl font-bold text-secondary font-display mb-4">Selection Process</h2>
              <p className="text-muted-foreground leading-relaxed">
                Membership is by invitation only. Students in grades 6-9 who meet the scholarship 
                requirement of a high cumulative GPA are invited to complete a Candidate Form. A 
                Faculty Council then evaluates candidates based on their service, leadership, character, 
                and citizenship history.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;