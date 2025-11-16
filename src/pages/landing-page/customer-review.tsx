import React from "react";
import { CheckCircle, Star } from "lucide-react";

interface Review {
  name: string;
  text: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    name: "Rahul Sharma",
    text: "Excellent experience! They guided me through every step of my property purchase with full transparency.",
    rating: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYMZ9uWkQZiC5nKxkfg7ggCA8rSsQxOcNItQ&s", // Indian looking male
  },
  {
    name: "Priya Mehta",
    text: "Professional and reliable team! Their market knowledge helped me find the perfect home in Noida.",
    rating: 5,
    image:
      "https://i.pinimg.com/736x/43/27/48/43274862e89b00565173a869cf6cfc48.jpg", // Indian looking female
  },
  {
    name: "Amit Verma",
    text: "Top-notch service and great communication. I highly recommend Noida Property Solution to everyone!",
    rating: 5,
    image:
      "https://ppf.org.in/assets/web/images/about/Photo_A_K_Das_DCPCR_PPF2.jpeg", // Indian looking male
  },
];

const CustomerReviewsSection: React.FC = () => {
  return (
<<<<<<< HEAD
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 md:px-16 overflow-hidden">
=======
    <section
      className="relative flex flex-col items-center justify-center text-center py-24 px-6 md:px-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)",
      }}
    >
      <video
        src={bgvideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
>>>>>>> ea538497ceb2c4d776ae229a7ec29a1efb60d81e
      {/* 🌟 Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.25) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 💬 Section header */}
      <div className="relative z-10 mb-12">
        <div className="flex flex-col items-center gap-3">
          <CheckCircle className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Customers Think We Are The{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Best
            </span>
          </h2>
        </div>
      </div>

      {/* 🏆 Review Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-900/80 to-black/80 border border-yellow-500/20 rounded-2xl p-8 text-left shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-500"
          >
            {/* ⭐ Rating */}
            <div className="flex items-center mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 w-5 h-5 fill-yellow-400 mr-1"
                />
              ))}
            </div>

            {/* 💬 Review text */}
            <p className="text-white text-lg leading-relaxed mb-6">
              “{review.text}”
            </p>

            {/* 👤 Reviewer info */}
            <div className="flex items-center gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
              <span className="font-semibold text-white text-lg">
                {review.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
