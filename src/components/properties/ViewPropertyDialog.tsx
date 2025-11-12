import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";

interface Property {
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
}

interface ViewPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
}

export function ViewPropertyDialog({ open, onOpenChange, property }: ViewPropertyDialogProps) {
  if (!property) return null;

  const statusColors = {
    active: "bg-primary text-primary-foreground",
    draft: "bg-muted text-muted-foreground",
    pending: "bg-secondary text-secondary-foreground",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{property.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src={property.image}
              alt={property.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge className={statusColors[property.status]}>{property.status}</Badge>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Location</h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{property.location}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Price</h3>
              <p className="text-2xl font-display font-bold text-primary">
                ₹{(property.price / 10000000).toFixed(2)}Cr
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Size</h3>
              <div className="flex items-center gap-2">
                <Maximize className="h-4 w-4 text-muted-foreground" />
                <span>{property.size} sqft</span>
              </div>
            </div>

            {property.bedrooms && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Bedrooms</h3>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bedrooms}</span>
                </div>
              </div>
            )}

            {property.bathrooms && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Bathrooms</h3>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bathrooms}</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Added By</h3>
              <span>{property.addedBy}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
