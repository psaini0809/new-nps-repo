import React from "react";
import belowBg from "@/assets/belowwbg.png";
const founders = [
  {
    name: "Mr T  Chandra",
    role: "Founder & Managing Director",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/048/818/198/small/confident-young-man-smiling-amongst-autumn-leaves-in-a-sunlit-park-photo.jpeg", // dummy image
    quote:
      "Our vision is to redefine the real estate experience — making every client interaction transparent, rewarding, and memorable.",
  },
  {
    name: "Aishwarya Diwan",
    role: "Co-Founder & Operations Head",
    image:
      "https://i.pinimg.com/236x/5c/eb/88/5ceb88e1706171e66fee4604c8178bcb.jpg", // dummy image
    quote:
      "We believe in building trust through consistency, innovation, and a deep understanding of our clients’ aspirations.",
  },
];

const WordsFromFounders: React.FC = () => {
  return (
    <section className="py-24  relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl font-bold mb-16">
          Words from our <span className="text-gold">Founders</span>
        </h2>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">
          {/* Vertical gradient divider for large screens */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent rounded-full" />

          {founders.map((founder, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-6 max-w-md z-10"
            >
              {/* Circular Image with hover glow */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gold shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Gold Glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gold/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
              </div>

              {/* Founder Info */}
              <h3 className="text-2xl font-semibold">{founder.name}</h3>
              <p className="text-base text-white text-muted-foreground font-medium">
                {founder.role}
              </p>
              <p className="text-muted-foreground text-white leading-relaxed text-base max-w-sm italic">
                “{founder.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex mt-2 justify-end overflow-hidden leading-none">
        <img
          src={belowBg}
          alt="Bottom Decoration"
          className="
      w-full
      h-auto object-cover opacity-90 transition-all duration-500
    "
        />
      </div>
    </section>
  );
};

export default WordsFromFounders;
