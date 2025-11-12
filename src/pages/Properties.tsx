import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import commercialImage from "@/assets/commercial-property.jpg";
import villaImage from "@/assets/luxury-villa.jpg";
import studioImage from "@/assets/studio-apartment.jpg";
import heroImage from "@/assets/hero-luxury-apartments.jpg";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/coverimg.jpg";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [propertyCategory, setPropertyCategory] = useState("all");
  const [propertySubType, setPropertySubType] = useState("all");
  const [sizeSort, setSizeSort] = useState("all");

  // Reset subtype when category changes
  const handleCategoryChange = (value) => {
    setPropertyCategory(value);
    setPropertySubType("all");
  };

  // Define subcategories for each main category
  const getSubCategories = () => {
    switch (propertyCategory) {
      case "residential":
        return [
          { value: "plot", label: "Plot" },
          { value: "flats", label: "Flats" },
        ];
      case "commercial":
        return [
          { value: "studio", label: "Studio Apartment" },
          { value: "retail", label: "Retail Stores" },
        ];
      case "industrial":
        return [];
      default:
        return [];
    }
  };

  const allProperties = [
    {
      id: "1",
      image: heroImage,
      title: "Luxury Residential Apartments",
      location: "Sector 137, Noida",
      price: "₹85 Lacs",
      bedrooms: 3,
      bathrooms: 3,
      area: "1850 sq.ft",
      areaValue: 1850,
      type: "residential",
      subType: "flats",
      locationKey: "noida",
    },
    {
      id: "2",
      image: commercialImage,
      title: "Premium Commercial Space",
      location: "Knowledge Park, Greater Noida",
      price: "₹1.2 Cr",
      area: "2500 sq.ft",
      areaValue: 2500,
      type: "commercial",
      subType: "retail",
      locationKey: "greater-noida",
    },
    {
      id: "3",
      image: villaImage,
      title: "Modern Luxury Villa",
      location: "Yamuna Expressway",
      price: "₹2.5 Cr",
      bedrooms: 4,
      bathrooms: 5,
      area: "3500 sq.ft",
      areaValue: 3500,
      type: "residential",
      subType: "plot",
      locationKey: "yamuna",
    },
    {
      id: "4",
      image: studioImage,
      title: "Contemporary Studio Apartment",
      location: "Sector 62, Noida",
      price: "₹45 Lacs",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq.ft",
      areaValue: 650,
      type: "commercial",
      subType: "studio",
      locationKey: "noida",
    },
    {
      id: "5",
      image: heroImage,
      title: "Spacious 4BHK Apartment",
      location: "Sector 150, Noida",
      price: "₹1.1 Cr",
      bedrooms: 4,
      bathrooms: 4,
      area: "2400 sq.ft",
      areaValue: 2400,
      type: "residential",
      subType: "flats",
      locationKey: "noida",
    },
    {
      id: "6",
      image: commercialImage,
      title: "Industrial Plot",
      location: "Tech Zone, Greater Noida",
      price: "₹95 Lacs",
      area: "1800 sq.ft",
      areaValue: 1800,
      type: "industrial",
      subType: "industrial",
      locationKey: "greater-noida",
    },
  ];

  // Filter properties based on all criteria
  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = location === "all" || property.locationKey === location;

      // Property category filter
      const matchesCategory = propertyCategory === "all" || property.type === propertyCategory;

      // Property subtype filter
      const matchesSubType = propertySubType === "all" || property.subType === propertySubType;

      // Size filter
      let matchesSize = true;
      if (sizeSort !== "all") {
        const area = property.areaValue;
        switch (sizeSort) {
          case "small":
            matchesSize = area < 1000;
            break;
          case "medium":
            matchesSize = area >= 1000 && area < 2000;
            break;
          case "large":
            matchesSize = area >= 2000 && area < 3000;
            break;
          case "xlarge":
            matchesSize = area >= 3000;
            break;
        }
      }

      return matchesSearch && matchesLocation && matchesCategory && matchesSubType && matchesSize;
    });
  }, [searchQuery, location, propertyCategory, propertySubType, sizeSort]);

  const subCategories = getSubCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SocialSidebar/>
      <main className="flex-1">
        {/* Header */}
        <section
        className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Explore Our <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">Properties</span>
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
            Find your perfect property from our extensive collection
            </p>
          </div>
        </section>

        {/* Filters */}
      {/* Filters */}
<section className="py-8 bg-muted/30 border-b">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger>
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="noida">Noida</SelectItem>
          <SelectItem value="greater-noida">Greater Noida</SelectItem>
          <SelectItem value="yamuna">Yamuna Expressway</SelectItem>
        </SelectContent>
      </Select>

      <Select value={propertyCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Property Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="residential">Residential</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="industrial">Industrial Plots</SelectItem>
        </SelectContent>
      </Select>

      {subCategories.length > 0 && (
        <Select value={propertySubType} onValueChange={setPropertySubType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {subCategories.map((sub) => (
              <SelectItem key={sub.value} value={sub.value}>
                {sub.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select value={sizeSort} onValueChange={setSizeSort}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sizes</SelectItem>
          <SelectItem value="small">Small (0-1000 sq.ft)</SelectItem>
          <SelectItem value="medium">Medium (1000-2000 sq.ft)</SelectItem>
          <SelectItem value="large">Large (2000-3000 sq.ft)</SelectItem>
          <SelectItem value="xlarge">Extra Large (3000+ sq.ft)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</section>

        {/* Properties Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
              </p>
              {(searchQuery || location !== "all" || propertyCategory !== "all" || propertySubType !== "all" || sizeSort !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setLocation("all");
                    setPropertyCategory("all");
                    setPropertySubType("all");
                    setSizeSort("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {filteredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-12 text-center">
                  <Button variant="outline" size="lg">
                    Load More Properties
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No properties found matching your criteria</p>
                <Button 
                  variant="default"
                  onClick={() => {
                    setSearchQuery("");
                    setLocation("all");
                    setPropertyCategory("all");
                    setPropertySubType("all");
                    setSizeSort("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;