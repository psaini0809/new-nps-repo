import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import commercialImage from "@/assets/commercial-property.jpg";
import villaImage from "@/assets/luxury-villa.jpg";
import heroImage from "@/assets/hero-luxury-apartments.jpg";
import { useEffect, useState } from "react";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/coverimg.jpg";
import belowBg from "@/assets/belowwbg.png";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      image: heroImage,
      title: "Green Valley Residences",
      location: "Sector 137, Noida",
      description: "Premium gated community with 200+ luxury apartments",
      status: "Completed",
    },
    {
      id: 2,
      image: commercialImage,
      title: "Tech Plaza",
      location: "Knowledge Park, Greater Noida",
      description: "State-of-the-art commercial complex",
      status: "Completed",
    },
    {
      id: 3,
      image: villaImage,
      title: "Royal Villas",
      location: "Yamuna Expressway",
      description: "Exclusive collection of luxury villas",
      status: "Ongoing",
    },
    {
      id: 4,
      image: heroImage,
      title: "Skyline Towers",
      location: "Sector 150, Noida",
      description: "High-rise residential towers with modern amenities",
      status: "Completed",
    },
    {
      id: 5,
      image: commercialImage,
      title: "Business Hub",
      location: "Sector 62, Noida",
      description: "Premium office spaces for corporates",
      status: "Completed",
    },
    {
      id: 6,
      image: villaImage,
      title: "Garden Estates",
      location: "Greater Noida West",
      description: "Luxury independent houses with private gardens",
      status: "Ongoing",
    },
  ];

  // For animated counters
  const [counters, setCounters] = useState({
    completed: 0,
    ongoing: 0,
    units: 0,
    delivery: 0,
  });

  useEffect(() => {
    const target = { completed: 25, ongoing: 10, units: 5000, delivery: 100 };
    const interval = setInterval(() => {
      setCounters((prev) => {
        const newCounters = { ...prev };
        Object.keys(prev).forEach((key) => {
          if (
            prev[key as keyof typeof prev] < target[key as keyof typeof target]
          ) {
            newCounters[key as keyof typeof prev] += Math.ceil(
              target[key as keyof typeof target] / 50
            );
            if (
              newCounters[key as keyof typeof prev] >
              target[key as keyof typeof target]
            ) {
              newCounters[key as keyof typeof prev] =
                target[key as keyof typeof target];
            }
          }
        });
        return newCounters;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SocialSidebar />
      <main
        className="flex-1"
        style={{
          minHeight: "120vh",
          background:
            "radial-gradient(circle at center, rgba(50,50,50,1) 0%, rgba(5,5,5,1) 100%)",
        }}
      >
        {/* Header */}
        <section
          className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Our{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Portfolio
              </span>
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Showcasing our successful projects across the region
            </p>
          </div>
        </section>
        {/* Introduction */}`
        <section className="py-12 ">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-white text-muted-foreground leading-relaxed">
                Over the years, NPS Estates has been instrumental in developing
                and selling properties that have become landmarks in their
                respective locations. Our portfolio reflects our commitment to
                quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>
        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden relative group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full shadow-lg
                      text-white 
                      bg-opacity-90
                      transition-all duration-300
                      group-hover:scale-110
                      "
                      style={{
                        backgroundColor:
                          project.status === "Completed"
                            ? "#FFD700"
                            : "#6B7280",
                      }}
                    >
                      {project.status}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-serif text-lg font-bold">
                          {project.title}
                        </h3>
                        <p className="text-sm flex items-center">
                          <span className="text-gold mr-1">📍</span>
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-semibold group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-4xl font-bold text-gold mb-2">
                  {counters.completed}+
                </p>
                <p className="text-sm text-muted-foreground">
                  Completed Projects
                </p>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-4xl font-bold text-gold mb-2">
                  {counters.ongoing}+
                </p>
                <p className="text-sm text-muted-foreground">
                  Ongoing Projects
                </p>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-4xl font-bold text-gold mb-2">
                  {counters.units}+
                </p>
                <p className="text-sm text-muted-foreground">Units Delivered</p>
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <p className="text-4xl font-bold text-gold mb-2">
                  {counters.delivery}%
                </p>
                <p className="text-sm text-muted-foreground">
                  On-Time Delivery
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full flex mt-10 justify-end overflow-hidden leading-none">
          <img
            src={belowBg}
            alt="Bottom Decoration"
            className="w-[350px] md:w-[500px] h-auto object-cover opacity-90"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
