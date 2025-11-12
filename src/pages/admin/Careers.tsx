import { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Briefcase,
  Calendar,
  Plus,
  Search,
  Pencil,
  Trash2,
  Layers,
  Clock,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCareers, useUpdateCareer, useDeleteCareer } from "@/api/career";
import { toast } from "sonner"; // optional for better UX
import { useNavigate } from "react-router-dom";

export default function AdminCareers() {
  const { data: careers = [], isLoading } = useCareers();
  const updateCareer = useUpdateCareer();
  const deleteCareer = useDeleteCareer();

  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCareer, setEditCareer] = useState(null);

  // Filter careers by search input
  const filteredCareers = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return careers.filter(
      (career) =>
        career.jobTitle.toLowerCase().includes(search) ||
        career.position.toLowerCase().includes(search) ||
        career.location.toLowerCase().includes(search)
    );
  }, [searchTerm, careers]);

  // Open modal
  const handleEdit = (career) => {
    setEditCareer({ ...career });
    setEditModalOpen(true);
  };

  // Save updated career
  const handleSave = () => {
    updateCareer.mutate(
      { id: editCareer._id, updatedData: editCareer },
      {
        onSuccess: () => {
          toast.success("Career updated successfully");
          setEditModalOpen(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  // Delete career
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      deleteCareer.mutate(id, {
        onSuccess: () => toast.success("Career deleted successfully"),
        onError: (err) => toast.error(err.message),
      });
    }
  };
  const navigate  =useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-display font-bold">Careers</h1>
              <Button
                variant="luxury"
                onClick={() => (navigate("/admin/careers/new"))}
              >
                <Plus className="mr-2 h-5 w-5" />
                Post New Position
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage job openings and career opportunities
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, position, or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Careers List */}
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading jobs...</p>
            ) : filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <Card
                  key={career._id}
                  className="border border-border hover:border-gold transition-all shadow-md hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                          {career.jobTitle}
                        </h3>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{career.position}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{career.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Layers className="h-4 w-4" />
                            <span className="capitalize">{career.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{career.experienceRequired}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{career.roleType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Posted {new Date(career.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(career)}>
                          <Pencil className="mr-1 h-4 w-4" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(career._id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-8">
                No job positions found.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Career</DialogTitle>
          </DialogHeader>

          {editCareer && (
            <div className="space-y-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={editCareer.jobTitle}
                  onChange={(e) =>
                    setEditCareer({ ...editCareer, jobTitle: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Position</Label>
                <Input
                  value={editCareer.position}
                  onChange={(e) =>
                    setEditCareer({ ...editCareer, position: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={editCareer.location}
                  onChange={(e) =>
                    setEditCareer({ ...editCareer, location: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Job Type</Label>
                <Select
                  value={editCareer.type}
                  onValueChange={(value) =>
                    setEditCareer({ ...editCareer, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Experience Required</Label>
                <Input
                  value={editCareer.experienceRequired}
                  onChange={(e) =>
                    setEditCareer({ ...editCareer, experienceRequired: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Role Type</Label>
                <Input
                  value={editCareer.roleType}
                  onChange={(e) =>
                    setEditCareer({ ...editCareer, roleType: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateCareer.isPending}>
              {updateCareer.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
