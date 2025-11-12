import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import belowBg from "@/assets/belowwbg.png";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Import all map images
const mapImages = import.meta.glob("@/assets/maps2/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

const MapDetailPage2: React.FC = () => {
  const { mapId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prepare image entries
  const imageEntries = Object.entries(mapImages).map(([path, module]: any) => {
    const fileName = path.split("/").pop()?.split(".")[0] || "";
    return {
      name: fileName.replace(/[-_]/g, " "),
      slug: fileName.replace(/[\s_-]+/g, "").toLowerCase(),
      src: module.default,
    };
  });

  const selected = imageEntries.find((img) => img.slug === mapId);

  if (!selected) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gold mb-4">Map Not Found</h2>
        <Button
          onClick={() => navigate(-1)}
          className="bg-gold text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 transition-all"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* --- Header Section --- */}
      <section className="relative py-12 text-center">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="absolute left-6 top-6 text-gold hover:text-yellow-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold text-gold capitalize">
          {selected.name}
        </h1>
      </section>

      {/* --- Image Section --- */}
      <div className="flex justify-center px-6">
        <img
          src={selected.src}
          alt={selected.name}
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-4xl border border-gold/40 shadow-lg cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      {/* --- Description --- */}
      <p className="text-center text-gray-300 mt-6 px-4">
        Layout plan of{" "}
        <span className="text-gold capitalize">{selected.name}</span> by{" "}
        <span className="font-semibold text-gold">
          Noida Property Solution
        </span>{" "}
        | Greater Noida
      </p>

   
      <div className="flex justify-center mt-10 px-6">
        <iframe
          title={`${selected.name} location`}
          width="100%"
          height="400"
          className="max-w-4xl border-2 border-gold"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            selected.name + " Greater Noida UP"
          )}&output=embed`}
        ></iframe>
      </div>

         <div className="w-full flex mt-10 justify-end overflow-hidden leading-none">
  <img
    src={belowBg}
    alt="Bottom Decoration"
    className="w-[350px] md:w-[500px] h-auto object-cover opacity-90"
  />
</div>


      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gold hover:text-yellow-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ step: 0.1 }}
            >
              <TransformComponent>
                <img
                  src={selected.src}
                  alt={selected.name}
                  className="max-h-[90vh] w-auto border-2 border-gold shadow-lg cursor-grab active:cursor-grabbing select-none"
                />
              </TransformComponent>
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapDetailPage2;
