import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/coverimg.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import comingSoonImg from "@/assets/comingsoon.jpg"; // replace with any relevant image

const ComingSoon = () => {
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
              Under Construction Projects by{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Noida Property Solution
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl">
              Plan with Ease: Explore Our Under Construction Projects!
            </p>
          </div>
        </section>

        {/* --- Coming Soon Section --- */}
        <section className="py-24 bg-black/80 text-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-center md:text-left space-y-6">
              <h2 className="text-4xl font-bold text-yellow-400">Coming Soon!</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We’re currently working on something exciting! Soon, you’ll be
                able to explore our exclusive range of **under construction and
                upcoming real estate projects** across Noida, Greater Noida, and
                nearby regions — with detailed maps, layouts, and location-based
                insights.
              </p>
              <p className="text-gray-400">
                Stay tuned for updates and early access to property insights,
                investment plans, and project walkthroughs!
              </p>
              <div className="flex justify-center md:justify-start gap-4 pt-4">
                <Button
                  onClick={() => navigate("/contact")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
                >
                  Notify Me
                </Button>
                <Button
                  onClick={() => navigate("/properties")}
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  View Other Projects
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src={comingSoonImg}
                alt="Coming Soon Illustration"
                className="rounded-2xl shadow-xl w-[90%] md:w-[80%] object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
