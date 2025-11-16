import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import commercialImage from "@/assets/commercial-property.jpg";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/bgp1.jpg";
import belowBg from "@/assets/belowwbg.png";
import bgvideo from "@/assets/bgvideo.mp4";
const ProjectsGreaterNoida = () => {
  const greaterNoidaProperties = [
    {
      id: "gn-1",
      image: commercialImage,
      title: "Premium Commercial Space",
      location: "Knowledge Park, Greater Noida",
      price: "₹1.2 Cr",
      area: "2500 sq.ft",
      type: "Commercial",
    },
    {
      id: "gn-2",
      image: commercialImage,
      title: "Commercial Office Space",
      location: "Tech Zone, Greater Noida",
      price: "₹95 Lakhs",
      area: "1800 sq.ft",
      type: "Commercial",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SocialSidebar />
      <main className="flex-1">
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

        {/* Header */}
        <section
          className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          {/* 🔥 DARK OVERLAY TO REDUCE BG IMAGE OPACITY */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Adjust: bg-black/30 (lighter) | bg-black/60 (darker) */}

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Our Properties in{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Greater Noida
              </span>
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Discover premium residential and commercial spaces in Greater
              Noida
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12 ">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white text-muted-foreground leading-relaxed text-center">
                Greater Noida is emerging as a major educational and industrial
                hub with excellent infrastructure. Our properties in Greater
                Noida offer strategic locations, modern amenities, and strong
                growth potential for both residential and commercial
                investments.
              </p>
            </div>
          </div>
        </section>

        {/* Properties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {greaterNoidaProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
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

export default ProjectsGreaterNoida;
