import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Eye, Target, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import OurCoreValues from "./about-us/values";
import SocialSidebar from "@/components/socialSidebar";

const Vision = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
     <SocialSidebar/>
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/90 via-muted/50 to-primary/80 text-primary-foreground py-12 shadow-lg">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              className="font-serif text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Vision & <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">Mission</span>
            </motion.h1>
            <motion.p
              className="text-lg text-white  max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Guiding principles that drive our excellence
            </motion.p>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-gradient-to-b from-background/0 to-muted/10">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/10 shadow-lg hover:scale-105 transition-transform duration-300">
                  <Eye className="h-12 w-12 text-gold" />
                </div>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Our <span className="text-gold">Vision</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted and preferred real estate company in the NCR region, setting
                benchmarks in quality, transparency, and customer satisfaction. We envision a future
                where every individual and business finds their ideal property through NPS,
                experiencing unparalleled service and value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/10 shadow-lg hover:scale-105 transition-transform duration-300">
                  <Target className="h-12 w-12 text-gold" />
                </div>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Our <span className="text-gold">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our mission is to deliver exceptional real estate solutions by:
              </p>
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                {[
                 "To build trust through consistent, selfless, and client-focused service in every transaction.",
                 "To connect clients with the right homes quickly, efficiently, and transparently.",
                 "To offer personalized real estate solutions that deliver value within clients’ budgets and timelines",
                 "To ensure every client experiences a seamless and honest home buying, selling, or renting process."
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-gold mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
       {/* Core Values */}
<section className="py-20">
  <div className="container mx-auto px-6">
    <OurCoreValues/>
  </div>
</section>

      </main>

      <Footer />
    </div>
  );
};

export default Vision;
