import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Home, BedDouble, Bath, Youtube, Instagram } from "lucide-react";

interface ViewPropertyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: any;
}

export const ViewPropertyDialog: React.FC<ViewPropertyDialogProps> = ({
  open,
  onOpenChange,
  property,
}) => {
  if (!property) return null;

  const {
    subPropertyType,
    location,
    bhk,
    bedrooms,
    bathrooms,
    areaDetails,
    furnishingStatus,
    reservedParking,
    totalFloors,
    propertyOnFloor,
    availabilityStatus,
    ageOfProperty,
    pricing,
    description,
    amenities,
    propertyFacing,
    flooringType,
    facingRoadWidth,
    locationAdvantages,
    youtubeLink,
    instagramLink,
    createdBy,
    images,
  } = property;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold">
            {subPropertyType} – {bhk} BHK
          </DialogTitle>
          <DialogDescription>
            Listed by {createdBy?.email || "Unknown"} •{" "}
            {location?.city}, {location?.locality}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[75vh] px-6 pb-8">
          {/* 🖼 Images */}
          {images?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt="Property"
                  className="w-full h-40 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}

          {/* 🏠 Basic Details */}
          <Section title="Property Overview">
            <Detail label="Type" value={subPropertyType} />
            <Detail label="Furnishing Status" value={furnishingStatus} />
            <Detail label="Availability" value={availabilityStatus} />
            <Detail label="Age of Property" value={ageOfProperty ? `${ageOfProperty} years` : "—"} />
            <Detail label="Floor" value={`${propertyOnFloor || "-"} of ${totalFloors || "-"}`} />
          </Section>

          {/* 📍 Location */}
          <Section title="Location Details" icon={<MapPin className="h-4 w-4 text-primary" />}>
            <Detail label="City" value={location?.city} />
            <Detail label="Locality" value={location?.locality} />
            <Detail label="Sub Locality" value={location?.subLocality || "—"} />
            <Detail label="Society" value={location?.society || "—"} />
            <Detail label="House No." value={location?.houseNo || "—"} />
          </Section>

          {/* 🛋 Room Details */}
          <Section title="Room Details" icon={<Home className="h-4 w-4 text-primary" />}>
            <Detail label="BHK" value={bhk} />
            <Detail label="Bedrooms" value={bedrooms || "—"} />
            <Detail label="Bathrooms" value={bathrooms || "—"} />
            <Detail label="Carpet Area" value={`${areaDetails?.carpetArea || 0} sqft`} />
            <Detail label="Built-up Area" value={`${areaDetails?.builtUpArea || 0} sqft`} />
            <Detail label="Super Built-up Area" value={`${areaDetails?.superBuiltUpArea || 0} sqft`} />
          </Section>

          {/* 💰 Pricing */}
          <Section title="Pricing">
            <Detail label="Expected Price" value={`₹ ${pricing?.expectedPrice?.toLocaleString()}`} />
            <Detail label="Price per Sqft" value={pricing?.pricePerSqft ? `₹ ${pricing.pricePerSqft}` : "—"} />
          </Section>

          {/* 🌟 Amenities */}
          {amenities?.length > 0 && (
            <Section title="Amenities">
              <div className="flex flex-wrap gap-2">
                {amenities.map((a: string, i: number) => (
                  <Badge key={i} variant="outline">{a}</Badge>
                ))}
              </div>
            </Section>
          )}

          {/* 🚗 Parking */}
          <Section title="Parking">
            <Detail label="Covered" value={reservedParking?.covered ? "Yes" : "No"} />
            <Detail label="Open" value={reservedParking?.open ? "Yes" : "No"} />
          </Section>

          {/* 🧭 Facing & Flooring */}
          <Section title="Other Details">
            <Detail label="Property Facing" value={propertyFacing || "—"} />
            <Detail label="Flooring Type" value={flooringType || "—"} />
            <Detail label="Facing Road Width" value={facingRoadWidth ? `${facingRoadWidth} ft` : "—"} />
          </Section>

          {/* 📍 Location Advantages */}
          {locationAdvantages?.length > 0 && (
            <Section title="Location Advantages">
              <ul className="list-disc pl-6 text-sm text-muted-foreground">
                {locationAdvantages.map((adv: string, i: number) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* 📝 Description */}
          {description && (
            <Section title="Description">
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </Section>
          )}

          {/* 🔗 Social Links */}
          {(youtubeLink || instagramLink) && (
            <Section title="Media Links">
              <div className="flex gap-4 items-center">
                {youtubeLink && (
                  <a
                    href={youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <Youtube className="h-4 w-4" /> YouTube
                  </a>
                )}
                {instagramLink && (
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-pink-500 hover:underline"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                )}
              </div>
            </Section>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// 🧩 Reusable Section Component
const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <Separator className="mb-3" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">{children}</div>
  </div>
);

// 🧩 Reusable Detail Component
const Detail = ({ label, value }: { label: string; value: any }) => (
  <div className="text-sm">
    <span className="font-medium text-foreground">{label}: </span>
    <span className="text-muted-foreground">{value ?? "—"}</span>
  </div>
);
