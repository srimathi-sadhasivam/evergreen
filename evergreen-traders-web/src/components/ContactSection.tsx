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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Check if required fields are filled
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Send data to API
      console.log('Submitting contact form to:', '/api/inquiries/contact');
      console.log('Form data:', {
        customerName: formData.name,
        phoneNumber: formData.phone,
        message: formData.message,
      });

      const response = await fetch('/api/inquiries/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.name,
          phoneNumber: formData.phone,
          message: formData.message,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        // Create WhatsApp message with order details
        const whatsappMessage = `Hello Evergreen Traders! 
New Inquiry from Website:
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}

Order ID: ${result.orderId}`;

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/919842868885?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

        toast({
          title: "Redirecting to WhatsApp",
          description: "Your message is ready to send via WhatsApp.",
        });

        setFormData({ name: "", phone: "", message: "" });
      } else {
        throw new Error(result.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      console.error('Full error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Fallback: Still allow WhatsApp redirect even if API fails
      const whatsappMessage = `Hello Evergreen Traders! 
New Inquiry from Website:
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}`;

      // Open WhatsApp with pre-filled message as fallback
      window.open(`https://wa.me/919842868885?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

      toast({
        title: "Opening WhatsApp",
        description: "Database save failed, but you can still send us a message via WhatsApp.",
        variant: "default",
      });

      setFormData({ name: "", phone: "", message: "" });
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919842868885?text=Hello! I'm interested in your coconut products.", "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919842868885";
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
                  +91 98428 68885
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
