import { useState, useEffect } from "react";
import { Search, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import icon5 from "@/assets/icon5.png";
import icon6 from "@/assets/icon6.png";
import icon7 from "@/assets/icon7.png";
import logo from "@/assets/NPS.png";
import bg1 from "@/assets/bg/bg1.jpg";
import bg2 from "@/assets/bg/bg2.jpg";
import bg3 from "@/assets/bg/bg4.jpg";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();

  const bgImages = [bg1, bg2, bg3];

  // 🔁 Background auto-change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/properties");
    }
  };

  const stats = [
    { src: icon5, label: "Premium Properties", value: "100+" },
    { src: icon6, label: "Happy Clients", value: "500+" },
    { src: icon7, label: "Years Experience", value: "5+" },
  ];

  return (
    <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* 🌄 Animated Background */}
      <div className="absolute inset-0">
        {bgImages.map((bg, index) => (
          <motion.img
            key={index}
            src={bg}
            alt={`background-${index}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentBg === index ? 1 : 0,
              scale: [1, 1.1, 1],
            }}
            transition={{
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50" />

      {/* ✨ Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 🌟 Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl w-full flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3 sm:mb-4"
        >
          Find Your Dream Place
          <br />
          <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            In Noida Region
          </span>
        </motion.h1>

        {/* Logo + Phone (side-by-side always) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mt-2 sm:mt-4 mb-4 sm:mb-6 flex-wrap"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center text-white text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
              +91 93119 31770
            </div>
            <img
              src={logo}
              alt="Noida Property Solution Logo"
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain"
            />
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full max-w-lg mb-6 sm:mb-8"
        >
          <div className="flex items-center w-full px-4 py-2 sm:py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/60 font-medium outline-none border-none focus:ring-0 text-sm sm:text-base"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="flex items-center gap-1 sm:gap-2 bg-gold text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-yellow-400 transition-all shadow-lg text-sm sm:text-base"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            Search
          </Button>
        </motion.div>

        {/* Stats Section (Horizontal & small) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex justify-center items-center flex-wrap gap-5 sm:gap-10 mt-2 sm:mt-4"
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center group cursor-pointer w-24 sm:w-32"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold/10 border border-gold/20 mb-2 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300">
                <img src={item.src} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gold mb-0.5 group-hover:scale-110 transition-transform">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-white/80">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
