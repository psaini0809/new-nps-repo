import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import belowBg from "@/assets/belowwbg.png";
import bgvideo from "@/assets/bgvideo.mp4";
import GoldenParticles from "@/components/golden-particles";

interface Benefit {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

interface AboutSectionProps {
  benefits: Benefit[];
  visibleSections: Set<string>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  benefits,
  visibleSections,
  sectionRefs,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll every 2s (pause on hover)
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 2000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, currentIndex]);

  return (
    <section
      id="about"
      ref={(el) => (sectionRefs.current.about = el)}
      className="relative overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 min-h-[110vh]"
    >
      {/* 🔥 Background Video */}
      <video
        src={bgvideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* ✨ Background Pattern */}
      <GoldenParticles />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.25) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 🏡 Heading */}
      <div
        className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 mt-16 sm:mt-24 transition-all duration-1000 ${
          visibleSections.has("about")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
          Welcome to
          <br />
          <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            Noida Property Solution
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed px-2">
          Leading real estate company specializing in premium property sales and
          purchases across Noida, Greater Noida, and Yamuna Expressway. We
          deliver excellence in every transaction.
        </p>
      </div>

      {/* 🎠 Carousel */}
      <div
        className="relative w-full flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-10 z-20 bg-black/40 text-gold p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
        >
          <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
        </button>

        <div className="flex justify-center items-center w-full perspective-[1600px] h-[360px] sm:h-[420px] md:h-[480px] gap-6 sm:gap-10 relative overflow-hidden">
          <AnimatePresence>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const total = benefits.length;
              const offset = (index - currentIndex + total) % total;

              const baseX = 220; // smaller spacing for mobile
              let x = 0,
                z = 0,
                scale = 1,
                opacity = 0.3;

              if (offset === 0) {
                x = 0;
                z = 200;
                scale = 1.05;
                opacity = 1;
              } else if (offset === 1) {
                x = baseX;
                z = 100;
                scale = 0.9;
                opacity = 0.7;
              } else if (offset === total - 1) {
                x = -baseX;
                z = 100;
                scale = 0.9;
                opacity = 0.7;
              } else if (offset === 2) {
                x = baseX * 1.8;
                z = -100;
                scale = 0.75;
              } else if (offset === total - 2) {
                x = -baseX * 1.8;
                z = -100;
                scale = 0.75;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute w-[230px] sm:w-[280px] md:w-[340px] h-[340px] sm:h-[400px] md:h-[420px] flex flex-col items-center justify-center transform-gpu"
                  animate={{
                    x,
                    z,
                    scale,
                    opacity,
                    rotateY: offset === 1 ? -15 : offset === total - 1 ? 15 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-gray-800/90 to-gray-900/70 border border-gray-700 text-center h-full w-full flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:scale-[1.03] transition-transform duration-500">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-gold/40 to-gold/10 mb-5 sm:mb-6 shadow-inner">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gold drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]" />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed px-2 sm:px-4">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-10 z-20 bg-black/40 text-gold p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
        >
          <ChevronRight size={24} className="sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
