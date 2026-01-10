const testimonials = [
  {
    quote: "Being in NHS has taught me the importance of giving back to my community. The service projects we do make a real difference.",
    name: "Sarah M.",
    role: "Junior, Class of 2025",
    initial: "S",
  },
  {
    quote: "The leadership opportunities in NHS helped me develop confidence and skills that I use every day.",
    name: "Marcus T.",
    role: "Senior, Class of 2024",
    initial: "M",
  },
  {
    quote: "NHS membership was a key factor in my college applications. It shows commitment to excellence.",
    name: "Alexis R.",
    role: "Senior, Class of 2024",
    initial: "A",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Members Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {testimonial.initial}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
