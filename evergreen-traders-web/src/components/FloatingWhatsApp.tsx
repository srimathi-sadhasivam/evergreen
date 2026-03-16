import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open("https://wa.me/919842868885?text=Hello! I'm interested in your coconut products.", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-all duration-200"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary-foreground" />
      
      {/* Pulse Animation */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
    </button>
  );
};

export default FloatingWhatsApp;
