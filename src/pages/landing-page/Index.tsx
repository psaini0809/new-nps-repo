import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Building2, TrendingUp, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import commercialImage from "@/assets/commercial-property.jpg";
import villaImage from "@/assets/luxury-villa.jpg";
import studioImage from "@/assets/studio-apartment.jpg";
import heroImage from "@/assets/hero-luxury-apartments.jpg";
import AboutSection from "./about-page";
import PropertiesSection from "./featured-page";
import WhyChooseSection from "./why-choose-us";
import CTASection from "./cta";
import SocialSidebar from "@/components/socialSidebar";
import ConsultationSection from "./consultation";
import CustomerReviewsSection from "./customer-review";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const featuredProperties = [
    {
      id: "1",
      image: heroImage,
      title: "Luxury Residential Apartments",
      location: "Sector 137, Noida",
      price: "₹85 Lakhs",
      bedrooms: 3,
      bathrooms: 3,
      area: "1850 sq.ft",
      type: "Residential",
    },
    {
      id: "2",
      image: commercialImage,
      title: "Premium Commercial Space",
      location: "Knowledge Park, Greater Noida",
      price: "₹1.2 Cr",
      area: "2500 sq.ft",
      type: "Commercial",
    },
    {
      id: "3",
      image: villaImage,
      title: "Modern Luxury Villa",
      location: "Yamuna Expressway",
      price: "₹2.5 Cr",
      bedrooms: 4,
      bathrooms: 5,
      area: "3500 sq.ft",
      type: "Villa",
    },
    {
      id: "4",
      image: studioImage,
      title: "Contemporary Studio Apartment",
      location: "Sector 62, Noida",
      price: "₹45 Lakhs",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq.ft",
      type: "Studio",
    },
  ];

  const benefits = [
    { icon: Award, title: "Premium Quality", desc: "Handpicked properties meeting highest standards" },
    { icon: Users, title: "Expert Team", desc: "Professional consultants guiding you throughout" },
    { icon: Building2, title: "Wide Portfolio", desc: "500+ properties across prime locations" },
    { icon: TrendingUp, title: "Best Deals", desc: "Competitive pricing and transparent transactions" },
  ];

  return (
    <div className="min-h-screen flex flex-col ">
      <Navigation />
      <SocialSidebar/>
      <main className="flex-1">
        <HeroSection />

        {/* About Section */}
       <AboutSection
       benefits={benefits}
       sectionRefs={sectionRefs}
       visibleSections={visibleSections}
       />

        {/* Featured Properties */}
     <PropertiesSection
     featuredProperties={featuredProperties}
     sectionRefs={sectionRefs}
     visibleSections={visibleSections}
     />
   <ConsultationSection/>
   <CustomerReviewsSection/>
        {/* Why Choose Us */}
  <WhyChooseSection
  sectionRefs={sectionRefs}
  visibleSections={visibleSections}
  />
        {/* CTA Section */}
       <CTASection
         sectionRefs={sectionRefs}
         visibleSections={visibleSections}
         />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
