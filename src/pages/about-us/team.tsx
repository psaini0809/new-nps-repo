import React from "react";
import GoldenParticles from "@/components/golden-particles";

const teamMembers = [
  {
    name: "Mr. T. Chandra",
    role: "Founder & Managing Director",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Priya Mehta",
    role: "Co-Founder & Operations Head",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    name: "Sushil Kumar",
    role: "Senior Property Consultant",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Harsh Garg",
    role: "Marketing Lead",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Gaurav Marothiya",
    role: "Client Relations Manager",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Rahul Singh",
    role: "Legal Advisor",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section
      className="relative py-20 overflow-hidden text-white"
      
    >
      <GoldenParticles />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">
            Meet Our <span className="text-gold">Team</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our experienced professionals bring years of real estate expertise,
            dedication, and trust to help you find your dream property.
          </p>
          <div className="mx-auto mt-4 w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
        </div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll space-x-14 hover:[animation-play-state:paused]">
            {[...teamMembers, ...teamMembers].map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 flex-shrink-0 w-56 sm:w-64"
              >
                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-gold shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gold/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                </div>

                {/* Name + Role */}
                <h3 className="font-semibold text-xl text-white group-hover:text-gold transition-all">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
 