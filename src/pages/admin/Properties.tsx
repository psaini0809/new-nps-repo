import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye,Trash2 } from "lucide-react";
import { ViewPropertyDialog } from "./view-propert-dialog";
import { useNavigate } from "react-router-dom";
import { useResidentialProperties, useDeleteResidentialProperty } from "@/hooks/use-resedential";
export default function AdminProperties() {
  const navigate = useNavigate();

  // Filters & local UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  // 🧩 Fetch from backend
  const { data: properties = [], isLoading, isError } = useResidentialProperties();

  const { mutate: deleteProperty, isPending: deleting } = useDeleteResidentialProperty();

  const handleDeleteProperty = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
  
    deleteProperty(id, {
      onSuccess: () => {
        toast.success("Property deleted successfully!");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to delete property");
      },
    });
  };


  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter((property: any) => {
      const matchesSearch =
        property.location.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.locality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity = cityFilter === "all" || property.location.city === cityFilter;

      return matchesSearch && matchesCity;
    });

    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case "price-high":
          return b.pricing.expectedPrice - a.pricing.expectedPrice;
        case "price-low":
          return a.pricing.expectedPrice - b.pricing.expectedPrice;
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [properties, searchQuery, cityFilter, sortBy]);

  const handleViewProperty = (property: any) => {
    setSelectedProperty(property);
    setViewDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading properties...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
        Failed to load properties. Please try again.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-display font-bold">Residential Properties</h1>
              <Button variant="luxury" onClick={() => navigate("/admin/properties/new")}>
                <Plus className="mr-2 h-5 w-5" />
                Add Residential Property
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage and view all your residential property listings
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Filters</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by city, locality or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Noida">Noida</SelectItem>
                  <SelectItem value="Greater Noida">Greater Noida</SelectItem>
                  <SelectItem value="Yamuna Expressway">Yamuna Expressway</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredAndSortedProperties.length}
              </span>{" "}
              properties
            </p>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name / Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Locality</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Bedrooms</TableHead>
                  <TableHead>Bathrooms</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No properties found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedProperties.map((property: any) => (
                    <TableRow key={property._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold">{property.subPropertyType}</span>
                          <span className="text-xs text-muted-foreground">
                            {property.description || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{property.location.city}</TableCell>
                      <TableCell>{property.location.locality}</TableCell>
                      <TableCell className="font-semibold text-primary">
                        ₹{(property.pricing.expectedPrice / 10000000).toFixed(2)} Cr
                      </TableCell>
                      <TableCell>{property.bedrooms || property.bhk || "-"}</TableCell>
                      <TableCell>{property.bathrooms || "-"}</TableCell>
                      <TableCell>{property.createdBy?.email || "N/A"}</TableCell>
                      <TableCell className="text-right space-x-1">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleViewProperty(property)}
  >
    <Eye className="h-4 w-4 text-primary" />
  </Button>

  <Button
    variant="ghost"
    size="sm"
    disabled={deleting}
    onClick={() => handleDeleteProperty(property._id)}
  >
    <Trash2 className="h-4 w-4 text-red-600" />
  </Button>
</TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <ViewPropertyDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        property={selectedProperty}
      />
    </div>
  );
}
