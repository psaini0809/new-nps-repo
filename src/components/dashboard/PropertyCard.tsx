import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MapPin, Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  size: number;
  bedrooms?: number;
  bathrooms?: number;
  image: string;
  status: "active" | "draft" | "pending";
  addedBy: string;
  onView?: () => void;
  onEdit?: () => void;
}

export function PropertyCard({
  name,
  location,
  price,
  size,
  bedrooms,
  bathrooms,
  image,
  status,
  addedBy,
  onView,
  onEdit,
}: PropertyCardProps) {
  const statusColors = {
    active: "bg-primary text-primary-foreground",
    draft: "bg-muted text-muted-foreground",
    pending: "bg-secondary text-secondary-foreground",
  };

  return (
    <Card className="overflow-hidden group hover:gold-glow transition-smooth">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-semibold text-lg line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-muted-foreground" />
            <span>{size} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2 border-t">
          <div>
            <p className="text-2xl font-display font-bold text-primary">
              ₹{(price / 10000000).toFixed(2)}Cr
            </p>
            <p className="text-xs text-muted-foreground">Added by {addedBy}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
