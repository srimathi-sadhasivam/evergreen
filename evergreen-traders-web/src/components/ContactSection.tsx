import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with form data
    const whatsappMessage = `Hello! My name is ${formData.name}.\n\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );

    toast({
      title: "Redirecting to WhatsApp",
      description: "Your message is ready to send via WhatsApp.",
    });

    setFormData({ name: "", phone: "", message: "" });
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919876543210?text=Hello! I'm interested in your coconut products.", "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919876543210";
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get in touch with us for orders, inquiries, or any questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Our Location</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Near Kabilar Malai, Periyamaruthur,<br />
                  Ayyampalayam Post, Paramathi Velur,<br />
                  Namakkal – 638182
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Phone</h3>
                <button
                  onClick={handlePhoneClick}
                  className="text-primary hover:underline font-medium"
                >
                  +91 98765 43210
                </button>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Opening Hours</h3>
                <p className="text-muted-foreground">
                  Open Daily – From 6:00 AM
                </p>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="whatsapp"
                size="lg"
                className="flex-1"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handlePhoneClick}
              >
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-soft">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
