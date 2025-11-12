import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/map2.jpg";
import belowBg from "@/assets/belowwbg.png";
import MapsGallery from "./MapGallery";



const GreaterNoidaMaps: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col"
     style={{
        minHeight: "120vh",
        background:
          "radial-gradient(circle at center, rgba(50,50,50,1) 0%, rgba(5,5,5,1) 100%)",
      }}
    >
      <Navigation />
      <SocialSidebar />
      <main className="flex-1">
        {/* Header */}
        <section
          className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative z-10 mx-auto px-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4">
              Maps of{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Greater Noida
              </span>
            </h1>
            <p className="text-lg text-white max-w-3xl">
              Explore all the maps of the city.
            </p>
          </div>
        </section>

        {/* 🗺️ Maps Gallery Section */}
        <MapsGallery />

        {/* Footer Decorative Image */}
      </main>

      <Footer />
    </div>
  );
};

export default GreaterNoidaMaps;
