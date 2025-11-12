import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  visibleSections: Set<string>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const CTASection: React.FC<CTASectionProps> = ({ visibleSections, sectionRefs }) => {
  return (
    <section
      id="cta"
      ref={(el) => (sectionRefs.current.cta = el)}
      className="relative overflow-hidden py-24 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      {/* ✨ Animated Pattern Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07] animate-shimmer-slow"
          style={{
            backgroundImage: `linear-gradient(45deg, hsl(var(--gold)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--gold)) 25%, transparent 25%)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-gold/5 blur-2xl opacity-40 animate-pulse-slow" />
      </div>

      {/* 🌟 Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            visibleSections.has("cta")
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-gold-glow">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Our expert team is here to guide you every step of the way. Begin your journey with confidence today.
          </p>

          {/* 💎 Buttons */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-gold via-yellow-300 to-amber-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="px-8 border-2 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 🎨 Custom Animations */}
      <style jsx>{`
        @keyframes shimmer-slow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 10s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        @keyframes gold-glow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.3),
              0 0 20px rgba(255, 215, 0, 0.15);
          }
          50% {
            text-shadow: 0 0 25px rgba(255, 215, 0, 0.5),
              0 0 35px rgba(255, 215, 0, 0.3);
          }
        }
        .animate-gold-glow {
          animation: gold-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTASection;
