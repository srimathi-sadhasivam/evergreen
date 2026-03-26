import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Phone, Volume2, X, TrendingUp, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WholesaleProduct = {
  name: string;
  currentPrice: number;
  category: "PREMIUM" | "WATER" | "REGULAR";
  weight: string;
  shelfLife: string;
  MOQ: number;
  imageUrl: string;
};

interface SmartInquiryModalProps {
  product: WholesaleProduct;
  isOpen: boolean;
  onClose: () => void;
}

const BRAND_GREEN = "#166534";
const WHATSAPP_NUMBER = "919842868885";
const CALL_NUMBER = "+919842868885";

const getMarketStatus = () => {
  const statuses = [
    { english: "Stable", tamil: "நிலையான", color: "text-green-600" },
    { english: "Increasing", tamil: "அதிகரிக்கும்", color: "text-red-600" },
    { english: "High Demand", tamil: "அதிக தேவை", color: "text-orange-600" },
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const SmartInquiryModal = ({ product, isOpen, onClose }: SmartInquiryModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const marketStatus = getMarketStatus();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    productType: "",
    quantity: "",
    totalPrice: "",
  });

  const handleWhatsAppInquiry = async () => {
    if (!formData.customerName.trim() || !formData.productType.trim() || !formData.quantity.trim() || !formData.totalPrice.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Send data to API
      const response = await fetch('/api/inquiries/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          phoneNumber: formData.phoneNumber,
          productName: formData.productType,
          quantity: formData.quantity,
          totalPrice: formData.totalPrice,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Create WhatsApp message with order details
        const whatsappMessage = `Hello Evergreen Traders! 
I saw the ${formData.productType} on your website. 
Order Details:
• Customer Name: ${formData.customerName}
• Phone: ${formData.phoneNumber || 'Not provided'}
• Product: ${formData.productType}
• Quantity: ${formData.quantity}
• Total Price: ₹${formData.totalPrice}

Order ID: ${result.orderId}
Please confirm availability and delivery timeline.`;

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919842868885?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        toast({
          title: "Inquiry Submitted",
          description: "Your order inquiry has been sent via WhatsApp",
        });

        // Close modal
        onClose();
      } else {
        throw new Error(result.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTamilVoice = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    }
  };

  const getCategoryClasses = (category: WholesaleProduct["category"]) => {
    if (category === "PREMIUM") return "bg-emerald-100 text-emerald-800";
    if (category === "WATER") return "bg-cyan-100 text-cyan-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-4 rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-center text-lg font-bold text-gray-900">
            Product Inquiry
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Image and Name */}
          <div className="relative">
            <div className="h-48 w-full overflow-hidden rounded-xl">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute top-3 right-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryClasses(product.category)}`}
              >
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Name */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          </div>

          {/* Market Price with Live Indicator */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Market Price</p>
                <p className="text-2xl font-bold" style={{ color: BRAND_GREEN }}>
                  ₹{product.currentPrice.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-semibold text-red-600">Live</span>
              </div>
            </div>
          </div>

          {/* Market Status */}
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Today's Market Status:</span>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className={`text-sm font-bold ${marketStatus.color}`}>
                  {marketStatus.english} / {marketStatus.tamil}
                </span>
              </div>
            </div>
          </div>

          {/* Product Summary */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" style={{ color: BRAND_GREEN }} />
              Product Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-semibold text-gray-900">{product.weight}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">MOQ</span>
                <span className="text-sm font-semibold" style={{ color: BRAND_GREEN }}>
                  {product.MOQ} units
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Shelf Life</span>
                <span className="text-sm font-semibold text-gray-900">{product.shelfLife}</span>
              </div>
            </div>
          </div>

          {/* Tamil Voice Support */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 py-3 border-2 hover:bg-orange-50 transition-colors"
            onClick={handleTamilVoice}
            disabled={isPlaying}
          >
            <Volume2 className={`h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
            <span className="font-semibold">இந்த தயாரிப்பு பற்றி கேட்க</span>
            <span className="text-sm text-gray-600">(Listen about this product)</span>
          </Button>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full text-white py-3 flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: BRAND_GREEN }}
              onClick={handleWhatsAppInquiry}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">WhatsApp Inquiry</span>
            </Button>

            <Button
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-2 border-2 hover:bg-red-50 transition-colors"
            >
              <Phone className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-600">Call Now</span>
              <span className="text-sm text-gray-600">+91 98428 68885</span>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Trusted by 500+ Retailers</span>
            </div>
          </div>
        </div>
      </DialogContent>
      
      {/* Hidden audio element for Tamil voice */}
      <audio ref={audioRef} src="/audio/tamil-product-info.mp3" preload="none" />
    </Dialog>
  );
};

export default SmartInquiryModal;
