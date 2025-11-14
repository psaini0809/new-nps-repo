import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import bgvideo from "@/assets/bgvideo.mp4";
const ConsultationSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 px-6 sm:px-10 md:px-16 py-10 md:py-14 
                 bg-black text-white transition-all duration-500"
      style={{ minHeight: "30vh" }}
    >
         <video
          src={bgvideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      
      {/* 🟡 Left: Golden Heading */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 
                       tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.4)] leading-tight">
          BUYING?
        </h2>
      </div>

      {/* 🗨️ Center: Message */}
      <div className="flex-1 text-center">
        <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium leading-snug max-w-md mx-auto">
          Get <span className="text-gold font-semibold">free consultation</span> from
          our agent today!
        </p>
      </div>

      {/* 📞 Right: Phone + Button */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-5 text-center md:text-right">
        <span className="text-base sm:text-lg md:text-xl font-medium text-yellow-400 whitespace-nowrap flex items-center gap-2">
          📞 <span>+91 93119 31770</span>
        </span>
        <Button
          className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold 
                     px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:from-yellow-400 hover:to-yellow-200 
                     shadow-[0_0_10px_rgba(255,215,0,0.6)] text-sm sm:text-base transition-all"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default ConsultationSection;
