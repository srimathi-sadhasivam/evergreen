import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Evergreen Traders - Fresh Tender Coconut & Coconut Wholesalers | Paramathi Velur</title>
        <meta
          name="description"
          content="Evergreen Traders is a trusted tender coconut and coconut wholesaler in Paramathi Velur, Namakkal. 10+ years experience supplying fresh quality coconuts to retailers and bulk buyers."
        />
        <meta
          name="keywords"
          content="coconut wholesaler, tender coconut, Paramathi Velur, Namakkal, fresh coconut, bulk coconut supply, Tamil Nadu coconut supplier"
        />
        <link rel="canonical" href="https://evergreentraders.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Evergreen Traders - Fresh Tender Coconut & Coconut Wholesalers" />
        <meta property="og:description" content="Trusted coconut wholesaler in Paramathi Velur. Fresh quality coconuts since 2012." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Evergreen Traders",
            "description": "Fresh Tender Coconut & Coconut Wholesalers",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Near Kabilar Malai, Periyamaruthur, Ayyampalayam Post",
              "addressLocality": "Paramathi Velur",
              "addressRegion": "Tamil Nadu",
              "postalCode": "638182",
              "addressCountry": "IN"
            },
            "telephone": "+919876543210",
            "openingHours": "Mo-Su 06:00-20:00",
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <WhyChooseUsSection />
          <ContactSection />
          <MapSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
};

export default Index;
