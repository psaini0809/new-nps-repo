import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Bed, Bath, Square, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import SocialSidebar from "@/components/socialSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useCreateQuery } from "@/hooks/use-query";
import { useContactInfo } from "@/api/contactApi";

// 📸 Mock Images
import heroImage from "@/assets/hero-luxury-apartments.jpg";
import heroImage2 from "@/assets/pic1.jpg";
import heroImage3 from "@/assets/pic2.jpg";
import heroImage4 from "@/assets/pic3.jpg";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data: user } = useAuth();
  const addQueryMutation = useCreateQuery();
  const { data: contactData } = useContactInfo();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        message: "",
      });
    }
  }, [user]);

  // 🏠 Mock Property Data (Full Schema)
  const property = {
    _id: id,
    subPropertyType: "Flat",
    location: {
      city: "Noida",
      locality: "Sector 137",
      subLocality: "Expressway",
      society: "Lotus Boulevard",
      houseNo: "A-1203",
      latitude: 28.544,
      longitude: 77.390,
    },
    bhk: 3,
    bedrooms: 3,
    bathrooms: 3,
    areaDetails: {
      carpetArea: 1450,
      builtUpArea: 1600,
      superBuiltUpArea: 1850,
    },
    otherRooms: ["Study Room", "Servant Room"],
    furnishingStatus: "Semi-Furnished",
    furnishings: [
      { item: "Air Conditioner", available: true },
      { item: "Wardrobe", available: true },
      { item: "Modular Kitchen", available: true },
      { item: "Refrigerator", available: false },
    ],
    reservedParking: { covered: true, open: false },
    totalFloors: 18,
    propertyOnFloor: 12,
    availabilityStatus: "Ready to Move",
    ageOfProperty: 2,
    images: [heroImage, heroImage2, heroImage3, heroImage4],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    instagramLink: "https://www.instagram.com/nps_estates/",
    pricing: { expectedPrice: 8500000, pricePerSqft: 4600 },
    description:
      "A premium 3BHK flat in Lotus Boulevard, Noida. With modern amenities, spacious rooms, and easy connectivity to Delhi, this home is perfect for families seeking luxury and convenience.",
    amenities: [
      "Club House",
      "Gymnasium",
      "Swimming Pool",
      "Children's Play Area",
      "Power Backup",
      "Lift",
      "24x7 Security",
      "Park",
    ],
    propertyFacing: "East",
    flooringType: "Vitrified Tiles",
    facingRoadWidth: 30,
    locationAdvantages: [
      "Near Metro Station",
      "Close to Schools and Hospitals",
      "5 min from Expressway",
    ],
  };

  const [activeImage, setActiveImage] = useState(0);

  // 📍 Google Map Embed Link
  const mapSrc = property.location.latitude
    ? `https://www.google.com/maps?q=${property.location.latitude},${property.location.longitude}&z=15&output=embed`
    : "";

  // 💬 Handle Inquiry Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addQueryMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        query: formData.message || `Inquiry for property ID: ${id}`,
        propertyId: id,
        isAddressed: false,
      });
      toast.success("Your inquiry has been submitted successfully!");
      setFormData({
        name: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <SocialSidebar />

      {/* 🖼️ Image Slider */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={property.images[activeImage]}
          alt={property.subPropertyType}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        {property.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === 0 ? property.images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === property.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </section>

      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🏡 Property Info */}
        <div className="lg:col-span-2 space-y-10">
          <header>
            <h1 className="text-4xl font-serif font-bold mb-3">
              {property.bhk} BHK {property.subPropertyType} in{" "}
              {property.location.society}
            </h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {property.location.houseNo && `${property.location.houseNo}, `}
                {property.location.locality}, {property.location.city}
              </span>
            </div>
          </header>

          {/* 💰 Pricing */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm space-y-2">
            <p className="text-2xl font-bold text-gold">
              ₹{property.pricing.expectedPrice.toLocaleString()}
            </p>
            {property.pricing.pricePerSqft && (
              <p className="text-sm text-muted-foreground">
                ₹{property.pricing.pricePerSqft}/sqft
              </p>
            )}
          </div>

          {/* 📋 Description */}
          {property.description && (
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">
                Description
              </h2>
              <p className="text-muted-foreground">{property.description}</p>
            </section>
          )}

          {/* 📏 Area Details */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-3">Area Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(property.areaDetails || {}).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className="bg-card border border-border rounded-lg p-3 text-center"
                    >
                      <p className="capitalize font-medium">{key}</p>
                      <p className="text-gold font-semibold">{value} sq.ft</p>
                    </div>
                  )
              )}
            </div>
          </section>

          {/* 🏢 Floor & Furnishing */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-3">
                Floor Details
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {property.totalFloors && (
                  <li>Total Floors: {property.totalFloors}</li>
                )}
                {property.propertyOnFloor && (
                  <li>Property on Floor: {property.propertyOnFloor}</li>
                )}
                {property.ageOfProperty && (
                  <li>Age of Property: {property.ageOfProperty} years</li>
                )}
                {property.availabilityStatus && (
                  <li>Status: {property.availabilityStatus}</li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold mb-3">
                Furnishing Details
              </h2>
              <ul className="space-y-1">
                {property.furnishings
                  .filter((f) => f.available)
                  .map((f, i) => (
                    <li key={i}>• {f.item}</li>
                  ))}
              </ul>
            </div>
          </section>

          {/* 🌟 Amenities */}
          {property.amenities?.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg p-2 text-center"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 🎥 YouTube Video */}
          {property.youtubeLink && (
            <section className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${
                  property.youtubeLink.split("v=")[1]
                }`}
                title="Property Video"
                allowFullScreen
                className="w-full h-full"
              />
            </section>
          )}

          {/* 📸 Instagram */}
          {property.instagramLink && (
            <section>
              <a
                href={property.instagramLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 bg-card border border-border px-5 py-3 rounded-lg hover:border-pink-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E1306C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
                <span className="font-medium text-pink-600 hover:text-pink-500">
                  View on Instagram
                </span>
              </a>
            </section>
          )}

          {/* 🗺️ Map */}
          {mapSrc && (
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">Location</h2>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-border shadow-sm">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            </section>
          )}
        </div>

        {/* 📞 Inquiry Form */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 bg-card border border-border rounded-lg p-6 shadow-md space-y-5">
            <h3 className="text-xl font-serif font-bold">
              Interested in this property?
            </h3>
            <p className="text-sm text-muted-foreground">
              Contact us for more information or to schedule a viewing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <Input
                type="tel"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
              />
              <Button type="submit" variant="gold" className="w-full">
                Send Inquiry
              </Button>
            </form>

            {/* Contact Info */}
            <div className="pt-4 border-t border-border space-y-2">
              {contactData?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold" />
                  <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
                </div>
              )}
              {contactData?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <a href={`mailto:${contactData.email}`}>
                    {contactData.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
