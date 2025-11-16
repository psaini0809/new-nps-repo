import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import heroImage from "@/assets/hero-luxury-apartments.jpg";
import studioImage from "@/assets/studio-apartment.jpg";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/bgp1.jpg";
import belowBg from "@/assets/belowwbg.png";
import bgvideo from "@/assets/bgvideo.mp4";
const ProjectsNoida = () => {
  const noidaProperties = [
    {
      id: "noida-1",
      image: heroImage,
      title: "Luxury Residential Apartments",
      location: "Sector 137, Noida",
      price: "₹85 Lakhs",
      bedrooms: 3,
      bathrooms: 3,
      area: "1850 sq.ft",
      type: "Residential",
    },
    {
      id: "noida-2",
      image: studioImage,
      title: "Contemporary Studio Apartment",
      location: "Sector 62, Noida",
      price: "₹45 Lakhs",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq.ft",
      type: "Studio",
    },
    {
      id: "noida-3",
      image: heroImage,
      title: "Spacious 4BHK Apartment",
      location: "Sector 150, Noida",
      price: "₹1.1 Cr",
      bedrooms: 4,
      bathrooms: 4,
      area: "2400 sq.ft",
      type: "Residential",
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
          {/* 🔥 DARK OVERLAY TO LOWER BACKGROUND OPACITY */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Change 50 to 30/60/70 for lighter/darker effect */}

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Our Properties in{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Noida
              </span>
            </h1>

            <p className="text-lg text-white max-w-2xl mx-auto">
              Discover premium residential and commercial spaces in Noida
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12 ">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white text-muted-foreground leading-relaxed text-center">
                Noida is a thriving hub of modern infrastructure and
                development. Our carefully selected properties in Noida offer
                excellent connectivity, world-class amenities, and great
                investment potential. Explore our collection of premium
                properties in various sectors of Noida.
              </p>
            </div>
          </div>
        </section>

        {/* Properties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noidaProperties.map((property) => (
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

export default ProjectsNoida;
