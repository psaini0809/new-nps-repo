import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PropertyCard } from "@/components/dashboard/PropertyCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-property.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { Plus } from "lucide-react";
import { useUserRoleCounts } from "@/api/user-api.js"; 
import { useQueryCount } from "@/hooks/use-query.js";
import { Users, Briefcase, MessageSquare } from "lucide-react";

const properties = [
  {
    id: "1",
    name: "Luxury Modern Villa with Pool",
    location: "Greater Noida",
    price: 125000000,
    size: 3500,
    bedrooms: 4,
    bathrooms: 3,
    image: property1,
    status: "active" as const,
    addedBy: "Dealer A",
  },
  {
    id: "2",
    name: "Premium Penthouse - City Views",
    location: "Noida",
    price: 98000000,
    size: 2800,
    bedrooms: 3,
    bathrooms: 2,
    image: property2,
    status: "active" as const,
    addedBy: "Dealer B",
  },
  {
    id: "3",
    name: "Elite Residential Complex",
    location: "Yamuna Expressway",
    price: 156000000,
    size: 4200,
    bedrooms: 5,
    bathrooms: 4,
    image: property3,
    status: "pending" as const,
    addedBy: "Admin",
  },
];

export default function AdminIndex() {
  const navigate = useNavigate();

  const { data: roleCounts, isLoading: rolesLoading } = useUserRoleCounts();
  const { data: queryCountData, isLoading: queryLoading } = useQueryCount();

  if (rolesLoading || queryLoading) return <p className="p-8">Loading...</p>;

  const metrics = [
    {
      title: "Active Users",
      value: roleCounts?.users ?? 0,
      icon: Users,
      trendUp: true,
    },
    {
      title: "Active Dealers",
      value: roleCounts?.admins ?? 0,
      icon: Briefcase,
      trendUp: true,
    },
    {
      title: "Total Queries",
      value: queryCountData?.totalQueries ?? 0,
      icon: MessageSquare,
      trendUp: true,
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <img
            src={heroImage}
            alt="Luxury Properties"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent">
            <div className="flex h-full flex-col justify-center px-8 lg:px-12 max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
                Premium Real Estate
                <span className="block text-primary">Management</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 animate-fade-in">
                Manage your luxury properties with elegance and efficiency.
              </p>
              <div className="flex gap-4 animate-fade-in">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate("/admin/properties/new")}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="px-8 lg:px-12 -mt-12 relative z-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </section>

        {/* Properties Section */}
        <section className="px-8 lg:px-12 py-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-display font-bold">Recent Properties</h2>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/properties")}
            >
              View All
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
