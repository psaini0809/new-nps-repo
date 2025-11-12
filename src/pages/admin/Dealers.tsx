import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Search, Shield } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAdmins } from "@/hooks/use-admin";

export default function AdminDealers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: admins, isLoading, isError } = useAdmins();

  // 🔍 Filter admins dynamically
  const filteredAdmins = useMemo(() => {
    if (!searchTerm.trim()) return admins || [];
    const lowerTerm = searchTerm.toLowerCase();

    return admins?.filter(
      (admin) =>
        admin.fullName?.toLowerCase().includes(lowerTerm) ||
        admin.email?.toLowerCase().includes(lowerTerm) ||
        admin.phone?.toLowerCase().includes(lowerTerm)
    );
  }, [admins, searchTerm]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">Admin Users</h1>
            <p className="text-muted-foreground">
              Manage admin accounts and monitor their activities
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search admins..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Loading & Error States */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500 font-medium mt-16">
              Failed to load admins. Please try again.
            </div>
          )}

          {/* Admins Grid */}
          {!isLoading && !isError && (
            <>
              {filteredAdmins?.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAdmins.map((admin) => (
                    <Card
                      key={admin._id}
                      className="luxury-shadow hover:gold-glow transition-smooth"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg">
                              {admin.fullName?.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{admin.fullName}</h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                Dealer
                              </p>
                            </div>
                          </div>
                          <Shield className="h-5 w-5 text-primary" />
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{admin.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{admin.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground mt-16">
                  No admins found matching “{searchTerm}”
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
