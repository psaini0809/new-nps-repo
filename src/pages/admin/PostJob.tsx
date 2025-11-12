import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useCreateCareer } from "@/api/career"; // ✅ import from your hooks

export default function AdminPostJob() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createCareer = useCreateCareer();

  const [formData, setFormData] = useState({
    jobTitle: "",
    position: "",
    location: "",
    type: "full-time",
    experienceRequired: "",
    roleType: "",
  });

  // 🟢 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    createCareer.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Job position posted successfully!",
        });
        navigate("/admin/careers");
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err?.response?.data?.message || "Failed to post job.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/careers")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
            <h1 className="text-4xl font-display font-bold mb-2">Post New Job</h1>
            <p className="text-muted-foreground">
              Create a new job posting for your career portal
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Property Manager"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    required
                  />
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    placeholder="e.g., Team Lead, Sales Associate"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Noida">Noida</SelectItem>
                      <SelectItem value="Greater Noida">Greater Noida</SelectItem>
                      <SelectItem value="Yamuna Expressway">Yamuna Expressway</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Required */}
                <div className="space-y-2">
                  <Label htmlFor="experienceRequired">Experience Required *</Label>
                  <Select
                    value={formData.experienceRequired}
                    onValueChange={(value) => setFormData({ ...formData, experienceRequired: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1 year">0-1 year</SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Role Type */}
                <div className="space-y-2">
                  <Label htmlFor="roleType">Role Type *</Label>
                  <Select
                    value={formData.roleType}
                    onValueChange={(value) => setFormData({ ...formData, roleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Non-Technical">Non-Technical</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 justify-end pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/careers")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="luxury"
                    disabled={createCareer.isLoading}
                  >
                    {createCareer.isLoading ? "Posting..." : "Post Job"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
