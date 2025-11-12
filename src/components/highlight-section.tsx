import React from "react";
import { Button } from "@/components/ui/button";
import belowBg from "@/assets/belowwbg.png";

interface HighlightSectionProps {
  title: string;
  description: string;
  image: string;
  imageDesc: string;
  onExplore?: () => void;
}

const HighlightSection: React.FC<HighlightSectionProps> = ({
  title,
  description,
  image,
  imageDesc,
  onExplore,
}) => {
  return (
    <section className="relative w-full flex flex-col items-center text-center  overflow-hidden bg-transparent mt-10">
      {/* 🌟 Section Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4 font-serif tracking-wide">
        {title}
      </h2>

      {/* 💬 Subtitle */}
      <p className="text-white/80 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
        {description}
      </p>

      {/* 🖼️ Main Image */}
      <div className="w-[80vw] max-w-6xl border-4 border-gold overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)] mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>

      {/* 📝 Description Below Image */}
      <div className="w-[80vw] max-w-6xl text-white/90 text-lg leading-relaxed mb-10 px-4">
        <p>{imageDesc}</p>
      </div>

      {/* 🚀 Explore Button */}
      <Button
        onClick={onExplore}
        className="bg-gold text-black font-semibold px-10 py-4 rounded-none shadow-md hover:bg-yellow-400 transition-all duration-300"
      >
        Explore More
      </Button>

     
           <div className="w-full flex mt-10 justify-end overflow-hidden leading-none">
       <img
         src={belowBg}
         alt="Bottom Decoration"
         className="w-[350px] md:w-[500px] h-auto object-cover opacity-90"
       />
     </div>
    </section>
  );
};

export default HighlightSection;
