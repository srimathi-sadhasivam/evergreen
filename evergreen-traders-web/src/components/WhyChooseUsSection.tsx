import { Leaf, Package, Users, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh & Natural Products",
    description: "Directly sourced from trusted local farms, ensuring maximum freshness and quality.",
  },
  {
    icon: Package,
    title: "Bulk & Wholesale Supply",
    description: "Flexible quantities from small orders to large bulk supplies for your business needs.",
  },
  {
    icon: Users,
    title: "Trusted Local Supplier",
    description: "Serving the community since 2012 with reliable service and consistent quality.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    description: "Prompt and dependable delivery to your location, keeping your business running smoothly.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="section-padding bg-cream">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reasons why businesses trust Evergreen Traders for their coconut needs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center p-8 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Circle */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
