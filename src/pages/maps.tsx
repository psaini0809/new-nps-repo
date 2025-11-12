import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/map2.jpg";
import { Button } from "@/components/ui/button";
import HighlightSection from "@/components/highlight-section";
import sampleImg from "@/assets/maps/GREATER NOIDA.jpg";
import sampleImg2 from "@/assets/maps2/ACE ACREVILLE.jpg";
import auth1 from "@/assets/auth1.jpg";
import auth2 from "@/assets/auth2.jpg";
import auth3 from "@/assets/auth4.jpg";
import { useNavigate } from "react-router-dom";

const Maps = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SocialSidebar />

      <main
        className="flex-1"
        style={{
          minHeight: "80vh",
          background:
            "radial-gradient(circle at center, rgba(50,50,50,1) 0%, rgba(5,5,5,1) 100%)",
        }}
      >
        {/* --- Header Section --- */}
        <section
          className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative z-10 mx-auto px-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-serif text-white text-6xl md:text-5xl font-bold mb-4">
              Maps by{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Noida Property Solution
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl">
              Navigate with Ease: Explore Our Maps!
            </p>
          </div>
        </section>

        {/* --- New Authorities Section --- */}
        <section className="py-12 bg-transparent text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Working with Top Development Authorities
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-10">
            {[auth1, auth2, auth3].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Authority ${index + 1}`}
                className="w-52 h-auto object-contain"
              />
            ))}
          </div>
        </section>

        {/* --- Buttons Section --- */}
        <section className="py-10 bg-transparent">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-6">
            <Button className="bg-gold text-black font-semibold px-8 py-4 shadow-md hover:bg-yellow-400 transition-all duration-300 rounded-none">
              Explore Noida Maps
            </Button>

            <Button className="bg-gold text-black font-semibold px-8 py-4 shadow-md hover:bg-yellow-400 transition-all duration-300 rounded-none">
              Explore Greater Noida Maps
            </Button>

            <Button className="bg-gold text-black font-semibold px-8 py-4 shadow-md hover:bg-yellow-400 transition-all duration-300 rounded-none">
              Explore Yamuna Expressway Maps
            </Button>
          </div>
        </section>

        {/* --- Highlight Section --- */}
        <HighlightSection
          title="Greater Noida Maps"
          description="Navigate the City’s Sectors and Zones"
          image={sampleImg}
          imageDesc="At Noida Property Solution, we provide a detailed map of Greater Noida to help you navigate this growing city. Our sector-wise layouts provide clear views of residential, commercial, and industrial zones, making it easier to find the best property. Whether you are looking for new developments or established communities, our map guides you through Greater Noida real estate. Find important locations and unlock the full potential of Greater Noida with Noida Property Solution."
          onExplore={() => navigate("/maps/greaternoida")}
        />
           <HighlightSection
          title="Yamuna Expressway Maps"
          description="Navigate the Area's Sectors and Zones"
          image={sampleImg2}
          imageDesc="We offers an in depth map of the Yamuna Expressway Industrial Development Authority (YEIDA) to help you navigate this speedy-developing business area. Our maps show neighborhood shape, highlighting business, residential, and industrial districts that will help you find used homes. Whether you’re seeking out new tendencies or constructed-up areas, our map can speedy take you thru the YEIDA actual property scene. Increase your chances through securing luxurious places with Noida Property Solution."
          onExplore={() => navigate("/maps/yamunaexpressway")}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Maps;
