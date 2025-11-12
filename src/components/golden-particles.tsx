import React from "react";

const GoldenParticles: React.FC = () => {
  const particles = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-400/30 blur-sm animate-float"
          style={{
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${5 + Math.random() * 6}s`,
            opacity: 0.7,
            boxShadow: `0 0 10px rgba(255, 215, 0, 0.5)`,
          }}
        />
      ))}
    </div>
  );
};

export default GoldenParticles;
