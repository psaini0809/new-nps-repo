import React from "react";
import GoldenParticles from "@/components/golden-particles";

const StatsSection: React.FC = () => {
  return (
    <section
      className="relative py-20 overflow-hidden text-white"
    
    >
      {/* ✨ Floating Golden Particles */}
      <GoldenParticles />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-gold">Achievements</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A legacy of excellence, trust, and satisfaction built over the years.
          </p>
          {/* Glowing underline */}
          <div className="mx-auto mt-4 w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {/* Years Experience */}
          <div className="group">
            <p className="text-5xl md:text-6xl font-bold text-gold mb-2 group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              15+
            </p>
            <p className="text-sm md:text-base text-gray-300 tracking-wide">
              Years Experience
            </p>
          </div>

          {/* Properties Listed */}
          <div className="group">
            <p className="text-5xl md:text-6xl font-bold text-gold mb-2 group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              100+
            </p>
            <p className="text-sm md:text-base text-gray-300 tracking-wide">
              Properties Listed
            </p>
          </div>

          {/* Happy Clients */}
          <div className="group">
            <p className="text-5xl md:text-6xl font-bold text-gold mb-2 group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              500+
            </p>
            <p className="text-sm md:text-base text-gray-300 tracking-wide">
              Happy Clients
            </p>
          </div>

          {/* Expert Team */}
          <div className="group">
            <p className="text-5xl md:text-6xl font-bold text-gold mb-2 group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              20+
            </p>
            <p className="text-sm md:text-base text-gray-300 tracking-wide">
              Expert Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
