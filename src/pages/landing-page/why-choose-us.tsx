import React from "react";
import { CheckCircle2 } from "lucide-react";
import icon8 from "@/assets/icon8.png";
import icon9 from "@/assets/icon9.png";
import bgvideo from "@/assets/bgvideo.mp4";
import icon10 from "@/assets/icon10.png";
interface WhyChooseSectionProps {
  visibleSections: Set<string>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  visibleSections,
  sectionRefs,
}) => {
  const features = [
    {
      src: icon8,
      title: "Verified Properties",
      desc: "Every property is thoroughly verified to ensure authenticity and peace of mind.",
    },
    {
      src: icon9,
      title: "Expert Guidance",
      desc: "Our real estate professionals guide you seamlessly through every step of your journey.",
    },
    {
      src: icon10,
      title: "Best Price Guaranteed",
      desc: "Get competitive pricing and transparent deals—no hidden costs, no surprises.",
    },
  ];

  return (
    <section
      id="why-choose"
      ref={(el) => (sectionRefs.current["why-choose"] = el)}
      className="relative py-24 text-white overflow-hidden"
    >
         <video
          src={bgvideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      {/* Floating Gold Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-24 left-12 w-72 h-72 bg-gold/60 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-12 right-12 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            visibleSections.has("why-choose")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 text-white">
            Why Choose{" "}
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300 animate-shimmer bg-[length:200%_100%]">
              NPS?
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Experience unmatched trust, transparency, and expert service.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className={`relative group p-8 rounded-2xl border border-gold/20
                bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-950/80
                backdrop-blur-md shadow-[0_0_25px_rgba(255,215,0,0.05)]
                hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:border-gold/40
                transition-all duration-500 hover:-translate-y-3
                ${
                  visibleSections.has("why-choose")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Glow border overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-gold/10 via-transparent to-gold/10 blur-sm transition-opacity duration-700" />

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-gold/20 to-yellow-500/10 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <img src={item.src}/>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-xl mb-3 text-gold tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>

              {/* Bottom Accent Line */}
              <div className="mt-8 mx-auto h-[2px] w-0 group-hover:w-28 bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
