import { MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919876543210?text=Hello! I'm interested in your coconut products.", "_blank");
  };

  return (
    <footer className="bg-palm-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="font-display font-bold text-xl">
                Evergreen Traders
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Fresh Tender Coconut & Coconut Wholesalers
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold mb-2">Opening Hours</h4>
            <p className="text-primary-foreground/70 text-sm">
              Open Daily – From 6:00 AM
            </p>
          </div>

          {/* WhatsApp Button */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/10 my-8" />

        {/* Copyright */}
        <div className="text-center text-primary-foreground/60 text-sm">
          © {currentYear} Evergreen Traders. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
