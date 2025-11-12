import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import belowBg from "@/assets/belowwbg.png";

export interface Property {
  id: string | number;
  title: string;
  location: string;
  price: string;
  image: string;
  [key: string]: any;
}

interface PropertiesSectionProps {
  featuredProperties: Property[];
  visibleSections: Set<string>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  featuredProperties,
  visibleSections,
  sectionRefs,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [visibleCards, setVisibleCards] = useState(
    window.innerWidth < 768 ? 1 : 3
  );

  const autoSlideInterval = 3000;

  // 🧩 Responsive logic — update card count on resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prev) =>
      prev + visibleCards >= featuredProperties.length ? 0 : prev + visibleCards
    );
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(featuredProperties.length - visibleCards, 0)
        : prev - visibleCards
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [featuredProperties.length, visibleCards]);

  const visibleProperties = featuredProperties.slice(
    currentIndex,
    currentIndex + visibleCards
  );

  const displayedProperties =
    visibleProperties.length < visibleCards
      ? [
          ...visibleProperties,
          ...featuredProperties.slice(
            0,
            visibleCards - visibleProperties.length
          ),
        ]
      : visibleProperties;

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <section
      id="properties"
      ref={(el) => (sectionRefs.current.properties = el)}
      className="relative py-10 overflow-hidden"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, rgba(50,50,50,1) 0%, rgba(5,5,5,1) 100%)",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.has("properties")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white inline-block">
            Featured{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-blue-700/40 rounded-full blur-md"></span>
              <span className="relative text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%] px-2 rounded-lg">
                Properties
              </span>
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mt-3">
            Explore our handpicked selection of premium properties across Noida
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center w-full">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-6 z-10 bg-black/60 text-gold p-3 rounded-full hover:bg-black/80 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Animated Cards */}
          <div className="w-full overflow-hidden px-4 sm:px-10">
            <div className="relative w-full flex justify-center items-center">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 120, damping: 20 },
                    opacity: { duration: 0.3 },
                  }}
                  className={`flex ${
                    visibleCards === 1
                      ? "justify-center w-full"
                      : "justify-center gap-6 w-full"
                  }`}
                >
                  {displayedProperties.map((property) => (
                    <div
                      key={property.id}
                      className={`transition-transform duration-700 ${
                        visibleCards === 1
                          ? "w-full max-w-[90%] mx-auto"
                          : "w-full md:w-1/3"
                      } ${
                        visibleSections.has("properties")
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      <PropertyCard {...property} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-6 z-10 bg-black/60 text-gold p-3 rounded-full hover:bg-black/80 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* CTA Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            visibleSections.has("properties")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Link to="/properties">
            <Button
              variant="gold"
              size="lg"
              className="group px-8 bg-gold text-black hover:bg-yellow-400"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Decoration */}
    {/* Section End Image */}

 <div className="w-full flex mt-2 justify-start overflow-hidden leading-none">
  <img
    src={belowBg}
    alt="Bottom Decoration"
    className="
      w-[220px] sm:w-[300px] md:w-[400px] lg:w-[500px]
      h-auto object-cover opacity-90 transition-all duration-500
    "
  />
</div>

    </section>
  );
};

export default PropertiesSection;
