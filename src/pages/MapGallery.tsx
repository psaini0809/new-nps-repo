import React from "react";
import { useNavigate } from "react-router-dom";

const mapImages = import.meta.glob("@/assets/maps/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

const MapsGallery: React.FC = () => {
  const navigate = useNavigate();

  const imageEntries = Object.entries(mapImages).map(([path, module]: any) => {
    const fileName = path.split("/").pop()?.split(".")[0] || "";
    return {
      name: fileName.replace(/[-_]/g, " "),
      src: module.default,
      slug: fileName.replace(/[\s_-]+/g, "").toLowerCase(), // used in URL
    };
  });

  return (
    <section className="py-16 bg-black text-white"
     style={{
        minHeight: "120vh",
        background:
          "radial-gradient(circle at center, rgba(50,50,50,1) 0%, rgba(5,5,5,1) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gold">
          Greater Noida Map Gallery
        </h2>

        {/* ---- Grid of Images ---- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {imageEntries.map((img) => (
            <div
              key={img.name}
              onClick={() =>
                navigate(`/maps/greaternoida/${img.slug}`)
              }
              className="flex flex-col items-center bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-gold/30 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.name}
                className="w-full h-40 object-cover"
              />
              <div className="py-2 text-center text-sm font-medium text-gold capitalize">
                {img.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapsGallery;
