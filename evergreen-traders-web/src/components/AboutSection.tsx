import { Leaf } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-leaf-light">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Leaf className="w-8 h-8 text-primary" />
          </div>

          {/* Section Title */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Evergreen Traders
          </h2>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-secondary" />
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <div className="h-px w-12 bg-secondary" />
          </div>

          {/* About Content */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <span className="font-bold text-foreground">Evergreen Traders</span> is a trusted coconut and tender coconut wholesaler based in Paramathi Velur. With over{" "}
            <span className="font-bold text-primary">10+ years of experience</span>, we supply fresh and quality coconuts to retailers, shops, and bulk buyers. Customer satisfaction and freshness are our top priorities.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "500+", label: "Happy Customers" },
              { number: "100%", label: "Fresh Quality" },
              { number: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
