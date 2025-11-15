import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bgvideo from "@/assets/bgvideo.mp4";

interface CTASectionProps {
  visibleSections: Set<string>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const CTASection: React.FC<CTASectionProps> = ({
  visibleSections,
  sectionRefs,
}) => {
  return (
    <section
      id="cta"
      ref={(el) => (sectionRefs.current.cta = el)}
      className={`transition-all duration-700 ${
        visibleSections.has("cta")
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 translate-y-4"
      }`}
    >
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-xl">
        {/* Background Video */}
        <video
          src={bgvideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Ready to Find Your Dream Property?
          </h2>

          <p className="text-lg md:text-xl text-white mb-10 leading-relaxed">
            Our expert team is here to guide you every step of the way. Begin
            your journey with confidence today.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/properties">
              <Button
                variant="gold"
                size="lg"
                className="group relative px-8 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="px-8 border-2 hover:border-gold hover:text-gold transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
