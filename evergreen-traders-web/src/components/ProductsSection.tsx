import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import SmartInquiryModal from "./SmartInquiryModal";
import { useState } from "react";

type WholesaleProduct = {
  name: string;
  currentPrice: number;
  category: "PREMIUM" | "WATER" | "REGULAR";
  weight: string;
  shelfLife: string;
  MOQ: number;
  imageUrl: string;
};

const WHOLESALE_PRODUCTS: WholesaleProduct[] = [
  {
    name: "Premium Tender Coconut",
    currentPrice: 38,
    category: "PREMIUM",
    weight: "500g-700g",
    shelfLife: "15 Days",
    MOQ: 300,
    imageUrl:
      "https://images.pexels.com/photos/1424457/pexels-photo-1424457.jpeg",
  },
  {
    name: "Natural Coconut Water Grade",
    currentPrice: 32,
    category: "WATER",
    weight: "450g-650g",
    shelfLife: "10 Days",
    MOQ: 500,
    imageUrl:
      "https://images.pexels.com/photos/36533618/pexels-photo-36533618.jpeg",
  },
  {
    name: "Regular Brown Coconut",
    currentPrice: 27,
    category: "REGULAR",
    weight: "550g-800g",
    shelfLife: "25 Days",
    MOQ: 700,
    imageUrl:
      "https://images.pexels.com/photos/7543123/pexels-photo-7543123.jpeg",
  },
  {
    name: "Semi Husked Wholesale Coconut",
    currentPrice: 29,
    category: "REGULAR",
    weight: "600g-850g",
    shelfLife: "20 Days",
    MOQ: 500,
    imageUrl:
      "https://images.pexels.com/photos/5608058/pexels-photo-5608058.jpeg",
  },
  {
    name: "Export Grade Green Coconut",
    currentPrice: 41,
    category: "PREMIUM",
    weight: "550g-750g",
    shelfLife: "18 Days",
    MOQ: 400,
    imageUrl:
      "https://images.pexels.com/photos/4004522/pexels-photo-4004522.jpeg",
  },
  {
    name: "Chilled Coconut Water Stock",
    currentPrice: 34,
    category: "WATER",
    weight: "400g-600g",
    shelfLife: "7 Days",
    MOQ: 600,
    imageUrl:
      "https://images.pexels.com/photos/3030371/pexels-photo-3030371.jpeg",
  },
  {
    name: "Copra Processing Coconut",
    currentPrice: 31,
    category: "REGULAR",
    weight: "650g-900g",
    shelfLife: "30 Days",
    MOQ: 800,
    imageUrl:
      "https://5.imimg.com/data5/SELLER/Default/2024/4/412323886/JZ/AT/XR/6630905/coconut-copra.jpg",
  },
  {
    name: "Temple Grade Tender Coconut",
    currentPrice: 36,
    category: "PREMIUM",
    weight: "500g-680g",
    shelfLife: "12 Days",
    MOQ: 500,
    imageUrl:
      "https://cpimg.tistatic.com/11029706/s/4/Semi-Husk-Coconut..jpg",
  },
];

const WHATSAPP_NUMBER = "919876543210";
const CALL_NUMBER = "+919876543210";
const BRAND_GREEN = "#166534";

const getBulkPrice = (price: number) => Math.round(price * 0.92);

const getCategoryClasses = (category: WholesaleProduct["category"]) => {
  if (category === "PREMIUM") return "bg-emerald-100 text-emerald-800";
  if (category === "WATER") return "bg-cyan-100 text-cyan-800";
  return "bg-amber-100 text-amber-800";
};

const buildWhatsAppTemplate = (product: WholesaleProduct) => {
  const message = `Hello Evergreen Traders! I am interested in ${product.name}. My estimated requirement is ${product.MOQ} units. Please send me the best quote for delivery to [Location].`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<WholesaleProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleEnquiry = (product: WholesaleProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCallNow = () => {
    window.location.href = `tel:${CALL_NUMBER}`;
  };

  const handleCatalogWhatsApp = () => {
    const message =
      "Hello Evergreen Traders! Please share your complete wholesale coconut catalog and today's bulk pricing.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="products" className="section-padding bg-background pb-28 md:pb-24">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-5">
            Professional wholesale catalog for retailers, distributors, and bulk buyers.
          </p>
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-white"
            style={{ backgroundColor: BRAND_GREEN }}
          >
            Last Updated: {today}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {WHOLESALE_PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-foreground leading-tight">
                    {product.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${getCategoryClasses(product.category)}`}
                  >
                    {product.category}
                  </span>
                </div>

                <p className="text-lg font-bold" style={{ color: BRAND_GREEN }}>
                  ₹{product.currentPrice.toLocaleString("en-IN")} / unit
                </p>

                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <p className="text-sm font-semibold text-foreground mb-2">Specs</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>Weight: {product.weight}</li>
                    <li>Shelf Life: {product.shelfLife}</li>
                    <li className="font-semibold text-foreground">
                      MOQ: <span style={{ color: BRAND_GREEN }}>{product.MOQ} units</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border p-3">
                  <p className="text-sm font-semibold text-foreground mb-2">Bulk Pricing</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left font-medium pb-1">Qty Range</th>
                        <th className="text-right font-medium pb-1">Price / Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-1.5">Up to 499</td>
                        <td className="py-1.5 text-right">₹{product.currentPrice}</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-1.5 font-semibold text-foreground">500+ Units</td>
                        <td className="py-1.5 text-right font-semibold" style={{ color: BRAND_GREEN }}>
                          ₹{getBulkPrice(product.currentPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button
                  className="w-full text-white"
                  style={{ backgroundColor: BRAND_GREEN }}
                  onClick={() => handleEnquiry(product)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enquire Now
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-border p-3">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full" onClick={handleCallNow}>
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button
            className="w-full text-white"
            style={{ backgroundColor: BRAND_GREEN }}
            onClick={handleCatalogWhatsApp}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Smart Inquiry Modal */}
      {selectedProduct && (
        <SmartInquiryModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
};

export default ProductsSection;

