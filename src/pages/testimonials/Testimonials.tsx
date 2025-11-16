import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StatsSection from "../about-us/stats";
import { InstagramEmbed } from "react-social-media-embed";
import bg1 from "@/assets/testi.jpg";
import belowBg from "@/assets/belowwbg.png";
import SocialSidebar from "@/components/socialSidebar";
import bgvideo from "@/assets/bgvideo.mp4";
const Testimonials: React.FC = () => {
  // Dummy Instagram Reels URLs (replace with your real reels)
  const reels = [
    "https://www.instagram.com/reel/DCT9q8nuV3T/",
    "https://www.instagram.com/reel/DCT9q8nuV3T/",
    "https://www.instagram.com/reel/DCT9q8nuV3T/",
    "https://www.instagram.com/reel/DCT9q8nuV3T/",
    "https://www.instagram.com/reel/DCT9q8nuV3T/",
    "https://www.instagram.com/reel/DCT9q8nuV3T/",
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        minHeight: "120vh",
      }}
    >
      <div className="fixed inset-0 -z-20 h-screen w-screen overflow-hidden">
        <video
          src={bgvideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        />
      </div>

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
              Client{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Testimonials
              </span>
            </h1>
            <p className="text-lg text-white max-w-3xl">
              Hear what our satisfied clients have to say about us
            </p>
          </div>
        </section>

        {/* Instagram Reels Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto mb-12 text-center">
              <p className="text-lg text-white text-muted-foreground">
                Experience real stories directly from our Instagram — where
                clients share their journeys and experiences with NPS Estates.
              </p>
            </div>

            {/* Reels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {reels.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border bg-card  w-full max-w-[328px]"
                >
                  <InstagramEmbed url={url} width={328} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <StatsSection />

        <div className="w-full flex mt-10 justify-end overflow-hidden leading-none">
          <img
            src={belowBg}
            alt="Bottom Decoration"
            className="w-full h-auto object-cover opacity-90"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
