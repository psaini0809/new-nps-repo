import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  type: string;
}

const PropertyCard = ({
  id,
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  type,
}: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`
        group relative overflow-hidden rounded-3xl border 
        border-border bg-gradient-to-br from-[#1a1a1a] to-[#222222]
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1200px" }}
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-t-3xl transform-gpu transition-transform duration-700 ease-out"
        style={{
          transform: isHovered
            ? "rotateY(6deg) rotateX(3deg) scale(1.04)"
            : "rotateY(0deg) rotateX(0deg) scale(1)",
          transformOrigin: "center",
        }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-3xl transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? "scale(1.12)" : "scale(1)",
            filter: isHovered
              ? "brightness(1.1) contrast(1.15)"
              : "brightness(1) contrast(1)",
          }}
        />

        {/* Overlay Shine */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* Property Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gold/90 text-black px-4 py-1.5 text-xs font-bold rounded-full shadow-md backdrop-blur-md border border-gold/40">
            {type}
          </span>
        </div>

        {/* Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 rounded-b-3xl bg-gradient-to-br from-[#1f1f1f]/90 to-[#2a2a2a]/80 backdrop-blur-sm">
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold leading-tight text-white group-hover:text-gold transition-colors duration-500">
            {title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-gold/70 transition-colors duration-300">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        {/* Features */}
        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center justify-between text-sm border-y border-border/50 py-3 gap-2">
            {bedrooms && (
              <div className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105">
                <div className="p-1.5 rounded-md bg-gold/10">
                  <Bed className="h-4 w-4 text-gold" />
                </div>
                <span className="font-medium">{bedrooms}</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105">
                <div className="p-1.5 rounded-md bg-gold/10">
                  <Bath className="h-4 w-4 text-gold" />
                </div>
                <span className="font-medium">{bathrooms}</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105">
                <div className="p-1.5 rounded-md bg-gold/10">
                  <Square className="h-4 w-4 text-gold" />
                </div>
                <span className="font-medium text-xs">{area}</span>
              </div>
            )}
          </div>
        )}

        {/* Price and Button — FIXED for mobile overlap */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pt-3 gap-3 sm:gap-0">
          <div className="text-center sm:text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Starting from
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-gold to-amber-500 bg-clip-text text-transparent">
              {price}
            </p>
          </div>

          <Link to={`/property/${id}`} className="flex justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-gold/40 text-gold hover:bg-gold hover:text-black hover:border-gold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] font-semibold shadow-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] w-full sm:w-auto"
            >
              View Details
              <span className="ml-1 inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle Shimmer */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </Card>
  );
};

export default PropertyCard;
