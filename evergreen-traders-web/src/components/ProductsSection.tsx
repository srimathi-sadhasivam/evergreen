import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Droplets } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "@/lib/api";

const ProductsSection = () => {
  const handleEnquiry = (productName: string) => {
    window.open(
      `https://wa.me/919876543210?text=Hello! I'm interested in your ${productName}. Please share more details.`,
      "_blank"
    );
  };

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We offer a variety of fresh coconuts to meet all your needs
          </p>
        </div>

        {/* Products Grid */}
        <ProductsGrid onEnquiry={handleEnquiry} />
      </div>
    </section>
  );
};

export default ProductsSection;

type ProductsGridProps = {
  onEnquiry: (productName: string) => void;
};

const ProductsGrid = ({ onEnquiry }: ProductsGridProps) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 border border-border space-y-4"
          >
            <Skeleton className="w-14 h-14 rounded-xl" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !products?.length) {
    return (
      <div className="text-center text-muted-foreground">
        No products available right now. Please contact us on WhatsApp for
        current stock details.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
        >
          {/* Image */}
          {product.imageUrl && (
            <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
            <Droplets className="w-7 h-7 text-primary" />
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            {product.name}
          </h3>

          {/* Price (optional) */}
          {product.price != null && (
            <p className="text-sm font-semibold text-primary mb-1">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          )}

          {/* Category (optional) */}
          {product.category && (
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              {product.category}
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
            {product.description}
          </p>

          {/* CTA Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
            onClick={() => onEnquiry(product.name)}
          >
            Enquire Now
          </Button>
        </div>
      ))}
    </div>
  );
};

