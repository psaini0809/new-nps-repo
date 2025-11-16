import React from "react";
import icon1 from "@/assets/icon1.png";
import icon2 from "@/assets/icon2.png";
import icon3 from "@/assets/icon3.png";
import icon4 from "@/assets/icon4.png";
import GoldenParticles from "@/components/golden-particles";
import belowBg from "@/assets/belowwbg.png";
const OurCoreValues: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden text-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            Our Core <span className="text-gold">Values</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            The principles that guide every action we take and every promise we
            make.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Commitment */}
          <div className="text-center space-y-5 group transition-all duration-500 hover:scale-105">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 group-hover:bg-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300">
              <img src={icon1} alt="Commitment" className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl group-hover:text-gold transition-colors duration-300">
              Commitment
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Commitment is more than a promise—doing our best to meet and
              exceed customer expectations consistently every time.
            </p>
          </div>

          {/* Integrity */}
          <div className="text-center space-y-5 group transition-all duration-500 hover:scale-105">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 group-hover:bg-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300">
              <img src={icon2} alt="Integrity" className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl group-hover:text-gold transition-colors duration-300">
              Integrity
            </h3>
            <p className="text-white text-sm leading-relaxed">
              It reflects in our honest relationships, fair decisions, and our
              unwavering commitment to ethical and lawful conduct.
            </p>
          </div>

          {/* Customer First */}
          <div className="text-center space-y-5 group transition-all duration-500 hover:scale-105">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 group-hover:bg-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300">
              <img src={icon3} alt="Customer First" className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl group-hover:text-gold transition-colors duration-300">
              Customer First
            </h3>
            <p className="text-white text-sm leading-relaxed">
              We prioritize our clients’ goals, provide transparent guidance,
              and ensure every experience is seamless, rewarding, and memorable.
            </p>
          </div>

          {/* Always Giving */}
          <div className="text-center space-y-5 group transition-all duration-500 hover:scale-105">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 group-hover:bg-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300">
              <img src={icon4} alt="Always Giving" className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl group-hover:text-gold transition-colors duration-300">
              Always Giving
            </h3>
            <p className="text-white text-sm leading-relaxed">
              We strongly believe that "No one has ever become poor by giving."
              We go the extra mile to ensure your journey is smooth, informed,
              and rewarding.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-2 justify-end overflow-hidden leading-none">
        <img
          src={belowBg}
          alt="Bottom Decoration"
          className="
      w-full
      h-auto object-cover opacity-90 transition-all duration-500
    "
        />
      </div>
    </section>
  );
};

export default OurCoreValues;
