import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import villaImage from "@/assets/luxury-villa.jpg";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/bgp1.jpg";
import belowBg from "@/assets/belowwbg.png";
import bgvideo from "@/assets/bgvideo.mp4";
const ProjectsYamuna = () => {
  const yamunaProperties = [
    {
      id: "yamuna-1",
      image: villaImage,
      title: "Modern Luxury Villa",
      location: "Yamuna Expressway",
      price: "₹2.5 Cr",
      bedrooms: 4,
      bathrooms: 5,
      area: "3500 sq.ft",
      type: "Villa",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SocialSidebar />
      <main className="flex-1">
<<<<<<< HEAD
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
 
 <section
  className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${bg1})` }}
>
  {/* 🔥 DARK OVERLAY TO REDUCE BACKGROUND OPACITY */}
  <div className="absolute inset-0 bg-black/50"></div>
  {/* adjust: bg-black/30, bg-black/60, bg-black/70 based on preference */}

  <div className="relative container mx-auto px-4 text-center">
    <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
      Our Properties in{" "}
      <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
        Yamuna Expressway
      </span>
    </h1>

    <p className="text-lg text-white max-w-2xl mx-auto">
      Luxury estates and premium properties along Yamuna Expressway
    </p>
  </div>
</section>

        {/* Overview */}
    
=======
        <section
          className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Our Properties in{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Yamuna Expressway
              </span>
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Luxury estates and premium properties along Yamuna Expressway
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white text-muted-foreground leading-relaxed text-center">
                Yamuna Expressway corridor is the new frontier of luxury real
                estate development. With world-class connectivity, upcoming
                infrastructure projects, and strategic location, our properties
                along Yamuna Expressway offer unmatched investment opportunities
                and lifestyle benefits.
              </p>
            </div>
          </div>
        </section>

>>>>>>> ea538497ceb2c4d776ae229a7ec29a1efb60d81e
        {/* Properties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yamunaProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
<<<<<<< HEAD
                     <div className="w-full flex mt-10 justify-end overflow-hidden leading-none">
  <img
    src={belowBg}
    alt="Bottom Decoration"
    className="w-full h-auto object-cover opacity-90"
  />
</div>
=======
        <div className="w-full flex mt-10 justify-end overflow-hidden leading-none">
          <img
            src={belowBg}
            alt="Bottom Decoration"
            className="w-[350px] md:w-[500px] h-auto object-cover opacity-90"
          />
        </div>
>>>>>>> ea538497ceb2c4d776ae229a7ec29a1efb60d81e
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsYamuna;
