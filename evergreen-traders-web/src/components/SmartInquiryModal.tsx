import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const marketStatus = getMarketStatus();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    productType: product?.name || "",
    quantity: "",
    totalPrice: "",
  });

  // Safety check - if no product or invalid, don't render modal
  if (!product || !isOpen) {
    return null;
  }

  const productTypes = [
    "Premium Tender Coconut",
    "Natural Coconut Water Grade",
    "Regular Brown Coconut",
    "Export Grade Green Coconut",
    "Semi Husked Wholesale Coconut",
    "Dry Coconut (Copra)",
    "Coconut Shell Powder",
    "Coconut Oil (Virgin)",
  ];

  const handleWhatsAppInquiry = async () => {
    try {
      // Validation
      if (!formData.customerName.trim() || !formData.productType.trim() || !formData.quantity.trim() || !formData.totalPrice.trim()) {
        if (toast) {
          toast({
            title: "Validation Error",
            description: "Please fill all required fields",
            variant: "destructive",
          });
        }
        return;
      }

      // Send data to API first
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
        // Create WhatsApp message with proper encoding
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

        // Generate safe WhatsApp URL
        const whatsappUrl = `https://wa.me/919842868885?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in new window
        window.open(whatsappUrl, '_blank');

        // Show success message
        if (toast) {
          toast({
            title: "Inquiry Submitted",
            description: "Your order inquiry has been sent via WhatsApp",
          });
        }

        // Close modal after successful submission
        if (onClose) {
          onClose();
        }
      } else {
        throw new Error(result.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      
      // Show error message
      if (toast) {
        toast({
          title: "Submission Error",
          description: "Failed to submit your inquiry. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleTamilVoice = () => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
            // Silently fail - don't crash the modal
          });
          setIsPlaying(true);
          audioRef.current.onended = () => {
            setIsPlaying(false);
          };
        }
      }
    } catch (error) {
      console.error('Error with audio playback:', error);
      // Silently fail - don't crash the modal
    }
  };

  const getCategoryClasses = (category: WholesaleProduct["category"]) => {
    if (category === "PREMIUM") return "bg-emerald-100 text-emerald-800";
    if (category === "WATER") return "bg-cyan-100 text-cyan-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8 bg-white shadow-2xl">
          {/* Header */}
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="font-display text-2xl font-bold text-gray-900">
              Product Inquiry
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              Get details about {product.name}
            </p>
          </DialogHeader>

                <div className="space-y-6">
                  {/* Product Image and Name */}
                  <div className="relative">
                    <div className="h-32 w-full overflow-hidden rounded-2xl">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryClasses(product.category)}`}>
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  </div>

                  {/* Market Price with Live Indicator */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Market Price</p>
                        <p className="text-2xl font-bold" style={{ color: BRAND_GREEN }}>
                          ₹{product.currentPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className={`text-sm font-medium ${marketStatus.color}`}>
                          {marketStatus.english}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Market Status in Tamil and English */}
                  <div className="text-center bg-gray-50 rounded-2xl p-3">
                    <p className="text-sm text-gray-600">Market Status</p>
                    <p className="text-lg font-bold text-gray-900">{marketStatus.tamil}</p>
                    <p className="text-sm text-gray-500">{marketStatus.english}</p>
                  </div>

                  {/* Product Summary */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Product Summary</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{product.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">MOQ:</span>
                        <span className="font-medium">{product.MOQ} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shelf Life:</span>
                        <span className="font-medium">{product.shelfLife}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tamil Voice Support */}
                  <div className="text-center">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                      onClick={handleTamilVoice}
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      {isPlaying ? "Stop Audio" : "Listen in Tamil"}
                      <span className="text-xs text-gray-500 ml-2">(Listen about this product)</span>
                    </Button>
                  </div>

                  {/* Order Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type *
                      </label>
                      <Select
                        value={formData.productType}
                        onValueChange={(value) => setFormData({ ...formData, productType: value })}
                      >
                        <SelectTrigger className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          {productTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity *
                      </label>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Enter quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Price *
                      </label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter total price"
                        value={formData.totalPrice}
                        onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                        className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full text-white py-3 flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity rounded-xl"
                      style={{ backgroundColor: BRAND_GREEN }}
                      onClick={handleWhatsAppInquiry}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-semibold">WhatsApp Inquiry</span>
                    </Button>

                    <a
                      href="tel:+919842868885"
                      className="w-full py-3 flex items-center justify-center space-x-2 border-2 border-gray-200 hover:bg-red-50 transition-colors rounded-xl text-center text-decoration-none"
                    >
                      <Phone className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-600">Call Now</span>
                      <span className="text-sm text-gray-600">+91 98428 68885</span>
                    </a>
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
      </Dialog>
      
      {/* Hidden audio element for Tamil voice */}
      <audio ref={audioRef} src="/audio/tamil-product-info.mp3" preload="none" />
    </>
  );
};

export default SmartInquiryModal;
