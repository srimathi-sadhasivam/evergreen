import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Play } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-coconut-farm.jpg";
import { AnimatedContainer, useScrollAnimation } from "@/components/ui/motion";

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919842868885?text=Hello! I'm interested in your coconut products.", "_blank");
  };

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lush coconut palm grove at golden hour"
          className="w-full h-full object-cover"
        />
        {/* Darker overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        {/* Subtle animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-emerald-900/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <AnimatedContainer variant="fadeInUp" delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Trusted Since 2012
              </span>
            </div>
          </AnimatedContainer>

          {/* Main Heading */}
          <AnimatedContainer variant="fadeInUp" delay={0.3}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Evergreen Traders
            </h1>
          </AnimatedContainer>

          {/* Subheading */}
          <AnimatedContainer variant="fadeInUp" delay={0.4}>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-4">
              Fresh Tender Coconut & Coconut Wholesalers
            </p>
          </AnimatedContainer>

          {/* Supporting Text */}
          <AnimatedContainer variant="fadeInUp" delay={0.5}>
            <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Serving Paramathi Velur & Nearby Areas with Fresh Quality Since 2012
            </p>
          </AnimatedContainer>

          {/* CTA Buttons */}
          <AnimatedContainer variant="fadeInUp" delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="whatsapp"
                size="xl"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto backdrop-blur-sm bg-green-500/90 hover:bg-green-500 border border-green-400/50"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                onClick={handleContactClick}
                className="w-full sm:w-auto backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 text-white hover:text-white"
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </Button>
            </div>
          </AnimatedContainer>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
