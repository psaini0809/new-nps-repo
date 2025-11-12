import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueries, useUpdateQuery, useDeleteQuery } from "@/hooks/use-query";
import { toast } from "@/hooks/use-toast";

export default function AdminQueries() {
  const { data: queries = [], isLoading, isError } = useQueries();
  const { mutate: updateQuery, isPending: isUpdating } = useUpdateQuery();
  const { mutate: deleteQuery, isPending: isDeleting } = useDeleteQuery();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredQueries = useMemo(() => {
    if (!searchTerm.trim()) return queries;
    const term = searchTerm.toLowerCase();
    return queries.filter(
      (q) =>
        q.name?.toLowerCase().includes(term) ||
        q.email?.toLowerCase().includes(term) ||
        q.phone?.toLowerCase().includes(term) ||
        q.query?.toLowerCase().includes(term)
    );
  }, [queries, searchTerm]);

  const handleToggleStatus = (query) => {
    const updatedStatus = !query.isAddressed;

    updateQuery(
      { id: query._id, updatedQuery: { isAddressed: updatedStatus } },
      {
        onSuccess: () => {
          toast({
            title: "Query updated",
            description: `Marked as ${updatedStatus ? "Addressed" : "Pending"}.`,
          });
        },
        onError: () => {
          toast({
            title: "Update failed",
            description: "Could not update query status.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleDelete = (id) => {
    deleteQuery(id, {
      onSuccess: () => {
        toast({
          title: "Query deleted",
          description: "The query has been removed successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Delete failed",
          description: "Could not delete this query.",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading queries...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Failed to load queries.</p>
      </div>
    );

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">User Queries</h1>
            <p className="text-muted-foreground">
              View and manage all user-submitted queries.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Query List */}
          <div className="space-y-4">
            {filteredQueries.length > 0 ? (
              filteredQueries.map((query) => (
                <Card
                  key={query._id}
                  className="luxury-shadow hover:gold-glow transition-smooth"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Left Section */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{query.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {query.email} • {query.phone}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              query.isAddressed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            } capitalize`}
                          >
                            {query.isAddressed ? "Addressed" : "Pending"}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm mt-2">
                          {query.query}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Created at: {new Date(query.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 items-center">
                        <Button
                          variant={query.isAddressed ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleToggleStatus(query)}
                          disabled={isUpdating}
                        >
                          {query.isAddressed ? "Mark Pending" : "Mark Addressed"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(query._id)}
                          disabled={isDeleting}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-8">
                No matching queries found.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
