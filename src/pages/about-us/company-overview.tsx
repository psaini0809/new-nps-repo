import React from "react";
import { motion } from "framer-motion";
import logo from "@/assets/NPS.png";
import bg1 from "@/assets/pic4.jpg";
import bg2 from "@/assets/pic1.jpg";
import GoldenParticles from "@/components/golden-particles";
import belowBg from "@/assets/belowwbg.png";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CompanyOverview: React.FC = () => {
  return (
    <section
      className="relative py-20 text-white overflow-hidden"
     
    >
      <GoldenParticles />

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Side - All Text */}
          <motion.div variants={fadeLeft} className="space-y-6 text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white">
              Your Trusted Real Estate Partner{" "}
              <span className="text-gold">for Life</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              By Profession, Mr. T Chandra is a Mechanical Engineer with
              extensive experience working in leading multinational companies
              across Japan, the US, and Europe. His global exposure allows him
              to connect deeply with professionals and individuals seeking
              real estate solutions that align with their lifestyle, budget,
              and investment goals.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              At{" "}
              <span className="text-gold font-semibold">
                Noida Property Solution
              </span>
              , our mission is simple: to help people find their dream homes
              through honest, transparent, and timely real estate services.
              We are driven by selfless service, ensuring that every client
              feels valued and confident throughout their property journey.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Whether you are a first-time homebuyer, an investor, or looking
              for the perfect residential or commercial space, we leverage our
              expertise and local market knowledge — especially in Noida,
              Greater Noida, and Yamuna Expressway — to deliver solutions that
              exceed expectations.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              With{" "}
              <span className="text-gold font-semibold">NPS Estates</span>, you
              don’t just get a property — you gain a trusted partner dedicated
              to turning your real estate dreams into reality.
            </p>
          </motion.div>

          {/* Right Side - Logo and Images */}
          <motion.div
            variants={fadeRight}
            className="flex flex-col items-center justify-start gap-8"
          >
            {/* Centered Logo */}
            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={logo}
                alt="NPS Estates Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Two Images Below the Logo */}
            <div className="flex justify-center gap-6 w-full">
              <img
                src={bg1}
                alt="Real Estate view 1"
                className="w-1/2 rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <img
                src={bg2}
                alt="Real Estate view 2"
                className="w-1/2 rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    <div className="w-full flex mt-2 justify-end overflow-hidden leading-none">
  <img
    src={belowBg}
    alt="Bottom Decoration"
    className="
      w-[220px] sm:w-[300px] md:w-[400px] lg:w-[500px]
      h-auto object-cover opacity-90 transition-all duration-500
    "
  />
</div>
    </section>
  );
};

export default CompanyOverview;
