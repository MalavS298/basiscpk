const Hero = () => {
  return <section className="relative min-h-[80vh] hero-gradient flex items-center justify-center overflow-hidden pt-16">
      {/* Floating decorative circles */}
      <div className="floating-circle w-96 h-96 -top-48 -left-48" />
      <div className="floating-circle w-64 h-64 top-1/4 right-10" />
      <div className="floating-circle w-48 h-48 bottom-20 left-1/4" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-8">
          <span className="px-6 py-2 border-2 border-primary text-primary text-sm font-semibold tracking-widest rounded">
            ESTABLISHED 2024 
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-display">
          Scholarship. Service.
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 font-display italic">
          Leadership.
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          The National Junior Honor Society at BASIS Cedar Park recognizes 
          outstanding middle school students who demonstrate excellence in the 
          areas of scholarship, service, leadership, character, and citizenship.
        </p>
      </div>
    </section>;
};
export default Hero;